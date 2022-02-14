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
