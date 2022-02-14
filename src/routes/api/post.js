const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse, createErrorResponse } = require('../../response');

module.exports = (req, res) => {
  const data = req.body;
  const user = req.user;
  const type = req.headers['content-type'];

  logger.debug(user, 'POST request: user');
  logger.debug(data, 'POST request: fragment buffer');
  logger.debug(type, 'POST request: content type');
  logger.debug(req, 'POST request: req');

  try {
    const fragment = new Fragment({ ownerId: user, type: type });
    fragment.save();
    fragment.setData(data);

    res.status(201).json(createSuccessResponse({ fragment }));
  } catch (err) {
    const status = err.status || 500;
    const message = err.message;

    if (status > 499) {
      logger.error({ err }, `Error processing request`);
    }

    res.status(status).json(createErrorResponse(status, message));
  }
};
