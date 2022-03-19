const logger = require('../../logger');
const { listFragments } = require('../../model/data');
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  const fragments = await listFragments(req.user);
  logger.debug({ fragments }, 'List Fragments');

  res.status(200).json(createSuccessResponse({ fragments }));
};

// TODO: `GET /fragments?expand=1` now returns expanded fragment metadata for an authenticated user. See 4.4.1.

// TODO: `GET /fragments/:id` returns an existing fragment's data with the expected `Content-Type`, with unit tests. See 4.5.

// TODO: `GET /fragments/:id/info` returns an existing fragment's metadata, with unit tests. See 4.7.

// TODO: `GET /fragments/:id.ext` returns an existing fragment's data converted to a supported type.
// Initial, you only need to support Markdown fragments (`.md`) converted to HTML (`.html`) using [markdown-it](https://github.com/markdown-it/markdown-it) (i.e., you don't have to do other conversions until [Assignment 3](https://github.com/humphd/ccp555-winter-2022/blob/main/assignments/assignment-03/README.md))
