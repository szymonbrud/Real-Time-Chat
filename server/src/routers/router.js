const express = require('express');
const router = new express.Router();
import bodyParser from 'body-parser';

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
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'OK', messages: messages});
  })
    .sort({date: 1})
    .limit(30);
});

router.post('/createRoom', [urlencodedParser, verifyUser], (req, res) => {
  const {roomName} = req.body;

  RoomsData.find({userId: req.userId}, (err, rooms) => {
    checkError(err, res);

    const newRoom = new RoomsData({roomName: roomName});

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
});

export default router;
