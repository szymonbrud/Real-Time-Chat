import request from 'supertest';
const {MongoClient} = require('mongodb');
import mongoose from 'mongoose';

import app from '../index';
import {RoomsData} from '../databaseControll';

jest.mock('./verifyUser.js');

describe('First express node.js tests', () => {
  it('First express test', (done) => {
    request(app)
      .get('/user/hello')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({hello: 'kitty'});
      })
      .end(done);
  });
});

describe('Testing router.js', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/realtimechat_tests', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('realtimechat_tests');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  describe('Testing /getRooms', () => {
    describe('Testing clear database', () => {
      it('Return empty array', (done) => {
        request(app)
          .post('/getRooms')
          .send({})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({status: 'OK', nameRooms: []});
          })
          .end(done);
      });
    });

    describe('Testing with data', () => {
      beforeAll(async () => {
        const m = new RoomsData({
          userId: 'D3czjdfe',
          rooms: [
            {
              roomName: 'Janowiańsko',
              roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d41c'),
            },
          ],
        });

        await m.save((err, d) => {
          if (err) {
            console.log(err);
          }
        });
      });

      afterAll(async () => {
        await RoomsData.deleteOne({}, (err) => {
          if (err) console.log(err);
        });
      });

      it('Return rooms from database', (done) => {
        request(app)
          .post('/getRooms')
          .send({})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.nameRooms.length).toBe(1);
            expect(res.body.nameRooms[0].roomName).toBe('Janowiańsko');
            expect(res.body.nameRooms[0].roomId).toBe('5f2825db31595c1748b5d41c');
          })
          .end(done);
      });
    });
  });
});
