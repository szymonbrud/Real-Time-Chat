import {createUser, getUser, removeUser, getOnlineUsers} from '../users';
import {sendMessageDatabase} from '../databaseControll';

export const mainSocket = (io) =>
  io.on('connect', (socket) => {
    console.log('connect socket io');

    socket.on('join', ({name, roomId, userId}, callback) => {
      console.log('join socket');

      if (name.length === 0 && roomId.length === 0) {
        return callback('error');
      }

      const {user} = createUser(socket.id, name, roomId, userId);
      socket.join(user.room);

      socket.emit('message', {
        user: 'admin',
        text: `${user.username}, witaj w pokoju: ${user.room}`,
      });
      socket.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined!`});

      callback();
    });

    socket.on('sendMessage', ({text}, callback) => {
      const {room, username, userId} = getUser(socket.id);

      socket.to(room).emit('message', {user: username, text: text});

      callback();
      sendMessageDatabase({userName: username, userId, content: text, roomId: room});
    });

    socket.on('disconnect', () => {
      console.log('disconect!');
      const user = removeUser(socket.id);
      // const onlineUsers = getOnlineUsers(user.room);

      if (user) {
        // io.to(user.room).emit('message', {user: 'Admin', text: `${user.username}, wyszedł.`});
        // io.in(user.room).emit('onlineUsers', {onlineUsers});
      }
    });
  });
