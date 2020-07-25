import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import usersRouter from './routers/usersRoute';
import router from './routers/router';
import {mainSocket} from './sockets';

const mainRoute = new express.Router();

mongoose.connect('mongodb://localhost/realtimechat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('open', () => {
    console.log('connect with mongodb');
  })
  .on('error', (err) => {
    console.log(err);
  });

const app = express();
const server = http.createServer(app);
export const io = socketio(server);

mainSocket(io);

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

server.listen(process.env.PORT || 5500, () => console.log(`Server has started.`));
