// Use https://www.npmjs.com/package/nanoid to create unique IDs
const { nanoid } = require('nanoid');
// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
const contentType = require('content-type');

const logger = require('../logger');

// Functions for working with fragment metadata/data using our DB
const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('./data');

const validTypes = {
  txt: 'text/plain',
  txtCharset: 'text/plain; charset=utf-8',
  md: 'text/markdown',
  html: 'text/html',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
};

class Fragment {
  constructor({ id, ownerId, created, updated, type, size = 0 }) {
    if (ownerId && type) {
      if (Fragment.isSupportedType(type)) {
        this.type = type;
      } else throw Error('Invalid type');

      if (size) {
        if (Number.isInteger(size) && (Math.sign(size) === 0 || Math.sign(size) === 1)) {
          this.size = size;
        } else throw Error('Invalid size value');
      } else this.size = 0;

      this.id = id ? id : nanoid();
      this.ownerId = ownerId;
      if (!created || Object.keys(created).length === 0) {
        this.created = new Date().toISOString();
      } else this.created = created;
      if (!updated || Object.keys(updated).length === 0) {
        this.updated = new Date().toISOString();
      } else this.updated = updated;
    } else throw Error('Missing ownerId or type');
  }

  /**
   * Get all fragments (id or full) for the given user
   * @param {string} ownerId user's hashed email
   * @param {boolean} expand whether to expand ids to full fragments
   * @returns Promise<Array<Fragment>>
   */
  static async byUser(ownerId, expand = false) {
    logger.debug({ ownerId, expand }, 'byUser()');

    return listFragments(ownerId, expand);
  }

  /**
   * Gets a fragment for the user by the given id.
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<Fragment>
   */
  static async byId(ownerId, id) {
    try {
      const data = await readFragment(ownerId, id);
      if (data === undefined) {
        throw new Error('Fragment does not exist.');
      }

      logger.debug({ data }, 'byId()');

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Delete the user's fragment data and metadata for the given id
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise
   */
  static delete(ownerId, id) {
    if (ownerId && id) {
      try {
        return deleteFragment(ownerId, id);
      } catch (err) {
        throw new Error(err);
      }
    } else throw Error('Invalid data passed');
  }

  /**
   * Saves the current fragment to the database
   * @returns Promise
   */
  save() {
    logger.debug(this, 'save()');
    this.updated = new Date().toISOString();

    return writeFragment(this);
  }

  /**
   * Gets the fragment's data from the database
   * @returns Promise<Buffer>
   */
  async getData() {
    const data = await readFragmentData(this.ownerId, this.id);
    // logger.debug({ data }, 'getData() data'); // Is lengthy for larger files

    return data;
  }

  /**
   * Set's the fragment's data in the database
   * @param {Buffer} data
   * @returns Promise
   */
  async setData(data) {
    try {
      if (!data) {
        throw Error('Data is empty');
      }

      if (!Buffer.isBuffer(data)) {
        throw Error('Data is not buffer');
      }

      // logger.debug({ data }, 'setData() data'); // Is lengthy for larger files

      this.size = Buffer.byteLength(data);
      this.updated = new Date().toISOString();

      return await writeFragmentData(this.ownerId, this.id, data);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Returns the mime type (e.g., without encoding) for the fragment's type:
   * "text/html; charset=utf-8" -> "text/html"
   * @returns {string} fragment's mime type (without encoding)
   */

  get mimeType() {
    const { type } = contentType.parse(this.type);
    return type;
  }

  /**
   * Returns true if this fragment is a text/* mime type
   * @returns {boolean} true if fragment's type is text/*
   */
  get isText() {
    const type = this.mimeType;
    logger.debug({ type }, 'isText()');
    return type.includes('text');
  }

  /**
   * Returns the formats into which this fragment type can be converted
   * @returns {Array<string>} list of supported mime types
   */
  get formats() {
    let array = [];

    switch (this.type) {
      case validTypes.txt:
      case validTypes.txtCharset:
        array = [validTypes.txt];
        break;
      case validTypes.md:
        array = [validTypes.md, validTypes.txt, validTypes.html];
        break;
      case validTypes.html:
        array = [validTypes.html, validTypes.txt];
        break;
      case validTypes.json:
        array = [validTypes.json, validTypes.txt];
        break;
      case validTypes.png:
      case validTypes.jpg:
      case validTypes.webp:
      case validTypes.gif:
        array = [validTypes.png, validTypes.jpg, validTypes.webp, validTypes.gif];
        break;
      default:
        array = [];
    }

    return array;
  }

  /**
   * Returns true if we know how to work with this content type
   * @param {string} value a Content-Type value (e.g., 'text/plain' or 'text/plain: charset=utf-8')
   * @returns {boolean} true if we support this Content-Type (i.e., type/subtype)
   */
  static isSupportedType(value) {
    return Object.values(validTypes).includes(value);
  }
}

module.exports.Fragment = Fragment;
module.exports.validTypes = validTypes;
