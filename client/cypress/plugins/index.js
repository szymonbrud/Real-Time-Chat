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

const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const { exec } = require('child_process');

module.exports = (on, config) => {
  on('task', {
    clearDatabase() {
      let allDone = 0;
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
            allDone += 1;
            if (allDone === 2) {
              client.close();
              resolve('done!');
            }
          });
          db.collection('messages').deleteOne({}, (err, data) => {
            if (err) {
              resolve('err');
            }
            allDone += 1;
            if (allDone === 2) {
              resolve('done!');
            }
          });
        });
      });
    },

    runPupTest1(link) {
      exec(`yarn pup:t1 ${link}`);
      return 'is OK';
    },
  });
};
