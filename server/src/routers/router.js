const express = require('express');
const router = new express.Router();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import verifyUser from './verifyUser';
import {AllMessages, RoomsData, getAllRooms, checkError} from '../databaseControll';

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
  res.send('Server is up and running!').status(200);
});

router.post('/getRooms', [urlencodedParser, verifyUser], (req, res) => {
  getAllRooms(req.userId, res);
});

router.post('/getMessages', [urlencodedParser, verifyUser], (req, res) => {
  const {roomId} = req.body;
  AllMessages.find({roomId: roomId}, (err, messages) => {
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
    res.send({status: 'error'});
    res.end();
  } else {
    RoomsData.find({userId: req.userId}, (err, rooms) => {
      checkError(err, res);

      const newRoom = new RoomsData({userId: req.userId, rooms: [{roomName: roomName}]});

      if (rooms.length === 0) {
        newRoom.save((err, e) => {
          checkError(err, res);
          getAllRooms(req.userId, res);
        });
      } else {
        RoomsData.update({userId: req.userId}, {$push: {rooms: {roomName: roomName}}}, (err, e) => {
          checkError(err, res);
          if (e.ok) {
            getAllRooms(req.userId, res);
          }
        });
      }
    });
  }
});

const invadeKeys = [];

const generateInvade = (roomId, roomName) => {
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  invadeKeys.push({roomId, key, roomName});
  return key;
};

const checkValidateInvadedKeys = (key) => {
  const find = invadeKeys.find((e) => e.key === key);
  if (find) {
    const findIndex = invadeKeys.findIndex((e) => e.key === key);
    invadeKeys.splice(findIndex, 1);
  }
  return find;
};

router.post('/createInvade', [urlencodedParser], (req, res) => {
  const {roomId, roomName} = req.body;

  if (!roomId || !roomName || roomId === '' || roomName === '') {
    res.send({status: 'error'});
    res.end();
  } else {
    const key = generateInvade(roomId, roomName);
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'OK', link: `http://localhost:3000/join/${key}/${roomName}`});
    res.end();
  }
});

router.post('/join', [urlencodedParser, verifyUser], (req, res) => {
  const {key} = req.body;

  const roomData = checkValidateInvadedKeys(key);

  if (roomData) {
    RoomsData.find({userId: req.userId}, (err, rooms) => {
      checkError(err, res);

      const newRoom = new RoomsData({
        userId: req.userId,
        rooms: [
          {
            roomName: roomData.roomName,
            _id: new mongoose.Types.ObjectId(roomData.roomId),
          },
        ],
      });

      if (rooms.length === 0) {
        newRoom.save((err, e) => {
          checkError(err, res);
          res.setHeader('Content-Type', 'application/json');
          res.send({status: 'OK'});
        });
      } else {
        const findRoom = rooms[0].rooms.find((e) => e._id.toString() === roomData.roomId);
        if (findRoom) {
          res.setHeader('Content-Type', 'application/json');
          res.send({error: true});
        } else {
          RoomsData.update(
            {userId: req.userId},
            {
              $push: {
                rooms: {
                  roomName: roomData.roomName,
                  _id: new mongoose.Types.ObjectId(roomData.roomId),
                },
              },
            },
            (err, e) => {
              checkError(err, res);
              if (e.ok) {
                res.setHeader('Content-Type', 'application/json');
                res.send({status: 'OK'});
              }
            },
          );
        }
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send({error: true});
  }
});

export default router;

// TODO: 1) zrobić tak aby tworzył się nowy profil użytkownika gdy chce dołaczyć do
// pokoju lub go stworzyć ✔
// TODO: 2) zrobić przycisk dołaczania do pokoju który generuje link ✔
// TODO: 3) zrobić wyskakujący błąd gdy coś pójdzie nie tak ✔
// TODO: 4) zoribc przekierowanie na front-end ✔
// TODO: 5) zabezpieczenie aby się nie dało
// dołączyć to tego samogo pokoju kilka razy przez to samo konto ✔
// TODO: 6) zrobić tak aby się tego samego linku nie dało urzyć 2 razy ✔
// TODO: 7) zrobić tak aby wiadomości były wysyłane zależnie czy to są
// od odbiorcy czy od kogoś innego ✔
// TODO: 8) zrobić tak aby się nie dało pisać z tego samego konta do
// samego siebie jako inna osoba tylko aby to było połączone ✔
// TODO: 10) pomyśleć nad tym aby socket.io nie używał się 2 razy ✔
// TODO: 11) zrobić auto scrolla ✔

// TODO: 12) zrobić review i testy
// TOOD: 12.1) Jakie testy mogę przeprowadzić po obu stronach
// TODO: 13) Napisać skryp basch który by mi włączył mongoodb przed nodemonem
