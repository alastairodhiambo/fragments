/**
 * The main entry-point for the v1 version of the fragments API.
 */
const express = require('express');

const contentType = require('content-type');
const { Fragment } = require('../../model/fragment');

// Create a router on which to mount our API endpoints
const router = express.Router();

const { getRoute, getById, getInfo } = require('./get');
const route = '/fragments';

// GET routes
router.get(route, getRoute);
router.get(`${route}/:id`, getById);
router.get(`${route}/fragments/:id/info`, getInfo);

// TODO: `GET /fragments/:id.ext` returns an existing fragment's data converted to a supported type.
// Initial, you only need to support Markdown fragments (`.md`) converted to HTML (`.html`) using [markdown-it](https://github.com/markdown-it/markdown-it) (i.e., you don't have to do other conversions until [Assignment 3](https://github.com/humphd/ccp555-winter-2022/blob/main/assignments/assignment-03/README.md))

// Support sending various Content-Types on the body up to 5M in size
const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      // See if we can parse this content type. If we can, `req.body` will be
      // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
      // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
      const { type } = contentType.parse(req);
      return Fragment.isSupportedType(type);
    },
  });

// Use a raw body parser for POST, which will give a `Buffer` Object or `{}` at `req.body`
router.post('/fragments', rawBody(), require('./post'));

module.exports = router;
