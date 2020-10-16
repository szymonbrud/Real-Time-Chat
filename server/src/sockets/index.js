import {createUser, getUser, removeUser, leaveFromRoom} from './users';
import {saveMessageDatabase} from 'databaseControll';
import {joinUser} from './voiceChat';

const peers = [];

// const peersNewStructure = [{
//   socket,
//   userName,
//   roomId
// }]

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

    // VOICE V1
    // socket.on('joinVoiceChat', ({name, roomId}, callback) => {
    //   socket.join(roomId + 'Voice');

    //   const roomsUser = joinUser({name, roomId, socketId: socket.id});
    //   callback(roomsUser);
    // });

    // socket.on('sending signal', ({roomId, signal}, callback) => {
    //   socket.to(roomId + 'Voice').emit('user join', {signal});
    // });

    // socket.on('returning signal', ({roomId, signal}, callback) => {
    //   socket.to(roomId + 'Voice').emit('receiving returned signal', {signal});
    // });

    socket.on('joinVoiceChat', ({roomId, roomName}) => {
      // peers[socket.id] = socket;

      const findUser = peers.find((user) => user.socket.id === socket.id);

      if (!findUser) {
        console.log('user did not find');
        peers.push({socket: socket, roomName, roomId});
      } else {
        console.log('user found');
      }

      // wszyscy inni klineci poza senderem dostają initReceive

      peers.forEach((peer) => {
        console.log('1');
        // console.log(peer.roomId);
        console.log(peer.socket.id);
        console.log('2');
        console.log(socket.id);
        // console.log(roomId);

        if (peer.socket.id !== socket.id && peer.roomId === roomId) {
          console.log('run emit');
          console.log(peer.roomId);
          peer.socket.emit('initReceive', socket.id);
        }
      });

      // for (const id in peers) {
      //   if (id === socket.id) continue;
      //   peers[id].emit('initReceive', socket.id);
      // }
    });

    socket.on('signal', (data) => {
      // console.log('sending signal from ' + socket.id + ' to ')
      // if (!peers[data.socket_id]) return;

      const findUser = peers.find((user) => user.socket.id === data.socket_id);

      if (findUser) {
        // peers[data.socket_id].emit('signal', {
        //   socket_id: socket.id,
        //   signal: data.signal,
        // });
        findUser.socket.emit('signal', {
          socket_id: socket.id,
          signal: data.signal,
        });
      } else {
        return;
      }
    });

    /**
     * remove the disconnected peer connection from all other connected clients
     */
    socket.on('disconnect', () => {
      // console.log('socket disconnected ' + socket.id)
      socket.broadcast.emit('removePeer', socket.id);
      delete peers[socket.id];
    });

    /**
     * Send message to client to initiate a connection
     * The sender has already setup a peer connection receiver
     */
    socket.on('initSend', (init_socket_id) => {
      // console.log('INIT SEND by ' + socket.id + ' for ' + init_socket_id)

      const findUser = peers.find((user) => user.socket.id === init_socket_id);
      // peers[init_socket_id].emit('initSend', socket.id);
      findUser.socket.emit('initSend', socket.id);
    });
  });
