import { useState, useRef, RefObject } from 'react';
import Peer from 'simple-peer';

import useAuthentication from 'authentication/authenticationHooks';
import { socket } from './useStartHooks';

const useVoiceChatHooks = () => {
  const { userName, userId } = useAuthentication();

  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const videoIncommingRef: RefObject<HTMLVideoElement> = useRef(null);

  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [number, setNumber] = useState(1);

  const createPeer = ({ stream, roomId }: { stream: any; roomId: string }) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: any) => {
      socket.emit('sending signal', { roomId, signal });
    });

    return peer;
  };

  const addPeer = ({
    signalFrom,
    roomId,
    stream,
  }: {
    signalFrom: any;
    roomId: string;
    stream: any;
  }) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('returning signal', { roomId, signal });
    });

    peer.signal(signalFrom);

    return peer;
  };

  const joinToVoiceChatRoom = (roomId: string) => {
    setIsVideoChatOpen(true);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      console.log('FIRST STREAM');
      console.log(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      socket.emit('joinVoiceChat', { roomId, name: userName }, (response: any) => {
        console.log(response);
        const peer = createPeer({ roomId, stream });

        // console.log(signal);
        console.log('joinVoiceChat');
        peer.on('stream', stream2 => {
          console.log('STREAMMMM!');
          if (videoIncommingRef.current) {
            console.log('STREAMMMM2222222');
            videoIncommingRef.current.srcObject = stream2;
            setNumber(3);
          }
        });
      });

      socket.on('user join', ({ signal }: { signal: any }) => {
        const peer = addPeer({ signalFrom: signal, roomId, stream });
        console.log(signal);
        console.log('user join');
        console.log(peer);

        peer.on('stream', stream2 => {
          console.log('STREAMMMM!');
          if (videoIncommingRef.current) {
            console.log('STREAM222222');
            console.log(stream2);
            videoIncommingRef.current.srcObject = stream2;
            setNumber(2);
            console.log(videoIncommingRef.current);
          }
        });
      });

      socket.on('receiving returned signal', (signal: { signal: any }) => {
        console.log('receiving returned signal');
        console.log(signal);
      });
    });
  };

  return {
    joinToVoiceChatRoom,
    isVideoChatOpen,
    videoRef,
    videoIncommingRef,
    number,
  };
};

export default useVoiceChatHooks;
