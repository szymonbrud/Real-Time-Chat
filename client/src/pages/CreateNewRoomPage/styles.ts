import styled, { css } from 'styled-components';

export const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #EEEEF2;
  padding: 0 0 0 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const RoomTypeNameTopText = styled.h3`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-weight: 500;
  margin: 0 0 116px 0;
`;

export const Text = styled.p`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-weight: 500;
  margin: 0 0 18px 0;
`;

export const Input = styled.input`
  width: 200px;
  background: white;
  border-radius: 7px;
  border: 0;
  height: 48px;
  padding: 0 0 0 17px;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-weight: 500;

  ::placeholder{
    color: #BABABA;
  }

  :focus{
    outline: 0;
    box-shadow: 0 0 0 2px #8D9CF4;
  }
`;

export const CreateButton = styled.button`
  width: 100px;
  height: 45px;
  border-radius: 7px;
  background: #BBBBC2;
  border: 0;
  margin-top: 58px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-weight: 500;
  color: white;

  ${({ isMessage, isActive }: { isMessage?: boolean, isActive?: boolean }) => isActive && css`
    background: ${isMessage ? '#8D9CF4' : '#23B287'};
  `}

  :focus{
    outline: 0;
    box-shadow: 0 0 0 2px #8D9CF4;
  }
`;

export const BackArrowWrapper = styled.div`
  width: 45px;
  height: 45px;
  background: ${({isMessage} : { isMessage?: boolean }) => isMessage ? '#8D9CF4' : '#23B287'};
  position: absolute;
  top: 38px;
  left: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

export const ArrowIcon = styled.img`
  width: 30px;
`;
