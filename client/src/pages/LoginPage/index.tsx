import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';

import LoginInput from 'components/LoginInput';
import useInitialFirebase from 'authentication/initalFirebase';

import useAuthentication from './hooks';
import { Background, Text, AcceptButton } from './styles';

const LoginPage = () => {
  useInitialFirebase();

  const { loginWithGoogle, isUserLogin, loginWithAnonymuss, logout } = useAuthentication();

  return (
    <Background>
      <Text>Stwórz nowy pokój lub dołącz</Text>
      <button onClick={loginWithGoogle}>login with google</button>
      <button onClick={loginWithAnonymuss}>login with anonymuss</button>
      <p>{isUserLogin}</p>
      <button onClick={logout}>Logout</button>
    </Background>
  );
};

export default LoginPage;
