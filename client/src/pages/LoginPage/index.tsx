import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';

import LoginInput from 'components/LoginInput';

import useValidationInputs from './hooks';
import { Background, Text, AcceptButton } from './styles';

const LoginPage = () => {
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputRoom = useRef<HTMLInputElement>(null);

  const { isErrorUsername, isErrorRoom, isPassed, validationInputs } = useValidationInputs(
    inputUsername,
    inputRoom,
  );

  if (isPassed) {
    return <Redirect to="/room" />;
  }

  return (
    <Background>
      <Text>Stwórz nowy pokój lub dołącz</Text>
      <LoginInput refProps={inputUsername} placeholder="nazwa" isError={isErrorUsername} />
      <LoginInput refProps={inputRoom} placeholder="pokój" isError={isErrorRoom} />
      <AcceptButton onClick={validationInputs}>gotowe</AcceptButton>
    </Background>
  );
};

export default LoginPage;
