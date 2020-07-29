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
