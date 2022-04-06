const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const authorization = require('./authorization');
const { createErrorResponse } = require('./response');

const logger = require('./logger');
const pino = require('pino-http')({
  logger,
});

const app = express();

app.use(pino);

app.use(helmet());

app.use(cors());

// Use gzip/deflate compression middleware
app.use(compression());

// Set up our passport authorization middleware
passport.use(authorization.strategy());
app.use(passport.initialize());

app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let status;

  const message = err.message || 'unable to process request';
  if (message === 'Invalid type') {
    status = 415;
  } else if (message === 'Invalid size value' || message === 'Missing ownerId or type') {
    status = 400;
  } else if (
    message === 'Error: Fragment does not exist.' ||
    message === 'unable to read fragment data'
  ) {
    status = 404;
  } else status = err.status || 500;

  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json(createErrorResponse(status, message));
});

module.exports = app;
