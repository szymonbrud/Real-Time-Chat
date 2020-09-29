import {RoomsData} from 'databaseControll';

export const getRoomsByUser = (roomId, res) => {
  RoomsData.find({userId: roomId}, (err, rooms) => {
    if (err) {
      errorHandler({err, errorCode: 500, errorDescription: 'Database error', res});
      return;
    }

    const resoultRooms = [];

    if (rooms.length !== 0) {
      rooms[0].rooms.forEach((room) => resoultRooms.push(room));
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'OK', nameRooms: resoultRooms});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'OK', nameRooms: resoultRooms});
    }
  });
};

export default getRoomsByUser;
