import request from 'supertest';
import express from 'express';
const app = express();

app.get('/user', function (req, res) {
  res.status(200).json({name: 'john'});
});

describe('First express tests.', () => {
  it('First express test', () => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});
