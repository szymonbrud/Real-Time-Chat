import styled from 'styled-components';

export const MainWrapper = styled.div`
  background: #23B287;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MyVideo = styled.video`
  width: 200px;
  position: absolute;
  top: 38px;
  right: 38px;
  border-radius: 10px;
  background-color: red;
`;

export const IncommingVideo = styled.video`
  width: 80%;
  height: auto;
`;