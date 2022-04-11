const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports.getRoute = async (req, res) => {
  const user = req.user;
  const expand = req.query.expand || 0;

  const fragments = await Fragment.byUser(user, expand == 1);

  logger.debug({ fragments, expand }, 'List Fragments, Expand');

  res.status(200).json(createSuccessResponse({ fragments }));
};

// GET /fragments/:id returns an existing fragment's data with the expected `Content-Type`, with unit tests. See 4.5.
module.exports.getById = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  logger.debug({ user, id }, 'GET /:ID User and ID');

  try {
    const metadata = await Fragment.byId(user, id);
    const fragment = new Fragment(metadata);
    logger.debug({ fragment }, '/fragments/:id fragment');
    const data = await fragment.getData();
    logger.debug({ data }, '/fragments/:id getData()');

    res.type(fragment.type);

    logger.debug(res, 'byId res headers');

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

// GET /fragments/:id/info returns an existing fragment's metadata
module.exports.getInfo = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  logger.debug({ user, id }, 'GET /:ID User and ID');

  try {
    const fragment = await Fragment.byId(user, id);
    res.status(200).json(createSuccessResponse({ fragment }));
  } catch (err) {
    next(err);
  }
};

// `GET /fragments/:id.ext` returns an existing fragment's data converted to a supported type.
// eslint-disable-next-line no-unused-vars
module.exports.getbyIdExt = async (req, res, next) => {
  //TODO:
};
