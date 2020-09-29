import * as admin from 'firebase-admin';

import errorHandler from 'api/responses/errorHandler';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
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
