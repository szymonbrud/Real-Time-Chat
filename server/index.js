import express from 'express';
import http from 'http'
import socketio from 'socket.io';
import cors from 'cors';

import router from './router';

const whitelist = ['http://localhost:3000', 'http://localhost:5500', "[::1]:5500"];
const corsOptions = {
  credentials: true, // This is important.
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
  })
  socket.on('disconnect', () => {
    console.log('user had left!!');
  })
})

server.listen(5500, () => console.log('Bakcend working on 5500'));