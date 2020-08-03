import mongoose from 'mongoose';

import {RoomsDataSchema, MessagesAllSchema} from '../databaseControll/Schema';

export const RoomsData = mongoose.model('RoomsData', RoomsDataSchema);
export const AllMessages = mongoose.model('messages', MessagesAllSchema);

export const getAllRooms = (roomId, res) => {
  RoomsData.find({userId: roomId}, (err, rooms) => {
    if (err) {
      console.log('HERE');
      res.send({status: 'error'});
      res.end();
      return;
    }

    const nameRooms = [];
    if (rooms.length !== 0) {
      rooms[0].rooms.forEach((e) => nameRooms.push(e));
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'OK', nameRooms});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'OK', nameRooms: []});
    }
  });
};

export const checkError = (err, res) => {
  if (err) {
    res.send({status: 'error'});
    res.end();
  }
};

export const sendMessageDatabase = ({userName, userId, content, roomId}) => {
  // const date = new Date().toLocaleString('en-GB');
  const date = new Date();

  const message = new AllMessages({
    senderName: userName,
    senderId: userId,
    content,
    roomId,
    date,
  });
  message.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};
