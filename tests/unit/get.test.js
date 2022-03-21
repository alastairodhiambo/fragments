const request = require('supertest');

const app = require('../../src/app');

describe('GET Requests:', () => {
  describe('GET /v1/fragments', () => {
    // If the request is missing the Authorization header, it should be forbidden
    test('unauthenticated requests are denied', () =>
      request(app).get('/v1/fragments').expect(401));

    // If the wrong username/password pair are used (no such user), it should be forbidden
    test('incorrect credentials are denied', () =>
      request(app)
        .get('/v1/fragments')
        .auth('invalid@email.com', 'incorrect_password')
        .expect(401));

    // Using a valid username/password pair should give a success result with a .fragments array
    test('authenticated users get a fragments array', async () => {
      const res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(Array.isArray(res.body.fragments)).toBe(true);
    });
  });

  describe('GET /v1/fragments/:id', () => {
    test('fetch by ID should return the existing fragment', async () => {
      const response = await request(app)
        .post('/v1/fragments')
        .auth('user1@email.com', 'password1')
        .send({
          body: 'This is a fragment',
        });
      const id = await response.body.fragment.id;

      const res = await request(app)
        .get(`/v1/fragments/${id}`)
        .auth('user1@email.com', 'password1');
      expect(res.statusCode).toBe(200);
    });

    // If the request is missing the Authorization header, it should be forbidden
    test('unauthenticated requests are denied', () =>
      request(app).get('/v1/fragments').expect(401));
  });

  describe('GET /v1/fragments/:id/info', () => {
    test('fetch by ID should return the existing fragment metadata', async () => {
      const response = await request(app)
        .post('/v1/fragments')
        .auth('user1@email.com', 'password1')
        .send({
          body: 'This is a fragment',
        });
      const id = await response.body.fragment.id;

      const res = await request(app)
        .get(`/v1/fragments/${id}/info`)
        .auth('user1@email.com', 'password1');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });

    test('unauthenticated requests are denied', () =>
      request(app).get('/v1/fragments').expect(401));
  });

  describe('GET /v1/fragments/:id.ext', () => {
    test('unauthenticated requests are denied', () =>
      request(app).get('/v1/fragments/:id.ext').expect(401));
  });
});
