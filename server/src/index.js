import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {env} from 'process';

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

mongoose.connect(`mongodb://localhost/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('open', () => {
    console.log('Connect with mongodb');
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

server.listen(process.env.PORT || 5000);

export default app;
