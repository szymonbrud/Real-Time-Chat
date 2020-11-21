import { useState, useRef, RefObject, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

import useAuthentication from 'authentication/useAuthenticationHooks';

import getUrl from 'helpers/getUrl';
import { setMaxListeners } from 'process';
import { any } from 'cypress/types/bluebird';

const URL = getUrl();
let socket: any;

let stream: any;

let oneTime = false;

const userNames = []

const useVoiceChatHooks = (roomId: string) => {
  const { userName, userId } = useAuthentication();

  const videoRef: any = useRef(null);
  const videoIncommingRef: RefObject<HTMLVideoElement> = useRef(null);

  const videos: RefObject<HTMLDivElement> = useRef(null);

  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [number, setNumber] = useState(1);
  const [isInvadeViewOpen, setIsInvadeViewOpen] = useState(false);

  const [isCammeraRecord, setIsCammeraRecord] = useState(false);
  const [isMicrophoneRecord, setIsMicrophoneRecord] = useState(false);

  const [peers, setPeers]: any = useState({});

  const gettingMedia = async (options: { video: boolean, audio: boolean }) => {
    try {
      stream = await navigator.mediaDevices.getUserMedia(options);

      videoRef.current.srcObject = stream;

      setIsCammeraRecord(options.video)
      setIsMicrophoneRecord(options.audio);

      console.log(stream.getTracks())
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectMedia = () => {
    stream.getTracks().forEach(function (track: any) {
      track.stop();
    });

    socket.emit('disconnectVoice');
  }

  const micOrCamSwitch = (type: 'video' | 'audio') => {
    if (type === "audio") {
      if (isMicrophoneRecord) {
        stream.getAudioTracks()[0].enabled = false;
        setIsMicrophoneRecord(false);
      } else {
        stream.getAudioTracks()[0].enabled = true;
        setIsMicrophoneRecord(true);
        
      }
    } else {
      if (isCammeraRecord) {
        stream.getVideoTracks()[0].enabled = false
        setIsCammeraRecord(false);
      } else {
        stream.getVideoTracks()[0].enabled = true
        setIsCammeraRecord(true);
        
      }
    }
  }

  const connectToOnline = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    socket.emit('joinVoiceChat', { roomId, name: userName || 'anonymuss', userId }, (response: any) => {
      if (!response.success) {
        alert('Nie masz uprawnień aby dołaczyć do tego kanału!');
        window.location.href = '/';
      }
    });

    socket.on('initReceive', ({ socket_id, name }: any) => {
      console.log('INIT RECEIVE ' + socket_id);
      console.log("HERE IS WORKING:")
      console.log(socket_id, name)
      userNames.push({ socket_id, name });
      addPeer(socket_id, false, name);

      
      socket.emit('initSend', {socket_id, name: userName || 'anonymuss'});
    });

    socket.on('initSend', ({socket_id, userName} : any) => {
      // TODO: here
      console.log('INIT SEND ' + socket_id);
      console.log(userName)
      addPeer(socket_id, true, userName);
    });

    socket.on('removePeer', (socket_id: any) => {
      const vid = document.getElementById(socket_id);
      const text = document.getElementById(`text${socket_id}`);

      vid?.remove();
      text?.remove();
    });

    // socket.on('disconnect', () => {
    //   console.log('GOT DISCONNECTED');
    //   for (let socket_id in peers) {
    //     removePeer(socket_id);
    //   }
    // });

    socket.on('signal', (data: any) => {
      peers[data.socket_id].signal(data.signal);
      console.log(data)
    });

    function addPeer(socket_id: any, am_initiator: any, userName?: any) {
      peers[socket_id] = new SimplePeer({
        initiator: am_initiator,
        stream: stream
      });

      console.log('1');
      peers[socket_id].on('signal', (data: any) => {
        console.log('2');
        console.log(data)
        socket.emit('signal', {
          signal: data,
          socket_id: socket_id,
          name: data.userName
        });
      });

      peers[socket_id].on('stream', (stream: any) => {
        console.log(`id: ${socket_id}, userName: ${userName}`)
        let newVid = document.createElement('video');
        newVid.srcObject = stream;
        newVid.id = socket_id;
        newVid.style.width = '70%';
        newVid.style.borderRadius = '10px';
        // newVid.playsinline = false
        newVid.autoplay = true;
        newVid.className = 'vid';

        let Text = document.createElement('h3');
        Text.id = `text${socket_id}`;
        Text.style.color = 'white';
        Text.style.fontSize = '18px';
        Text.innerHTML = userName;
        // newVid.onclick = () => openPictureMode(newVid)
        // newVid.ontouchstart = (e) => openPictureMode(newVid)
        if (videos.current) {
          videos.current.appendChild(newVid);
          videos.current.appendChild(Text);
        }
      });
    }
  }

  const joinToVoiceChatRoom = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {

      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userId) {
      socket = io(URL);
      // joinToVoiceChatRoom();
      if (!stream) {
        gettingMedia({ video: true, audio: true });
      }
      if (stream) {
        if (!oneTime) {
          oneTime = true;
          connectToOnline();
          
        }
      }
    }
  }, [userId, stream]);

  return {
    joinToVoiceChatRoom,
    isVideoChatOpen,
    videoRef,
    videoIncommingRef,
    number,
    videos,
    setIsInvadeViewOpen,
    isInvadeViewOpen,
    isCammeraRecord,
    setIsCammeraRecord,
    disconnectMedia,
    micOrCamSwitch,
    isMicrophoneRecord
  };
};

export default useVoiceChatHooks;
