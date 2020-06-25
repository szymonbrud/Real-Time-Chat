import express from 'express';
import http from 'http'
import socketio from 'socket.io';
import cors from 'cors';

import router from './router';

import { createUser, getUser, removeUser } from './users'

const whitelist = ['http://localhost:3000', 'https://real-time-chat-szymonqqaz.netlify.app/'];
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
  socket.on('join', ({name, room}, callback) => {
    const {error, user} = createUser(socket.id, name, room);

    if(error){
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', {user: "admin", text: `${user.username}, witaj w pokoju: ${user.room}`});
    socket.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined!`});

    callback();
  });

  socket.on('sendMessage', ({text}, callback) => {
    const {room, username} = getUser(socket.id);

    socket.to(room).emit('message', {user: username, text: text});

    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.username}, wyszedł.` });
    }
  })
})

server.listen(process.env.PORT || 5500, () => console.log(`Server has started.`));