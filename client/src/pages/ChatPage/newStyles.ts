import styled, { css } from 'styled-components';

export const NewButton = styled.button`
  border: none;
  background: #038c65;
  color: white;

  width: 200px;
  height: 60px;
`;

export const RoomButton = styled.button`
  border: 1px solid black;
  background: white;
  color: black;

  width: 200px;
  height: 60px;

  ${({ isActive }: { isActive?: boolean }) =>
    isActive &&
    css`
      background: blue;
    `}
`;

export const LeftBar = styled.div`
  display: flex;
  height: 100vh;
  width: 200px;
  flex-direction: column;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const InvateResponseWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50vh;
  width: 500px;
  height: 300px;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid black;
`;

export const TextToCopy = styled.p`
  text-align: center;
`;

export const CopyButton = styled.div`
  border-radius: 8px;
  border: 3px solid black;
  background: white;
  color: black;
  width: 90px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
`;

export const CreateANewRoom = styled.div`
  position: fixed;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 350px;
  background: white;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ visible }: { visible?: boolean }) =>
    visible &&
    css`
      display: flex;
    `}
`;
