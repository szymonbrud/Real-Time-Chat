import { useState, useRef, RefObject, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

import useAuthentication from 'authentication/useAuthenticationHooks';

import getUrl from 'helpers/getUrl';

const URL = getUrl();
let socket : any;

const useVoiceChatHooks = (roomId: string) => {
  const { userName, userId } = useAuthentication();

  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const videoIncommingRef: RefObject<HTMLVideoElement> = useRef(null);

  const videos: RefObject<HTMLDivElement> = useRef(null);

  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [number, setNumber] = useState(1);

  const [peers, setPeers]: any = useState({});

  const joinToVoiceChatRoom = () => {
    setIsVideoChatOpen(true);

    // navigator.mediaDevices.

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      socket.emit('joinVoiceChat', { roomId, name: userName }, (response: any) => {
        //
      });

      socket.on('initReceive', (socket_id : any) => {
        console.log('INIT RECEIVE ' + socket_id);
        addPeer(socket_id, false);

        socket.emit('initSend', socket_id);
      });

      socket.on('initSend', (socket_id : any) => {
        console.log('INIT SEND ' + socket_id);
        addPeer(socket_id, true);
      });

      // socket.on('removePeer', socket_id => {
      //   console.log('removing peer ' + socket_id);
      //   removePeer(socket_id);
      // });

      // socket.on('disconnect', () => {
      //   console.log('GOT DISCONNECTED');
      //   for (let socket_id in peers) {
      //     removePeer(socket_id);
      //   }
      // });

      socket.on('signal', (data: any) => {
        peers[data.socket_id].signal(data.signal);
      });

      function addPeer(socket_id : any, am_initiator: any) {
        peers[socket_id] = new SimplePeer({
          initiator: am_initiator,
          stream: stream,
        });

        console.log('1');
        peers[socket_id].on('signal', (data: any) => {
          console.log('2');
          socket.emit('signal', {
            signal: data,
            socket_id: socket_id,
          });
        });

        peers[socket_id].on('stream', (stream : any) => {
          let newVid = document.createElement('video');
          newVid.srcObject = stream;
          newVid.id = socket_id;
          newVid.style.width = '70%';
          newVid.style.borderRadius = '10px';
          // newVid.playsinline = false
          newVid.autoplay = true;
          newVid.className = 'vid';

          let Text = document.createElement('h3');
          Text.style.color = 'white';
          Text.style.fontSize = '18px';
          Text.innerHTML = 'Nazwa kontaktu'
          // newVid.onclick = () => openPictureMode(newVid)
          // newVid.ontouchstart = (e) => openPictureMode(newVid)
          if (videos.current) {
            videos.current.appendChild(newVid);
            videos.current.appendChild(Text)
          }
        });
      }
    }).catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    socket = io(URL);
    joinToVoiceChatRoom();
  }, [])

  return {
    joinToVoiceChatRoom,
    isVideoChatOpen,
    videoRef,
    videoIncommingRef,
    number,
    videos,
  };
};

export default useVoiceChatHooks;
