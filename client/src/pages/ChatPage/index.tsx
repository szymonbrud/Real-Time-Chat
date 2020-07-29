import React from 'react';
import { SendRounded } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

import useAuthentication from 'authentication/authenticationHooks';
import useSocketConnect from './socketHooks';
import indexHooks from './indexHooks';

import {
  MainWrapper,
  MessageSenderInput,
  MessagesMainWrapper,
  MessagesWrapper,
  SendButton,
  SenderWrapper,
  Message,
} from './styles';
import { RoomButton, NewButton, LeftBar, FlexDiv } from './newStyles';

const ChatPage = () => {
  const { createNewRoom, joinToRoom, rooms, messages, currentRoom, setMessages } = indexHooks();
  const { textInputRef, triggerSend, sendMessage } = useSocketConnect(setMessages);
  const { logout, userId } = useAuthentication();

  return (
    <>
      <FlexDiv>
        <LeftBar>
          <NewButton onClick={createNewRoom}>Create a new room</NewButton>
          {rooms.length === 0 ? (
            <h1>ładowanie pokoi</h1>
          ) : (
            rooms.map(e => (
              <RoomButton onClick={() => joinToRoom(e._id, e.roomName)}>{e.roomName}</RoomButton>
            ))
          )}
        </LeftBar>
        <MainWrapper>
          {currentRoom && (
            <MessagesMainWrapper>
              <h1>{currentRoom?.roomName}</h1>
              {/* <MessagesWrapper ref={messageWrapperRef}> */}
              <MessagesWrapper>
                {messages.map(({ senderName, content, _id }, index) => {
                  return (
                    <Message isRight={true} username={senderName} key={_id}>
                      {content}
                    </Message>
                  );
                })}
              </MessagesWrapper>
              <SenderWrapper>
                <MessageSenderInput
                  placeholder="napisz coś..."
                  ref={textInputRef}
                  onKeyUp={e => triggerSend(e)}
                />
                {/* <SendButton onClick={sendMessage}> */}
                <SendButton onClick={sendMessage}>
                  <SendRounded style={{ fontSize: 24, color: grey[50], marginLeft: 1 }} />
                </SendButton>
              </SenderWrapper>
            </MessagesMainWrapper>
          )}
          {/* <OnlineUsersfrom onlineUsers={onlineUsers} /> */}
          {/* <LeaveButton diconnect={diconnect} /> */}
        </MainWrapper>
        <h1>hello I am chat page</h1>
        <button onClick={logout} style={{ height: '30px' }}>
          logout
        </button>
      </FlexDiv>
    </>
  );
};

export default ChatPage;

// if (isRedirect) {
//   return <Redirect to="/" />;
// }

// return (
//   <MainWrapper>
//     <MessagesMainWrapper>
//       <MessagesWrapper ref={messageWrapperRef}>
//         {messages.map(({ isReceived, sender, text }, index) => {
//           return (
//             <Message isRight={isReceived} username={sender} key={text}>
//               {text}
//             </Message>
//           );
//         })}
//       </MessagesWrapper>
//       <SenderWrapper>
//         <MessageSenderInput
//           placeholder="napisz coś..."
//           ref={textInputRef}
//           onKeyUp={e => triggerSend(e)}
//         />
//         <SendButton onClick={sendMessage}>
//           <SendRounded style={{ fontSize: 24, color: grey[50], marginLeft: 1 }} />
//         </SendButton>
//       </SenderWrapper>
//     </MessagesMainWrapper>
//     <OnlineUsersfrom onlineUsers={onlineUsers} />
//     <LeaveButton diconnect={diconnect} />
//   </MainWrapper>
// );
