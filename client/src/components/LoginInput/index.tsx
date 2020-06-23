import React, { RefObject } from 'react';

import { Input, ErrorText } from './styles';

type LoginInputProps = {
  refProps: RefObject<HTMLInputElement>;
  isError?: boolean;
  placeholder?: string;
};

const LoginInput = ({ refProps, isError = false, placeholder }: LoginInputProps) => (
  <>
    <Input ref={refProps} placeholder={placeholder} isError={isError} />
    {isError && <ErrorText>Błąd!</ErrorText>}
  </>
);

export default LoginInput;
