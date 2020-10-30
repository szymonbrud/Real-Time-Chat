import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {env} from 'process';
require('dotenv').config();

import {mainSocket} from './sockets';
import router from 'api/routers/router';

const mainRoute = new express.Router();

let databaseName = '';

if (env.NODE_ENV === 'test') {
  databaseName = 'realtimechat_test';
} else if (env.npm_lifecycle_event === 'test:cy') {
  console.log('start testing');
  databaseName = 'realtimechat_test';
} else {
  databaseName = 'realtimechat';
}

if (
  env.NODE_ENV === 'test' ||
  env.npm_lifecycle_event === 'test:cy' ||
  process.env.NODE_ENV === 'develop'
) {
  mongoose.connect(`mongodb://localhost/${databaseName}`, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  });
} else if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  });
}

mongoose.connection
  .once('open', () => {
    console.log('Connect with mongodb');
  })
  .on('error', (err) => {
    console.log(err);
  });

const app = express();
export const server = http.createServer(app);
export const io = socketio(server);

mainSocket(io);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const whitelist = [process.env.BACKEND_URL];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
};

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use([router, mainRoute]);

server.listen(process.env.PORT || 5000);

export default app;
