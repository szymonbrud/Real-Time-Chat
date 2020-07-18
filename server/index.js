import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, {Schema} from 'mongoose';

import router from './router';
import {createUser, getUser, removeUser, getOnlineUsers} from './users';

const mainRoute = new express.Router();

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
  console.log('connect');
}).on('error', (err) => {
  console.log(err);
});


const whitelist = ['http://localhost:3000', 'https://real-time-chat-szymonqqaz.netlify.app/'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true);
    };

    callback(new Error('Not allowed by CORS'));
  },
};

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.use(cors());
app.use([router, mainRoute]);

const animalSchema = new Schema({
  name: String,
  weight: Number,
});

const Animal = mongoose.model('Animal', animalSchema);

const elephant = new Animal({name: 'elephant', weight: 100});

console.log(elephant);

const hello = mongoose.model('cars', {model: String, brand: String});

mainRoute.get('/w', (req, res) => {
  hello.find({}, (err, users) => {
    console.log(err);
    console.log(users);
  });
  res.end();
});

mainRoute.get('/save', (req, res) => {
  elephant.save((err, eleph) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }
    console.log(eleph);
    res.end();
  });
});

mainRoute.get('/read', (req, res) => {
  Animal.find({}, (err, eleph) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }
    console.log(eleph);
    res.end();
  });
});


io.on('connect', (socket) => {
  socket.on('join', ({name, room}, callback) => {
    const {error, user} = createUser(socket.id, name, room);

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    const onlineUsers = getOnlineUsers(user.room);

    socket.emit('message', {user: 'admin', text: `${user.username}, witaj w pokoju: ${user.room}`});
    socket.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined!`});
    io.in(user.room).emit('onlineUsers', {onlineUsers});

    callback();
  });

  socket.on('sendMessage', ({text}, callback) => {
    const {room, username} = getUser(socket.id);

    socket.to(room).emit('message', {user: username, text: text});

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const onlineUsers = getOnlineUsers(user.room);

    if (user) {
      io.to(user.room).emit('message', {user: 'Admin', text: `${user.username}, wyszedł.`});
      io.in(user.room).emit('onlineUsers', {onlineUsers});
    }
  });
});

server.listen(
    process.env.PORT || 5500, () => console.log(`Server has started.`),
);
