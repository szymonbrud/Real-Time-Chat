import * as admin from 'firebase-admin';

import errorHandler from 'api/responses/errorHandler';

import {env} from 'process';
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.PROJECT_ID,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
  }),
});

const verifyUser = (req, res, next) => {
  const {token} = req.body;

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      req.userId = uid;

      next();
    })
    .catch((error) => {
      errorHandler({
        res,
        err: error,
        errorCode: 401,
        errorDescription: 'error during the authorization process',
      });
    });
};

export default verifyUser;
