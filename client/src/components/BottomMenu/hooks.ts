import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import Routers from 'Routers';

enum currentPages{
  chat,
  voice,
  more
}

const standardColors = {
  gray: '#BBBBC2',
  green: '#23B287',
  blue: '#8D9CF4',
}

const BottomMenuHooks = () => {
  const [currentPage, setCurrerntPage] = useState(currentPages.chat);

  const wrapperRef: any = useRef(null);

  useEffect(() => {
    const animationFunctions = [
      animationChat,
      animationCalls,
      animationMore
    ]

    const location = window.location.pathname;

    Routers.forEach((router, routerIndex) => {
      if (router.path === location) {
        animationFunctions[routerIndex](true);
        setCurrerntPage(routerIndex)
      } else {
        animationFunctions[routerIndex](false)
      }
    })

  }, [])

  const switchPage = (toPage: number) => {

    const animationFunctions = [
      animationChat,
      animationCalls,
      animationMore
    ]

    animationFunctions[currentPage](false);

    setCurrerntPage(toPage);

    animationFunctions[toPage](true)
  }

  const animationCalls = (isEnter: boolean) => {
    const callIcon = wrapperRef.current.querySelectorAll('.icon')[1];
    const callText = wrapperRef.current.querySelectorAll('.text')[1];
    const phone = callIcon.getElementById('phone');

    if (isEnter) {
      const tl = gsap.timeline();
  
      tl.to(callIcon, .2, {
        rotate: 60,
      }).to(callIcon, .2, {
        rotate: 0,
      }).to(phone, .2, {
        delay: -0.4,
        stroke: standardColors.green
      }).to(callText, .2, {
        color: standardColors.green,
        delay: -0.6
      })
    } else {
      const tl = gsap.timeline();

      tl.to(phone, .2, {
        stroke: standardColors.gray,
      }).to(callText, .2, {
        delay: -0.2,
        color: standardColors.gray
      })
    }
  }

  const animationChat = (isEnter: boolean) => {
    const chatIcon = wrapperRef.current.querySelectorAll('.icon')[0];
    const chatText = wrapperRef.current.querySelectorAll('.text')[0];
    const chat1 = chatIcon.getElementById('chat1');
    const chat2 = chatIcon.getElementById('chat2');

    if (isEnter) {
      const tl = gsap.timeline();

      tl.to(chatIcon, .2, {
        scale: 0.7
      }).to(chatIcon, .2, {
        scale: 1
      }).to([chat1, chat2], {
        stroke: standardColors.blue,
        delay: -0.4,
      }).to(chatText, .2, {
        delay: -0.4,
        color: standardColors.blue,
      })
    } else {
      const tl = gsap.timeline();

      tl.to([chat1, chat2], {
        stroke: standardColors.gray,
      }).to(chatText, {
        delay: -0.4,
        color: standardColors.gray
      })
    }
  }

  const animationMore = (isEnter: boolean) => {
    const moreIcon = wrapperRef.current.querySelectorAll('.icon')[2];
    const moreText = wrapperRef.current.querySelectorAll('.text')[2];
    const circle1 = moreIcon.getElementById('circle1');
    const circle2 = moreIcon.getElementById('circle2');
    const circle3 = moreIcon.getElementById('circle3');

    if (isEnter) {
      const tl = gsap.timeline();
      tl.to(circle3, .2, {
        y: -300,
        delay: -.15
      }).to(circle2, .2, {
        y: -300,
        delay: -.15
      }).to(circle1, .2, {
        y: -300,
        delay: -.15
      }).to(circle3, .2, {
        y: 300,
        delay: -.15
      }).to(circle2, .2, {
        y: 300,
        delay: -.15
      }).to(circle1, .2, {
        y: 300,
        delay: -.15
      }).to(circle3, .2, {
        y: 0,
        delay: -.15
      }).to(circle2, .2, {
        y: 0,
        delay: -.15
      }).to(circle1, .2, {
        y: 0,
        delay: -.15
      })
      .to([circle1, circle2, circle3], {
        stroke: standardColors.blue,
      }).to(moreText, .2, {
        color: standardColors.blue
      })
    } else {
      const tl = gsap.timeline();

      tl.to([circle1, circle2, circle3], {
        stroke: standardColors.gray,
      }).to(moreText, {
        color: standardColors.gray
      })
    }

  }

  return {
    switchPage,
    wrapperRef,
    currentPage
  }
};

export default BottomMenuHooks;