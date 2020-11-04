import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Wrapper = styled.nav`
  background: ${({ theme }) => theme.colors.lightBackground};
  width: 100%;
  height: 100vh;
`;

export const SectionName = styled.h2`
  font-family: ${({theme}) => theme.fonts.ropa};
  font-size: 14px;
  margin: 0;
`;

export const NewRoomButton = styled(Link)`
  font-family: ${({theme}) => theme.fonts.ropa};
  width: 108px;
  height: 31px;
  background-color: ${({ theme }) => theme.colors.messagesViewBlue};
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PositionWrapper = styled.div`
  padding: 36px 40px 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const PossitionTopBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const RoomsListWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  margin-top: 35px;
  text-decoration: none;
  color: black;
`;

export const RoomListName = styled.h4`
  font-family: ${({theme}) => theme.fonts.ropa};
  font-size: 18px;
  margin: 0;
`;

export const RoomListTime = styled.p`
  font-family: ${({theme}) => theme.fonts.ropa};
  font-size: 13px;
  margin: 0;
  justify-self: end;
  align-self: start;
`;

export const RoomListLastMessage = styled.p`
  font-family: ${({theme}) => theme.fonts.ropa};
  font-size: 13px;
  margin: 0;
  color: #898989;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 3px;
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
`;