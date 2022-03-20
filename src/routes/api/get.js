const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports.getRoute = async (req, res) => {
  const user = req.user;
  const expand = req.query.expand || 0;

  const fragments = expand == 1 ? await Fragment.byUser(user, true) : await Fragment.byUser(user);

  logger.debug({ fragments, expand }, 'List Fragments, Expand');

  res.status(200).json(createSuccessResponse({ fragments }));
};

// GET /fragments/:id returns an existing fragment's data with the expected `Content-Type`, with unit tests. See 4.5.
module.exports.getById = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  logger.debug({ user, id }, 'GET /:ID User and ID');

  try {
    const fragment = await Fragment.byId(user, id);
    const data = (await fragment.getData()).toString();
    logger.debug(data, '/fragments/:id getData()');

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
    const data = await Fragment.byId(user, id);
    res.status(200).json(createSuccessResponse({ message: data }));
  } catch (err) {
    next(err);
  }
};
