const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');

module.exports = async (req, res) => {
  const data = req.body;
  const user = req.user;
  const type = req.headers['content-type'];

  logger.debug(user, 'POST request: user');
  logger.debug(data, 'POST request: fragment buffer');
  logger.debug(type, 'POST request: content type');
  logger.debug(req, 'POST request: req');

  try {
    const fragment = new Fragment({ ownerId: user, type: type });
    await fragment.save();
    await fragment.setData(data);

    res.status(201).json(createSuccessResponse({ fragment }));
  } catch (err) {
    // TODO: Refactor this to avoid repetition
    const status = err.status || 500;
    const message = err.message;

    if (status > 499) {
      logger.error({ err }, `Error processing request`);
    }

    res.status(status).json(createErrorResponse(status, message));
  }
};
