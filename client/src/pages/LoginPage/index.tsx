import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';

import useAuthentication from 'authentication/authenticationHooks';
import { Background, Text, AcceptButton } from './styles';

enum authenicationProgress {
  loading = 'loading',
  confirmed = 'confirmed',
  unconfirmed = 'unconfirmed',
  error = 'error',
}

const LoginPage = () => {
  const { loginWithGoogle, isUserLogin, loginWithAnonymuss } = useAuthentication();

  if (isUserLogin === authenicationProgress.confirmed) {
    return <Redirect to="/room" />;
  }

  return (
    <Background>
      <Text>Stwórz nowy pokój lub dołącz</Text>
      <button onClick={loginWithGoogle}>login with google</button>
      <button onClick={loginWithAnonymuss}>login with anonymuss</button>
    </Background>
  );
};

export default LoginPage;
