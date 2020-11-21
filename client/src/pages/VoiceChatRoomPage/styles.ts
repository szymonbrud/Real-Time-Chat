import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

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

export const InvadeWrapper = styled.div`
  position: absolute;
  top: 38px;
  left: 38px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #55BD9D;
  border-radius: 100px;
`;

export const InvadeIcon = styled.img`
  width: 20px;
  margin-left: 2px;
`;

export const DisconnectWrapper = styled(Link)`
  background: #E7163C;
  width: 65px;
  height: 65px;
  position: fixed;
  bottom: 33px;
  left: 50%;
  border-radius: 100px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

export const DisconnectIcon = styled.img`
  width: 20px;
  transform: rotate(135deg);
`;

export const CammeraSwitchButton = styled.button`
  position: fixed;
  right: 70%;
  bottom: 33px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #272F26;
  border-radius: 100px;
  border: 0;

  :focus{
    outline: 0;
  }

  ${({ isActive } : {isActive?: boolean}) => isActive && css`
    background: #55BD9D;
  `}
`;


export const MicrophoneSwitchbutton = styled.button`
  position: fixed;
  left: 70%;
  bottom: 33px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #272F26;
  border-radius: 100px;
  border: 0;

  :focus{
    outline: 0;
  }

  ${({ isActive } : {isActive?: boolean}) => isActive && css`
    background: #55BD9D;
  `}
`;


export const CameraIcon = styled.img`
  width: 20px;
  margin: 5px 0 0 0;
`;


export const MicrophoneIcon = styled.img`
  width: 20px;
`;
