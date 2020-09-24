import React from 'react';
import { SendRounded } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

import useAuthentication from 'authentication/authenticationHooks';
import useSocketConnect from './socketHooks';
import indexHooks from './indexHooks';
import useStartHooks from './useStartHooks';

import {
  MainWrapper,
  MessageSenderInput,
  MessagesMainWrapper,
  MessagesWrapper,
  SendButton,
  SenderWrapper,
  Message,
} from './styles';
import {
  RoomButton,
  NewButton,
  LeftBar,
  FlexDiv,
  InvateResponseWrapper,
  CopyButton,
  TextToCopy,
  CreateANewRoom,
} from './newStyles';

const ChatPage = () => {
  const {
    acceptNewRoomName,
    showNewRoom,
    joinToRoom,
    rooms,
    messages,
    currentRoom,
    setMessages,
    invadeToRoom,
    invadeLink,
    setInvadeLink,
    messageWrapperRef,
    isVisibleCreateNewRoom,
    createNewRoomInputRef,
    deleteRoom,
    changeRoomName,
    isVisibleChangeRoomName,
    switchVisibleChangeRoomName,
    changeRoomNameInputRef,
    backToDefaultView,
    imageData,
  } = indexHooks();
  const { textInputRef, triggerSend, sendMessage } = useSocketConnect(setMessages);
  const { logout, userId } = useAuthentication();
  useStartHooks(setMessages);

  console.log(rooms);

  return (
    <>
      <CreateANewRoom visible={isVisibleCreateNewRoom}>
        <p>Nazwa twojego nowego pokoju</p>
        <input ref={createNewRoomInputRef}></input>
        <button data-testid="acceptButton" onClick={acceptNewRoomName}>
          Potwierdź
        </button>
      </CreateANewRoom>
      <FlexDiv>
        <LeftBar>
          <NewButton onClick={showNewRoom}>Create a new room</NewButton>
          {rooms && rooms.length > 0 ? (
            rooms.map(e => (
              <RoomButton
                className="room"
                data-testid="roomButton"
                onClick={() => joinToRoom(e.roomId, e.roomName)}
              >
                {e.roomName}
              </RoomButton>
            ))
          ) : (
            <h1>ładowanie pokoi</h1>
          )}
        </LeftBar>
        {invadeLink && (
          <InvateResponseWrapper>
            <TextToCopy data-testid="textToCopy" className="he">
              {invadeLink}
            </TextToCopy>
            <img src={`data:image/png;base64, ${imageData}`} />
            <CopyButton
              onClick={() => {
                navigator.clipboard.writeText(invadeLink);
                console.log('skopiowano ? ');
              }}
            >
              copy
            </CopyButton>
            <button onClick={() => setInvadeLink('')}>wyjście</button>
          </InvateResponseWrapper>
        )}
        {isVisibleChangeRoomName && (
          <InvateResponseWrapper>
            <p>Change room to</p>
            <input type="text" ref={changeRoomNameInputRef} />
            <button onClick={changeRoomName}>Change</button>
            <button onClick={switchVisibleChangeRoomName}>exit</button>
          </InvateResponseWrapper>
        )}
        <MainWrapper>
          {currentRoom && (
            <MessagesMainWrapper>
              <button onClick={backToDefaultView}>back</button>
              <button onClick={invadeToRoom}>Invate to room</button>
              <button onClick={deleteRoom}>Delete room</button>
              <button onClick={switchVisibleChangeRoomName}>Change room name</button>
              <h1>{currentRoom?.roomName}</h1>
              {/* <MessagesWrapper ref={messageWrapperRef}> */}
              <MessagesWrapper data-testid="messageWrapper" ref={messageWrapperRef}>
                {messages.map(({ senderName, content, _id, isSendByMe }, index) => {
                  return (
                    <Message isRight={isSendByMe} username={senderName} key={_id}>
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
