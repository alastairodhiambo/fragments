const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

module.exports = async (req, res, next) => {
  const data = req.body;
  const user = req.user;
  const type = req.headers['content-type'];
  const host = req.headers['host'];

  logger.debug({ user, data, type, host }, 'POST request:');

  try {
    const fragment = new Fragment({ ownerId: user, type: type });
    await fragment.save();
    await fragment.setData(data);
    const id = fragment.id;
    logger.debug(id, 'POST fragment id');

    res.location(`http://${host}/v1/fragments/${id}`);
    res.status(201).json(createSuccessResponse({ fragment }));
  } catch (err) {
    next(err);
  }
};
