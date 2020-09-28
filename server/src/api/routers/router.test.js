import request from 'supertest';
const {MongoClient} = require('mongodb');
import mongoose from 'mongoose';

import app from '../../index';
import {RoomsData, AllMessages} from '../../databaseControll';

jest.mock('../controllers/verifyUser.js');

const fakerUserId = 'D3czjdfe';

const getAPieceOfLink = (link) => {
  let keyToJoin = '';
  let realKey = '';
  let itIsYet = false;

  for (let i = link.length - 1; i >= 0; i--) {
    if (itIsYet) {
      if (link[i] === '/') {
        break;
      } else {
        keyToJoin = `${keyToJoin}${link[i]}`;
      }
    }
    if (link[i] === '/') {
      itIsYet = true;
    }
  }

  for (let i = keyToJoin.length - 1; i >= 0; i--) {
    realKey = `${realKey}${keyToJoin[i]}`;
  }

  return realKey;
};

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

  describe('→Testing /getRooms', () => {
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

        const k = new RoomsData({
          userId: 'envczoqiuwer',
          rooms: [
            {
              roomName: 'Halionamy',
              roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d41d'),
            },
          ],
        });

        await m.save((err, d) => {
          if (err) {
            console.log(err);
          }
        });

        await k.save((err, d) => {
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

  describe('→Testing /getMessages', () => {
    describe('Testing clear database', () => {
      it('Return empty messages', (done) => {
        request(app)
          .post('/getMessages')
          .send({roomId: '5f2825db31595c1748b5d41c'})
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.messages.length).toBe(0);
            expect(res.body.status).toBe('OK');
          })
          .end(done);
      });
    });

    describe('Testing with data', () => {
      beforeAll(async () => {
        const date = new Date();

        const message = new AllMessages({
          senderName: 'Michael Vandam',
          senderId: fakerUserId,
          content: 'Hello, I am person!',
          roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d41c'),
          date,
        });

        const message2 = new AllMessages({
          senderName: 'Jan Włodek',
          senderId: 'zwsi23zlwe',
          content: 'Hello, I am robot!',
          roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d41c'),
          date,
        });

        await message.save((err) => {
          if (err) {
            console.log(err);
          }
        });

        await message2.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      afterAll(async () => {
        await AllMessages.deleteMany({}, (err, i) => {
          if (err) console.log(err);
        });
      });

      it('Return a correct messages', (done) => {
        request(app)
          .post('/getMessages')
          .send({roomId: '5f2825db31595c1748b5d41c'})
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.messages.length).toBe(2);
            expect(res.body.messages[0].senderName).toEqual('Michael Vandam');
            expect(res.body.messages[0].content).toEqual('Hello, I am person!');
            expect(res.body.messages[0].roomId).toEqual('5f2825db31595c1748b5d41c');
            expect(res.body.messages[0].isSendByMe).toEqual(true);
            expect(res.body.messages[1].senderName).toEqual('Jan Włodek');
            expect(res.body.messages[1].content).toEqual('Hello, I am robot!');
            expect(res.body.messages[1].roomId).toEqual('5f2825db31595c1748b5d41c');
            expect(res.body.messages[1].isSendByMe).toEqual(false);
          })
          .end(done);
      });
    });
  });

  describe('→Testing /createRoom', () => {
    describe('Do not send roomName', () => {
      it('Retrun a bad', (done) => {
        request(app)
          .post('/createRoom')
          .send({})
          .expect((res) => {
            expect(res.body.status).toEqual('error');
          })
          .end(done);
      });
    });

    describe('Create room when I have never had room before', () => {
      afterAll(async () => {
        await RoomsData.deleteOne({}, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      it('Should return a new room', (done) => {
        request(app)
          .post('/createRoom')
          .send({roomName: 'Ciekmowisko'})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.nameRooms.length).toBe(1);
            expect(res.body.nameRooms[0]._id).toBeDefined();
            expect(res.body.nameRooms[0].roomName).toEqual('Ciekmowisko');
          })
          .end(done);
      });
    });

    describe('Create a room when I have already had a room', () => {
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
          if (err) {
            console.log(err);
          }
        });
      });

      it('Should return a new room', (done) => {
        request(app)
          .post('/createRoom')
          .send({roomName: 'Ciekmowisko'})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.nameRooms.length).toBe(2);
            expect(res.body.nameRooms[0].roomName).toEqual('Janowiańsko');
            expect(res.body.nameRooms[1].roomName).toEqual('Ciekmowisko');
          })
          .end(done);
      });
    });
  });

  describe('→Testing /createInvade and /join', () => {
    describe('Testing invade and join to room', () => {
      let realKey = '';

      it('Should join to room by generated link', (done) => {
        request(app)
          .post('/createInvade')
          .send({roomName: 'MainRoom', roomId: '5f2825db31595c1748b5d41c'})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.link).toBeDefined();
            realKey = getAPieceOfLink(res.body.link);
          })
          .end(done);
      });

      it('Should return error, test wrong key', (done) => {
        request(app)
          .post('/join')
          .send({key: 'hehe'})
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.error).toEqual(true);
          })
          .end(done);
      });

      describe('Should add me to room', () => {
        afterEach(async () => {
          await RoomsData.deleteOne({}, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });

        it('Should add me to room', (done) => {
          request(app)
            .post('/join')
            .send({key: realKey})
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
              expect(res.body.status).toEqual('OK');
            })
            .end(done);
        });
      });
    });
  });

  describe('→Testing /deleteRoom', () => {
    beforeAll(async () => {
      const m = new RoomsData({
        userId: 'D3czjdfe',
        rooms: [
          {
            roomName: 'Janowiańsko',
            roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d41c'),
          },
          {
            roomName: 'Hetmanowisko',
            roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d41a'),
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
        if (err) {
          console.log(err);
        }
      });
    });
    it('Should delete the room from my user database', (done) => {
      request(app)
        .post('/deleteRoom')
        .send({roomId: '5f2825db31595c1748b5d41c'})
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.status).toEqual('OK');

          RoomsData.findOne({userId: 'D3czjdfe'}, (err, e) => {
            expect(e.rooms[0].roomName).toEqual('Hetmanowisko');
          });
        })
        .end(done);
    });
  });

  describe('→Testing /editNameRoom', () => {
    beforeAll(async () => {
      const room = new RoomsData({
        userId: 'envczoqiuwer',
        rooms: [
          {
            roomName: 'Halionamy',
            roomId: new mongoose.Types.ObjectId('5f2825db31595c1348b5d41c'),
          },
        ],
      });

      const room2 = new RoomsData({
        userId: 'szy',
        rooms: [
          {
            roomName: 'b',
            roomId: new mongoose.Types.ObjectId('5f2825db31595c1748b5d432'),
          },
        ],
      });

      await room.save((err) => {
        if (err) console.log(err);
      });

      await room2.save((err) => {
        if (err) console.log(err);
      });
    });

    afterEach(async () => {
      RoomsData.deleteMany({}, (err) => {
        if (err) console.log(err);
      });
    });

    it('Change name of the room', (done) => {
      request(app)
        .post('/editNameRoom')
        .send({roomId: '5f2825db31595c1348b5d41c', newRoomName: 'edited name'})
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          RoomsData.find({}, (err, data) => {
            expect(data[0].rooms[0].roomName).toEqual('edited name');
            expect(data[1].rooms[0].roomName).not.toEqual('edited name');
          });
        })
        .end(done);
    });
  });
});
