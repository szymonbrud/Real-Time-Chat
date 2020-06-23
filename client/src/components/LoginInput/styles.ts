import styled, { css } from 'styled-components';

export const Input = styled.input`
  border-radius: 5px;
  border: ${({ theme }) => theme.colors.blue} 2px solid;
  font-size: 20px;
  padding: 0 16px;
  width: 235px;
  height: 49px;
  margin-top: 27px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.inputPlaceholder};
  }

  ${({ isError }: { isError: boolean }) =>
    isError &&
    css`
      border: red 2px solid;
    `}
`;

export const ErrorText = styled.p`
  margin: 5px 0 0 0;
  width: 235px;
  color: red;
`;
