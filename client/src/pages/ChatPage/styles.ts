import styled, { css, keyframes } from 'styled-components';

const anim = keyframes`
  from {
    transform: translateX(100%);
  }

  to{
    transform: translateX(0);
  }
`;

const anim2 = keyframes`
  from {
    transform: translateX(-100%);
  }

  to{
    transform: translateX(0);
  }
`;

export const MainWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessagesMainWrapper = styled.div``;

export const MessagesWrapper = styled.div`
  width: 445px;
  height: 431px;
  background: white;
  border-radius: 6px;
  margin-bottom: 31px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SenderWrapper = styled.div`
  display: flex;
`;

export const MessageSenderInput = styled.input`
  width: 370px;
  height: 49px;
  border-radius: 5px;
  border: ${({ theme }) => theme.colors.blue} 2px solid;
  font-size: 20px;
  padding: 0 16px;
  background: white;

  ::placeholder {
    color: ${({ theme }) => theme.colors.inputPlaceholder};
  }
`;

export const SendButton = styled.button`
  margin-left: 26px;
  width: 49px;
  height: 49px;
  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const Message = styled.div`
  min-width: 50px;
  position: relative;
  margin: 40px 16px 0;
  display: flex;
  align-items: center;
  font-size: 15px;

  ::before {
    position: absolute;
    top: -1px;
    transform: translateY(-100%);
    color: rgba(0, 0, 0, 0.7);
    font-size: 13px;
  }

  ${({ isRight, username }: { isRight?: boolean; username: string }) =>
    !isRight
      ? css`
          animation: ${anim} 0.2s linear;
          animation-timing-function: cubic-bezier(0.9, 0.23, 0.11, 1.84);
          align-self: flex-end;
          background: ${({ theme }) => theme.colors.background};
          border-radius: 5px 5px 0 5px;

          padding: 8px 10px 8px 15px;

          ::before {
            content: "${username}";
            right: 0;
          }
        `
      : css`
          animation: ${anim2} 0.2s linear;
          animation-timing-function: cubic-bezier(0.9, 0.23, 0.11, 1.84);
          align-self: flex-start;
          background: ${({ theme }) => theme.colors.blue};
          border-radius: 5px 5px 5px 0;
          padding: 8px 15px 8px 10px;
          color: white;

          ::before {
            content: "${username}";
            left: 0;
          }
        `};
`;
