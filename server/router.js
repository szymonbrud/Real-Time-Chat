const express = require("express");
const router = express.Router();

import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://testmakemorefocus.firebaseio.com"
});

router.get("/", (req, res) => {
  res.send("Server is up and running.").status(200);
});

router.get("/check", (req, res) => {
  // res.send("Server is up and running.").status(200);
  
  //TODO: to może nie być dobry sposób należy go zweryfikować poprzez zapytanie gdzieś lub wyszukanie w inteneccie

  const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkNTU0ZjBjMTJjNjQ3MGZiMTg1MmY3OWRiZjY0ZjhjODQzYmIxZDciLCJ0eXAiOiJKV1QifQ.eyJwcm92aWRlcl9pZCI6ImFub255bW91cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90ZXN0bWFrZW1vcmVmb2N1cyIsImF1ZCI6InRlc3RtYWtlbW9yZWZvY3VzIiwiYXV0aF90aW1lIjoxNTkzNjE2MzAwLCJ1c2VyX2lkIjoiMW9hRHg3NjlKRVVsam4wQmJEZWduVzNYcG5sMiIsInN1YiI6IjFvYUR4NzY5SkVVbGpuMEJiRGVnblczWHBubDIiLCJpYXQiOjE1OTM2MTYzMDAsImV4cCI6MTU5MzYxOTkwMCwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJhbm9ueW1vdXMifX0.k8G1kis4DJTbCrHBiE5aCP7lqlRhXyCmQX4LKs7aozp9UbyX8LrrINNEbjKmcj7Ivbi0rOWeUfP75ECJapV-1giJdNBMsQs9rY_b1UtQpfTuYcP--1SUOLlJvZhTdorp7zzMdKekya63ct47-8Rb0X6Vabn0qseHman69eYXUfrAU9QQYTiVfuywd-oYvVW0rKivWczCOOn6-syAnTJGckd4juobiNlEKg_A-TR0JQf7zy2SwVh3aZAS7Y47Qj0otMYOSTTC3Kcuc2HRORyLWe0FsMEDtOgQ264yxcDqG5mhe2Nu75r4b1WScuTcAmYzsfxNRU630hKw2Ye0CGUdaA"

  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    console.log(uid)
  }).catch(function(error) {
    console.log(error)
  });

  res.end();
});



export default router;

// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Szymon\Desktop\Real-Time-Chat\server\service-account-file.json"