import mongoose from 'mongoose';

import {RoomsDataSchema, MessagesAllSchema} from '../databaseControll/Schema';

export const RoomsData = mongoose.model('RoomsData', RoomsDataSchema);
export const AllMessages = mongoose.model('messages', MessagesAllSchema);

export const getAllRooms = (roomId, res) => {
  RoomsData.find({userId: roomId}, (err, rooms) => {
    if (err) {
      res.send({status: 'error'});
      return;
    }

    const nameRooms = [];
    rooms[0].rooms.forEach((e) => nameRooms.push(e));

    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'OK', nameRooms});
  });
};

export const checkError = (err, res) => {
  if (err) {
    res.send({status: 'error'});
    res.end();
  }
};
