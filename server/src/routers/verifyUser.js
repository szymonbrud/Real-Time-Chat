import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const verifyUser = (req, res, next) => {
  const {token} = req.body;

  admin
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      const uid = decodedToken.uid;
      // res.setHeader('Content-Type', 'application/json');
      // res.send({status: 'Ok'});
      req.userId = uid;

      next();
    })
    .catch(function (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'err'});
    });
};

export default verifyUser;
