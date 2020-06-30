import { useEffect, useState } from 'react';
import firebase from 'firebase';

const useAuthentication = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const [isUserLogin, setIsUserLogin] = useState('loading');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsUserLogin('login');
        console.log(user);
      } else {
        setIsUserLogin('not');
      }
    });
  }, []);

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.

        var token = result.credential as firebase.auth.OAuthCredential;
        console.log(token);
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
      });
  };

  const loginWithAnonymuss = () => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('success logout');
      })
      .catch(function (error) {
        console.log('somethink went wrong!');
      });
  };

  return { loginWithGoogle, isUserLogin, logout, loginWithAnonymuss };
};

export default useAuthentication;
