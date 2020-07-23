const express = require('express');
const router = new express.Router();
import bodyParser from 'body-parser';
import mongoose, {Schema} from 'mongoose';

import {
  RoomsSchema,
  RoomsDataSchema,
  MessagesSchema,
  MessagesAllSchema,
} from '../databaseControll/Schema';
import verifyUser from './verifyUser';

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
  res.send('Server is up and running.').status(200);
});

// const Rooms = mongoose.model('rooms', RoomsSchema);
const RoomsData = mongoose.model('RoomsData', RoomsDataSchema);
const AllMessages = mongoose.model('messages', MessagesAllSchema);

const mess = new AllMessages({
  senderName: 'Halina',
  content: 'WE should talk now',
  date: Date.now(),
  roomId: new mongoose.Types.ObjectId('5f183c68d920ec03b9408aaa'),
});

router.post('/getRooms', [urlencodedParser, verifyUser], (req, res) => {
  RoomsData.find({userId: req.userId}, (err, rooms) => {
    const nameRooms = [];
    rooms[0].rooms.forEach((e) => nameRooms.push(e));

    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'Ok', nameRooms});
  });
});

router.post('/getMessages', [urlencodedParser, verifyUser], (req, res) => {
  const {roomId} = req.body;
  AllMessages.find({roomId: roomId}, (err, messages) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'OK', messages: messages});
  })
    .sort({date: -1})
    .limit(30);
});

router.post('/createRoom', [urlencodedParser, verifyUser], (req, res) => {
  const {roomName} = req.body;

  RoomsData.find({userId: req.userId}, (err, rooms) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }

    const newRoom = new RoomsData({roomName: roomName});

    if (rooms.length === 0) {
      newRoom.save((err, e) => {
        console.log(err);
        console.log(e);
      });
    } else {
      RoomsData.update({userId: req.userId}, {$push: {rooms: {roomName: roomName}}}, (err, e) => {
        if (err) {
          res.end();
          return;
        }
        if (e.ok) {
          RoomsData.find({userId: req.userId}, (err, updatedRooms) => {
            if (err) {
              res.end();
              return;
            }
            const nameRooms = [];
            updatedRooms[0].rooms.forEach((e) => nameRooms.push(e));

            res.setHeader('Content-Type', 'application/json');
            res.send({status: 'OK', nameRooms: nameRooms});
          });
        }
        console.log(err);
        console.log(e);
      });
    }
  });
});

export default router;

// router.post('/getRooms', [urlencodedParser, verifyUser], (req, res) => {
//   Rooms.find({users: {$in: req.userId}}, (err, rooms) => {
//     if (err) {
//       res.send({status: 'error'});
//       return;
//     }
//     console.log(rooms);
//     res.setHeader('Content-Type', 'application/json');
//     res.send({status: 'Ok', rooms});
//   }).sort({'$messages.order': -1});
//   // .slice('messages', 1);
// });

// router.post('/getRooms', [urlencodedParser, verifyUser], (req, res) => {
//   RoomsData.find({}, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(data);
//     const Messages = mongoose.model(`messages_${data[0].rooms[0]}`, MessagesSchema);

//     // const me = new Messages({date: Date.now(), senderName: 'me', content: 'heh'});
//     // me.save();

//     Messages.find({}, (err, mess) => {
//       console.log(mess);
//       console.log(err);
//     });
//   });
// });
