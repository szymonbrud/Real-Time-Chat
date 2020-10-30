import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';


export const MainWrapper = styled.div`
  background-color: #527BF3;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  border-radius: 35px 35px 0 0;
  background: white;
  height: 100vh;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 30px 0 80px 0;
  overflow: auto;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 19px;
  margin-top: 20px;
`;

export const BackArrowWrapper = styled(Link)`
  width: 45px;
  height: 45px;
  background-color: #2D5BE2;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackArrow = styled.img`
  width: 28px;
`;

export const RoomName = styled.p`
  font-size: 18px;
  color: white;
  margin: 0 0 0 15px;
  font-family: ${({ theme }) => theme.fonts.ropa};
`;

export const Message = styled.div`
  padding: 18px 15px;
  font-family: ${({ theme }) => theme.fonts.rope};
  max-width: 65%;
  margin: 16px;
  position: relative;

  ::before{
    position: absolute;
    bottom: 100%;
    font-size: 12px;
    color: #cad4e3;
  }


  ${({ isMy, senderName }: { isMy?: boolean, senderName?: string }) => isMy ?
    css`
      background: #527BF3;
      color: white;
      border-radius: 14px 0 14px 14px;
      align-self: flex-end;

      ::before{
        content: '${senderName}';
        right: 0;
      }
    `
    :
    css`
      background: #F5F6FA;
      color: black;
      border-radius: 0px 14px 14px 14px;
      align-self: flex-start;

      ::before{
        content:' ${senderName}';
        left: 0;
      }
    `
  }

  
`;

export const WrapperWriteMessageBottomBar = styled.div`
  display: flex;
  width: calc(100% - 32px);
  margin: 0 16px;
  height: 45px;
  background: #F5F6FA;
  border-radius: 71px;
  position: fixed;
  bottom: 23px;
  left: 0;
  right: 0;

  ${({ isFocused }: { isFocused?: boolean }) => isFocused && css`
    box-shadow: 0 0 0 2px #B3B3BB;
  `};

`;

export const MessageWriteInput = styled.input`
  width: 70%;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  border: 0;
  margin-left: 20px;
  background: #F5F6FA;

  :active{
    outline: none;
  }

  :focus{
    outline: none;
  }
`;

export const SendButton = styled.button`
  border: 0;
  margin: 0 10px 0 auto;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;

  :focus{
    outline: 0;
  }
`;

export const SendIcon = styled.img`
  width: 25px;
`;