import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 35px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Text = styled.p`
  font-size: 20px;
  font-family: ${({theme}) => theme.fonts.ropa};
  font-weight: 500;
  margin:  0 0 17px 0;
`;

export const RoomNameWrapper = styled.div`
  background: #F5F6FA;
  width: 200px;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 17px;
  margin: 0 0 60px 0;
  border-radius: 6px;
  font-size: 17px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  font-weight: 500;
`;

export const BackButton = styled(Link)`
  height: 45px;
  font-size: 17px;
  border: 2px solid black;
  width: 80px;
  border-radius: 6px;
  font-family: ${({theme}) => theme.fonts.ropa};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
`;

export const JoinButton = styled.button`
  border-radius: 6px;
  width: 110px;
  height: 45px;
  background: ${({ isMessage } : {isMessage: boolean}) => isMessage ? '#527BF3' : '#23B287'};
  color: white;
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.ropa};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  margin-left: 12px;
`;

export const MainButtonWrapper = styled.div`
  display: flex;
`;