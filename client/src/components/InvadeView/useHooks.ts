import { useEffect, useRef, useState } from 'react';
import gsap, { Back } from 'gsap';

import useAuthentication from 'authentication/authenticationHooks';

let URL: string;

if (window.location.hostname === 'localhost') {
  URL = 'http://localhost:5000/';
} else {
  URL = 'https://real-time-chat-backend.herokuapp.com/';
}

const useHooks = ({ roomName, roomId }: { roomName: string, roomId: string }) => {
  
  const { userTokenId } = useAuthentication();

  const copyButtonRef = useRef<any>(null);

  const [image, setImage] = useState(null);
  const [invadeLink, setInvadeLink] = useState('');

  const animationCopyButton = () => {
    navigator.clipboard.writeText(invadeLink);

    const afterCopy = copyButtonRef.current.querySelector('.afterCopy')

    gsap.to(afterCopy, 0, {
      zIndex: 10,
      display: 'flex',
      background: '#6A92DE',
      clipPath: 'circle(0%)',
    })

    gsap.to(afterCopy, .2, {
      clipPath: 'circle(100%)',
    });

    gsap.to(copyButtonRef.current, .1, {
      scale: 1.2,
      ease: Back.easeOut.config(1.7),
    })

    gsap.to(copyButtonRef.current, .1, {
      delay: .1,
      scale: 1,
      ease: Back.easeOut.config(1.7),
    })
  }

  const getInvade = () => {
    userTokenId((token: string) => {
      fetch(`${URL}createInvade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          roomId: roomId,
          roomName: roomName,
        }),
      })
        .then(data => data.json())
        .then(invadeData => {
          setImage(invadeData.image);
          setInvadeLink(invadeData.link);
        })
        .catch(error => {
          // TODO: handle this error
        });
    });
  }

  useEffect(() => {
    getInvade();
  })

  return {
    copyButtonRef,
    animationCopyButton,
    image,
    invadeLink
  }
};

export default useHooks;