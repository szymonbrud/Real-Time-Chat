const express = require('express');
const router = new express.Router();

import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import verifyUser from 'api/controllers/verifyUser';
import {AllMessages, RoomsData} from 'databaseControll';
import {getRoomsByUser} from 'api/responses';
import {errorHandler} from 'api/responses';
import generateQrcodeByLink from 'api/functions/generateQrcode';

const urlencodedParser = bodyParser.urlencoded({extended: false});

const invadeKeys = [];

const generateInvade = (roomId, roomName, userId) => {
  const findedInvade = invadeKeys.find((element) => {
    if (element.roomId === roomId && element.userId === userId) return element;
  });

  if (findedInvade) {
    return findedInvade.key;
  } else {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    invadeKeys.push({roomId, key, roomName, userId});
    return key;
  }
};

const checkValidateInvadedKeys = (key) => {
  const find = invadeKeys.find((e) => e.key === key);
  if (find) {
    const findIndex = invadeKeys.findIndex((e) => e.key === key);
    invadeKeys.splice(findIndex, 1);
  }
  return find;
};

router.get('/', (req, res) => {
  res.send('Server is up and running!').status(200);
});

router.post('/rooms', [urlencodedParser, verifyUser], (req, res) => {
  RoomsData.find({userId: req.userId}, (err, rooms) => {
    if (err) {
      errorHandler({err, errorCode: 500, errorDescription: 'Database error', res});
      return;
    }

    const resoultRooms = [];

    if (rooms.length !== 0) {
      rooms[0].rooms.forEach((room) => resoultRooms.push(room));

      const roomIds = [];

      resoultRooms.forEach((room) => roomIds.push(room.roomId));

      const messages = AllMessages.aggregate([
        {
          $match: {
            roomId: {$in: roomIds},
          },
        },
        {$sort: {date: -1}},
        {
          $group: {
            _id: '$roomId',
            root: {$first: '$$ROOT'},
          },
        },
        {$replaceWith: '$root'},
        {$limit: roomIds.length},
      ]).exec();

      messages
        .then((resoultMessages) => {
          const dataToReturn = [];

          resoultRooms.forEach((room) => {
            const message = resoultMessages.find((message) => {
              if (
                new mongoose.Types.ObjectId(room.roomId).toHexString() ===
                new mongoose.Types.ObjectId(message.roomId).toHexString()
              ) {
                return message;
              }
            });

            dataToReturn.push({
              roomName: room.roomName,
              roomId: room.roomId,
              date: message && message.date,
              senderName: message && message.senderName,
              content: message && message.content,
            });
          });

          res.setHeader('Content-Type', 'application/json');
          res.send({status: 'OK', rooms: dataToReturn});
        })
        .catch((err) => {
          errorHandler({err, errorCode: 500, errorDescription: 'Database error', res});
          return;
        });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'OK', nameRooms: resoultRooms});
    }
  });
});

router.post('/messages', [urlencodedParser, verifyUser], (req, res) => {
  const {roomId} = req.body;
  AllMessages.find({roomId}, (err, messages) => {
    if (err) {
      errorHandler({req, errorCode: 501, errorDescription: 'Error during get messages', err});
    }

    const messagesToSend = [];

    messages.map(({date, _id, senderName, senderId, content, roomId}) => {
      if (senderId === req.userId) {
        messagesToSend.push({date, _id, senderName, content, roomId, isSendByMe: true});
      } else {
        messagesToSend.push({date, _id, senderName, content, roomId, isSendByMe: false});
      }
    });

    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'OK', messages: messagesToSend});
  })
    .sort({date: 1})
    .limit(30);
});

router.post('/createRoom', [urlencodedParser, verifyUser], (req, res) => {
  const {roomName} = req.body;

  if (roomName === '' || !roomName) {
    errorHandler({req, errorCode: 400, errorDescription: 'Incomplete request data'});
  } else {
    RoomsData.find({userId: req.userId}, (err, rooms) => {
      if (err) {
        errorHandler({err, res, errorCode: 500, errorDescription: 'Database error - createRoom'});
      }

      const newRoom = new RoomsData({userId: req.userId, rooms: [{roomName: roomName}]});

      if (rooms.length === 0) {
        newRoom.save((err, e) => {
          if (err) {
            errorHandler({
              err,
              res,
              errorCode: 500,
              errorDescription: 'Database error - createRoom',
            });
          }

          getRoomsByUser(req.userId, res);
        });
      } else {
        RoomsData.update({userId: req.userId}, {$push: {rooms: {roomName: roomName}}}, (err, e) => {
          if (err) {
            errorHandler({
              err,
              res,
              errorCode: 500,
              errorDescription: 'Database error - createRoom',
            });
          }

          if (e.ok) {
            getRoomsByUser(req.userId, res);
          }
        });
      }
    });
  }
});

router.post('/createInvade', [urlencodedParser, verifyUser], async (req, res) => {
  const {roomId, roomName} = req.body;
  const {userId} = req;

  if (!roomId || !roomName || roomId === '' || roomName === '') {
    errorHandler({res, errorDescription: 'Bad data', errorCode: 400});
  } else {
    const key = generateInvade(roomId, roomName, userId);

    const link = `http://localhost:3000/join/${key}/${roomName}/message`;

    const qrcode = await generateQrcodeByLink(link);

    res.send({status: 'OK', link, image: qrcode});
    res.end();
    // axios
    //   .get(`https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=150x150`, {
    //     responseType: 'arraybuffer',
    //   })
    //   .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
    //   .then((e) => {
    //     res.send({status: 'OK', link, image: e});
    //     res.end();
    //   });
  }
});

router.post('/join', [urlencodedParser, verifyUser], (req, res) => {
  const {key} = req.body;

  const roomData = checkValidateInvadedKeys(key);

  if (roomData) {
    RoomsData.find({userId: req.userId}, (err, rooms) => {
      if (err) {
        errorHandler({err, res, errorCode: 500, errorDescription: 'Database error'});
      }

      if (rooms.length === 0) {
        const newRoom = new RoomsData({
          userId: req.userId,
          rooms: [
            {
              roomName: roomData.roomName,
              roomId: new mongoose.Types.ObjectId(roomData.roomId),
            },
          ],
        });

        newRoom.save((err, e) => {
          if (err) {
            errorHandler({err, res, errorCode: 500, errorDescription: 'Database error'});
          }

          res.setHeader('Content-Type', 'application/json');
          res.send({status: 'OK'});
        });
      } else {
        const findIsRoomExist = rooms[0].rooms.find(
          (room) => room.roomId.toString() === roomData.roomId,
        );
        if (findIsRoomExist) {
          errorHandler({res, errorCode: 409, errorDescription: 'Room is already exist'});
        } else {
          RoomsData.update(
            {userId: req.userId},
            {
              $push: {
                rooms: {
                  roomName: roomData.roomName,
                  roomId: new mongoose.Types.ObjectId(roomData.roomId),
                },
              },
            },
            (err, updateResponse) => {
              if (err) {
                errorHandler({err, res, errorCode: 500, errorDescription: 'Database error'});
              }

              if (updateResponse.ok) {
                res.setHeader('Content-Type', 'application/json');
                res.send({status: 'OK'});
              }
            },
          );
        }
      }
    });
  } else {
    errorHandler({res, errorDescription: 'Bad data', errorCode: 400});
  }
});

router.delete('/deleteRoom', [urlencodedParser, verifyUser], (req, res) => {
  const {roomId} = req.body;
  const {userId} = req;

  if (roomId) {
    RoomsData.findOne({userId}, (err, usersRoomsData) => {
      const roomIdToDelete = usersRoomsData.rooms.findIndex(
        (room) => new mongoose.Types.ObjectId(room.roomId).toHexString() === roomId,
      );

      usersRoomsData.rooms.splice(roomIdToDelete, 1);

      usersRoomsData.save((err) => {
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 'OK'});
      });
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'err'});
  }
});

router.put('/editNameRoom', [urlencodedParser, verifyUser], (req, res) => {
  const {newRoomName, roomId} = req.body;

  if (roomId && newRoomName) {
    RoomsData.updateMany(
      {rooms: {$elemMatch: {roomId: new mongoose.Types.ObjectId(roomId)}}},
      {
        'rooms.$.roomName': newRoomName,
      },
      (err, rooms) => {
        res.setHeader('Content-Type', 'application/json');
        res.send({status: 'OK'});
      },
    );
  } else {
    errorHandler({res, errorCode: 400, errorDescription: 'Incomplete data'});
  }
});

export default router;
