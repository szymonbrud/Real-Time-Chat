import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import usersRouter from './routers/usersRoute';
import router from './routers/router';

import {createUser, getUser, removeUser, getOnlineUsers} from './users';

const mainRoute = new express.Router();

mongoose.connect('mongodb://localhost/realtimechat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once('open', () => {
    console.log('connect');
  })
  .on('error', (err) => {
    console.log(err);
  });

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'https://real-time-chat-szymonqqaz.netlify.app/'];

// eslint-disable-next-line
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
};
// app.use(cors(corsOptions));
app.use(cors());

app.use([router, mainRoute]);
app.use('/user', usersRouter);

io.on('connect', (socket) => {
  socket.on('join', ({name, room}, callback) => {
    const {error, user} = createUser(socket.id, name, room);

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    const onlineUsers = getOnlineUsers(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.username}, witaj w pokojuasdfasdf: ${user.room}`,
    });
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

server.listen(process.env.PORT || 5500, () => console.log(`Server has started.`));

// import {UsersSchema} from './databaseControll/Schema';

// mainRoute.get('/w', (req, res) => {
//   hello.find({}, (err, users) => {
//     console.log(err);
//     console.log(users);
//   });
//   res.end();
// });

// mainRoute.get('/save', (req, res) => {
//   elephant.save((err, eleph) => {
//     if (err) {
//       console.log(err);
//       res.end();
//       return;
//     }
//     console.log(eleph);
//     res.end();
//   });
// });

// const User = mongoose.model('user', UsersSchema);

// mainRoute.get('/read', (req, res) => {
//   Animal.find({}, (err, eleph) => {
//     if (err) {
//       console.log(err);
//       res.end();
//       return;
//     }
//     console.log(eleph);
//     res.end();
//   });
// });

// mainRoute.get('/readById', (req, res) => {
//   User.find({'rooms._id': new mongoose.Types.ObjectId('5f1318b11461584b20fb9f61')},
//    (err, user) => {
//     if (err) {
//       console.log(err);
//       res.end();
//       return;
//     }
//     console.log(user);
//     res.end();
//   });
// });

// mainRoute.get('/readUsers', (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       console.log(err);
//       res.end();
//       return;
//     }
//     console.log(users);

//     res.end();
//   });
// });

// mainRoute.get('/removeOneObject', (req, res) => {
//   const id = '5f13182236a8a742b8e6d0c4';

//   User.update(
//     {'rooms._id': new mongoose.Types.ObjectId(id)},
//     {$pull: {rooms: {_id: new mongoose.Types.ObjectId(id)}}},
//     {safe: true},
//     (err, obj) => {
//       if (err) {
//         console.log(err);
//         res.end();
//         return;
//       }
//       console.log(obj);
//       res.end();
//     },
//   );
// });
// mainRoute.get('/newUser', (req, res) => {
//   const userData = new User({userId: 'asdfawerqwefasdfavxzc', name: 'HEHEH'});
//   userData.save((err, done) => {
//     console.log(done);
//   });
//   res.end();
// });

// mainRoute.get('/newUserRoom', (req, res) => {
//   User.update(
//     {},
//     {
//       $push: {rooms: {roomName: 'Jhonowie', roomId: '1234dfasd'}},
//     },
//     (err, done) => {
//       console.log(done);
//     },
//   );
//   res.end();
// });
