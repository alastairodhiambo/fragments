const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports = async (req, res) => {
  const user = req.user;
  const expand = req.query.expand || 0;

  const fragments = expand == 1 ? await Fragment.byUser(user, true) : await Fragment.byUser(user);

  logger.debug({ fragments, expand }, 'List Fragments, Expand');

  res.status(200).json(createSuccessResponse({ fragments }));
};
