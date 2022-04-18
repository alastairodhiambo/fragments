const logger = require('../../logger');
const { Fragment } = require('../../model/fragment');
const { createSuccessResponse } = require('../../response');

module.exports = async (req, res, next) => {
  const data = req.body;
  const user = req.user;
  const type = req.headers['content-type'];
  const id = req.params.id;

  logger.debug({ user, type }, 'PUT request:');

  try {
    const metadata = await Fragment.byId(user, id);
    const fragment = new Fragment(metadata);
    logger.debug({ fragment }, '/fragments/:id fragment');

    let currentType = fragment.type;
    if (currentType.includes('; charset=utf-8')) {
      currentType = type.substring(0, type.search(/[;]/g));
    }

    if (type !== currentType) {
      throw new Error('Invalid type');
    }

    await fragment.save();
    await fragment.setData(data);
    logger.debug(id, 'PUT fragment id');

    const location = `${process.env.API_URL}/v1/fragments/${id}`;

    res.location(location);
    logger.debug({ location }, 'PUT location');
    res.status(200).json(createSuccessResponse({ fragment }));
  } catch (err) {
    next(err);
  }
};
