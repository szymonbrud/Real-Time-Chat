import MessagesChatPage from 'pages/MessagesChatPage';
import VoiceChatPage from 'pages/VoiceChatPage';
import MorePage from 'pages/MorePage';
import LoginPage from 'pages/LoginPage';
import RoomPage from 'pages/RoomPage';
import JoinPage from 'pages/JoinPage';
import CreateNewRoomPage from 'pages/CreateNewRoomPage';

import { ReactComponent as Phone } from 'assets/icons/phone.svg';
import { ReactComponent as More } from 'assets/icons/circles.svg';
import { ReactComponent as Chat } from 'assets/icons/chats.svg';


export const bottomMenuRouters = [
  {
    path: '/messagesChat',
    Component: MessagesChatPage,
    exact: false,
    isPrivate: true,
    Icon: Chat, 
    name: 'chat',
    color: '#8D9CF4',
  },
  {
    path: '/voiceChat',
    Component: VoiceChatPage,
    exact: false,
    isPrivate: true,
    Icon: Phone, 
    name: 'call',
    color: '#23B287'
  },
  {
    path: '/more',
    Component: MorePage,
    exact: false,
    isPrivate: true,
    Icon: More, 
    name: 'more',
    color: '#8D9CF4'
  }
]

export const mainRouters = [
  {
    path: '/',
    Component: LoginPage,
    exact: true,
    isPrivate: false,
  },
  {
    path: '/room/:id/:roomName',
    Component: RoomPage,
    exact: false,
    isPrivate: true,
  },
  {
    path: '/join/:key/:roomName',
    Component: JoinPage,
    exact: false,
    isPrivate: true,
  },
  {
    path: '/newRoom/:type/:roomId?/:lastRoomName?',
    Component: CreateNewRoomPage,
    exact: false,
    isPrivate: true,
  },
]