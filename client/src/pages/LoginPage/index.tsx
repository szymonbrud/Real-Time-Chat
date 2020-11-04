import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuthentication from 'authentication/useAuthenticationHooks';

import { Background, HeaderText, LoginButton, Icon, BottomText, AuthText, ErrorText } from './styles';

import anonymusIcon from 'assets/icons/anonymus.svg';
import googleIcon from 'assets/icons/google.svg';

enum authenicationProgress {
  loading = 'loading',
  confirmed = 'confirmed',
  unconfirmed = 'unconfirmed',
  error = 'error',
}

const LoginPage = () => {
  const { loginWithGoogle, loginWithAnonymuss, isUserLogin } = useAuthentication();

  if (isUserLogin === authenicationProgress.confirmed) {
    return <Redirect to="/messagesChat" />;
  }

  if (isUserLogin === authenicationProgress.loading) {
    return (
      <Background>
        <AuthText>autoryzacja...</AuthText>
      </Background>
    )
  }

  return (
    <Background>
      <HeaderText>Zaloguj się do Real Time chat</HeaderText>
      <LoginButton onClick={loginWithGoogle} type="button"><Icon src={googleIcon} />google</LoginButton>
      <LoginButton onClick={loginWithAnonymuss} type="button"><Icon src={anonymusIcon} />anonimowy</LoginButton>
      {
        isUserLogin === authenicationProgress.error && <ErrorText>Błąd podczas logowania, spróbuj ponownie</ErrorText>
      }
      <BottomText>Pamiętaj że logując się jako anonimowy twoje dane zostaną utracone po zamknięciu karty.</BottomText>
    </Background>
  );
};

export default LoginPage;
