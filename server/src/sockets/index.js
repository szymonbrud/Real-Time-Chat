import {createUser, getUser, removeUser, leaveFromRoom} from './users';
import {saveMessageDatabase} from 'databaseControll';
import {joinUser} from './voiceChat';

export const mainSocket = (io) =>
  io.on('connect', (socket) => {
    // TEXT
    socket.on('join', ({name, roomId, userId}, callback) => {
      if (name.length === 0 && roomId.length === 0) {
        console.error('Invalid data');
        return callback('error');
      }

      const {user, err} = createUser(socket.id, name, roomId, userId);

      if (err) {
        console.error('Error during creating user');
        removeUser(socket.id);
        callback('error');
      } else {
        socket.join(user.room);

        socket.emit('message', {
          user: 'admin',
          text: `${user.username}, witaj w pokoju: ${user.room}`,
        });
        socket.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined!`});

        callback();
      }
    });

    socket.on('disconnectRoom', ({lastRoomId}) => {
      leaveFromRoom(socket.id);
      socket.leave(lastRoomId);
    });

    socket.on('sendMessage', ({text}, callback) => {
      const {room, username, userId, err} = getUser(socket.id);

      if (err) {
        console.error('Error during send the message');
        callback('error');
      }

      socket.to(room).emit('message', {user: username, text: text});

      callback();
      saveMessageDatabase({userName: username, userId, content: text, roomId: room});
    });

    socket.on('disconnect', () => {
      const user = getUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {user: 'Admin', text: `${user.username}, wyszedł.`});
        // io.in(user.room).emit('onlineUsers', {onlineUsers});
      }
      removeUser(socket.id);
    });

    // VOICE
    socket.on('joinVoiceChat', ({name, roomId}, callback) => {
      socket.join(roomId + 'Voice');

      const roomsUser = joinUser({name, roomId, socketId: socket.id});
      callback(roomsUser);
    });

    socket.on('sending signal', ({roomId, signal}, callback) => {
      socket.to(roomId + 'Voice').emit('user join', {signal});
    });

    socket.on('returning signal', ({roomId, signal}, callback) => {
      socket.to(roomId + 'Voice').emit('receiving returned signal', {signal});
    });
  });
