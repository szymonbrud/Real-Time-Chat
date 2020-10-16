import styled from 'styled-components';

export const Background = styled.section`
  background: ${({ theme }) => theme.colors.lightBackground};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const HeaderText = styled.p`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-weight: 400;
  margin: auto 0 55px 44px;
  width: 160px;
`;

export const LoginButton = styled.button`
  border-radius: 7px;
  background: white;
  color: #636060;
  width: 194px;
  height: 45px;
  display: flex;
  align-items: center;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-size: 18px;
  margin: 19px 0 0 44px;
`;

export const Icon = styled.img`
  width: 18px;
  margin: 0 19px 0 20px;
`;

export const BottomText = styled.p`
  margin: auto 33px 33px 44px;
  font-size: 14px;
  color: #636060;
  font-family: ${({ theme }) => theme.fonts.ropa};
`;

export const AuthText = styled.p`
  color: black;
  width: 100%;
  text-align: center;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  margin: 11px 0 0 44px;
  font-family: ${({ theme }) => theme.fonts.ropa};
`;