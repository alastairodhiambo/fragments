const request = require('supertest');

const app = require('../../src/app');

describe('404 Test', () => {
  test('should return HTTP 404 response', async () => {
    const res = await request(app).get('/dummy');
    expect(res.statusCode).toBe(404);
  });
});
