import {createUser, getUser, removeUser, leaveFromRoom, users} from './users';
import {saveMessageDatabase} from 'databaseControll';
import {joinToVoiceChat} from 'api/VoiceChat';

const peers = [];

const isActive = true;

export const mainSocket = (io) =>
  io.on('connect', (socket) => {
    // MESSAGE CHAT

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
      }
      removeUser(socket.id);
    });

    // VOICE CHAT

    socket.on('joinVoiceChat', ({roomId, name, userId}, callback) => {
      if (joinToVoiceChat(userId, roomId)) {
        const findUser = peers.find((user) => user.socket.id === socket.id);

        if (!findUser) {
          console.log('user did not find');
          peers.push({socket: socket, name, roomId});
        } else {
          console.log('user found');
        }

        peers.forEach((peer) => {
          console.log('1');
          console.log(peer.socket.id);
          console.log('2');
          console.log(socket.id);

          if (peer.socket.id !== socket.id && peer.roomId === roomId) {
            console.log('run emit');
            console.log(peer.roomId);
            peer.socket.emit('initReceive', {socket_id: socket.id, name});
          }
        });
        callback({success: true});
      } else {
        callback({success: false, desc: 'U have not premssion to join :('});
      }
    });

    socket.on('signal', (data) => {
      const findUser = peers.find((user) => user.socket.id === data.socket_id);

      if (findUser) {
        findUser.socket.emit('signal', {
          socket_id: socket.id,
          signal: data.signal,
          userName: findUser.name,
        });
      } else {
        return;
      }
    });

    socket.on('disconnectVoice', () => {
      socket.broadcast.emit('removePeer', socket.id);
      delete peers[socket.id];
    });

    socket.on('initSend', ({socket_id, name}) => {
      const findUser = peers.find((user) => user.socket.id === socket_id);
      findUser.socket.emit('initSend', {socket_id: socket.id, userName: name});
    });
  });
