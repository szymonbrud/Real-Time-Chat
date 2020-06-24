import express from 'express';
import http from 'http'
import socketio from 'socket.io';
import cors from 'cors';

import router from './router';

import { createUser, getUser, removeUser } from './users'

const whitelist = ['http://localhost:3000', 'http://localhost:5500', "[::1]:5500"];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors(corsOptions));
app.use(router);

io.on('connect', socket => {
  console.log('we have a new connection')
  socket.on('join', ({name, room}, callback) => {
    console.log(`User: ${name} join`);
    console.log(room);
    console.log(socket.id);

    const {error, user} = createUser(socket.id, name, room);

    if(error){
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', {user: "admin", text: `${user.username}, welcome to room ${user.room}`});
    socket.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined!`});

    callback();
  });

  socket.on('sendMessage', ({text}, callback) => {
    const {room, username} = getUser(socket.id);

    socket.to(room).emit('message', {user: username, text: text});

    callback();
  })

  socket.on('disconnect', () => {
    console.log('user had left!!');
    const user = removeUser(socket.id);
    
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.username} has left.` });
      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
})

server.listen(5500, () => console.log('Bakcend working on 5500'));