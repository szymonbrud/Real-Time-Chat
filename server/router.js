const express = require("express");
const router = express.Router();
import bodyParser from 'body-parser';

import * as admin from 'firebase-admin';

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://testmakemorefocus.firebaseio.com"
});

router.get("/", (req, res) => {
  res.send("Server is up and running.").status(200);
});

router.post("/check", urlencodedParser, (req, res) => {
  const {token} = req.body;
    
  admin.auth().verifyIdToken(token)
  .then(function(decodedToken) {
    // let uid = decodedToken.uid;
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'Ok'})
  }).catch(function(error) {
    console.log(error)
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'err'})
  });
});



export default router;
