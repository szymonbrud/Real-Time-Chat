import express from 'express';
import http from 'http'
import socketio from 'socket.io';
import cors from 'cors';


import fs from 'fs'

import router from './router';
import { createUser, getUser, removeUser, getOnlineUsers } from './users';

const whitelist = ['http://localhost:3000', 'https://real-time-chat-szymonqqaz.netlify.app/'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // databaseURL: "https://testmakemorefocus.firebaseio.com"
  databaseURL: "http://localhost:9000"
});



const app = express();

const server = http.createServer(app);

const io = socketio(server);

app.use(cors(corsOptions));
// app.use(cors());
app.use(router);

// io.on('connect', socket => {
//   socket.on('join', ({name, room}, callback) => {
//     const {error, user} = createUser(socket.id, name, room);

//     if(error){
//       return callback(error);
//     }

//     socket.join(user.room);

//     const onlineUsers = getOnlineUsers(user.room);

//     socket.emit('message', {user: "admin", text: `${user.username}, witaj w pokoju: ${user.room}`});
//     socket.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined!`});
//     io.in(user.room).emit('onlineUsers', {onlineUsers});

//     callback();
//   });

//   socket.on('sendMessage', ({text}, callback) => {
//     const {room, username} = getUser(socket.id);

//     socket.to(room).emit('message', {user: username, text: text});

//     callback();
//   })

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);
//     const onlineUsers = getOnlineUsers(user.room);
    
//     if(user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.username}, wyszedł.` });
//       io.in(user.room).emit('onlineUsers', {onlineUsers});
//     }
//   })
// })

io.on('connect', socket => {
  socket.on('join', ({userTokenId}, callback) => {
    
    admin.auth().verifyIdToken(userTokenId)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      console.log(uid)
    }).catch(function(error) {
      console.log(error)
    });

    const db = admin.database();

    // if (window.location.hostname === 'localhost') {
      // db.settings({
      //   host: 'localhost:8080',
      //   ssl: false,
      // });
    // }

    console.log(db.goOnline())
    // const ref = db.ref('hello');


    // ref.set({name: 'szymon'}).then(() => console.log('successs')).catch(err => console.log(err))

    // var ref = db.ref("restricted_access/secret_document");
    // ref.once("value", function(snapshot) {
    //   console.log(snapshot.val());
    // });

    // pobierzemy z bazy danych pokoje
    // odeślemy używkownikowi dane
  })
})

server.listen(process.env.PORT || 5500, () => console.log(`Server has started.`));