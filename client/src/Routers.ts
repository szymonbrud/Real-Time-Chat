import MessagesChatPage from 'pages/MessagesChatPage';
import VoiceChatPage from 'pages/VoiceChatPage';
import MorePage from 'pages/MorePage';

import { ReactComponent as Phone } from 'assets/icons/phone.svg';
import { ReactComponent as More } from 'assets/icons/circles.svg';
import { ReactComponent as Chat} from 'assets/icons/chats.svg';

export default [
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