const stoppable = require('stoppable');

const logger = require('./logger');
const app = require('./app');

const port = parseInt(process.env.PORT || 8080, 10);

const server = stoppable(
  app.listen(port, () => {
    // Log a message that the server has started , adn which port it's using.
    logger.info({ port }, `Server started`);
  })
);

module.exports = server;
