/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};

const fs = require('fs');

// import mongoose, { Schema } from 'mongoose';
const MongoClient = require('mongodb').MongoClient;
import { clearRoomsData } from '../../../server/src/helpers/clearDatabase';
import { RoomsData } from '../../../server/src/databaseControll/index';
import { resolve } from 'cypress/types/bluebird';

const path = require('path');
const seeder = require('cypress-mongo-seeder');

const mongouri = 'mongodb://localhost/realtimechat_test';
const folder = './data';
const dropCollections = true;

module.exports = (on, config) => {
  on('task', {
    updateTask() {
      // return seeder.seedAll(mongouri, folder, dropCollections);
      // const he = clearRoomsData();
      // return he;
      //----
      // // let connection;
      // // let db;
      // MongoClient.connect('mongodb://localhost/realtimechat_tests', {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // });
      // db = await connection.db('realtimechat_tests');
      // // return new Promise(resolve => {
      // //   resolve('asdf');
      // // });
      // return new Promise(async resolve => {
      //   let connection;
      //   let db;
      //   connection = await MongoClient.connect('mongodb://localhost/realtimechat_tests', {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //   });
      //   db = await connection.db('realtimechat_tests');
      //   await db.collection('realtimechat_tests').deleteOne({}, err => {
      //     if (err) {
      //       resolve(err);
      //     }
      //     resolve('sdf');
      //   });
      //   // await RoomsData.deleteOne({}, err => {
      //   //   if (err) {
      //   //     console.log(err);
      //   //     resolve('err');
      //   //   }
      //   //   resolve('success');
      //   // });
      return new Promise(resolve => {
        MongoClient.connect('mongodb://localhost/realtimechat_tests', (err, client) => {
          if (err) {
            resolve('1');
          }
          const db = client.db('realtimechat_test');
          db.collection('roomsdatas').deleteOne({}, (err, data) => {
            if (err) {
              resolve('err');
            }
            resolve('wow');
            // resolve(data);
          });

          // db.collection('f').save({ l: 'heh' });

          // resolve('lol');

          // db.collection('roomsdatas').find({}, (err, data) => {
          //   if (err) {
          //     resolve('err');
          //   }

          //   fs.writeFile('./data.txt', 'he', err => {
          //     if (err) {
          //       resolve(err);
          //     }

          //     resolve('saved');
          //   });

          // resolve(data);
          // });

          // RoomsData.deleteOne({}, err => {
          //   resolve('he');
          //   console.log('HERE');
          //   if (err) {
          //     console.log(err);
          //   }
          //   resolve('asdf');
          // });

          // if (err) {
          //   console.log(`MONGO CONNECTION ERROR: ${err}`);
          //   resolve('err');
          //   throw err;
          // } else {
          //   // const shemaOfRoom = new Schema({
          //   //   userId: { type: String, required: true },
          //   //   rooms: [
          //   //     {
          //   //       roomName: { type: String, required: true },
          //   //       roomId: Schema.Types.ObjectId,
          //   //     },
          //   //   ],
          //   // });
          //   // const RoomsData = mongoose.model('RoomsData', shemaOfRoom);
          // }
        });
      });
      // }); // end of return Promise
    },
  }); // end of task
};
