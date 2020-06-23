import styled from 'styled-components';

export const Background = styled.section`
  background: ${({ theme }) => theme.colors.backgorund};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Text = styled.p`
  font-size: 30px;
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-weight: 600;
  margin: 0 0 100px;
`;

export const AcceptButton = styled.button`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.blue};
  color: white;
  font-size: 20px;
  margin-top: 54px;
  width: 147px;
  height: 48px;
  border: none;

  cursor: pointer;
`;
