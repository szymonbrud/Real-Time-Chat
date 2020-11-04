import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import useInitialFirebase from 'authentication/initalFirebase';

enum authenicationProgress {
  loading = 'loading',
  confirmed = 'confirmed',
  unconfirmed = 'unconfirmed',
  error = 'error',
}

const useAuthentication = () => {
  useInitialFirebase();

  const provider = new firebase.auth.GoogleAuthProvider();
  const [isUserLogin, setIsUserLogin] = useState(authenicationProgress.loading);

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userData: any) => {
      if (userData) {
        setIsUserLogin(authenicationProgress.confirmed);
        setUserName(userData.displayName);
        setUserId(userData.uid);
      } else {
        setIsUserLogin(authenicationProgress.unconfirmed);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => {
    setIsUserLogin(authenicationProgress.loading);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then()
      .catch(error => {
        setIsUserLogin(authenicationProgress.error);
        console.error(error);
      });
  };

  const loginWithAnonymuss = () => {
    setIsUserLogin(authenicationProgress.loading);
    firebase
      .auth()
      .signInAnonymously()
      .then()
      .catch(error => {
        setIsUserLogin(authenicationProgress.unconfirmed);
        console.error(error);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then()
      .catch(error => {
        console.error(error);
      });
  };

  const userTokenId = (callback: Function) => {
    firebase
      .auth()
      .currentUser?.getIdToken(true)
      .then(idToken => {
        callback(idToken);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    loginWithGoogle,
    isUserLogin,
    logout,
    loginWithAnonymuss,
    userTokenId,
    userName,
    userId,
  };
};

export default useAuthentication;
