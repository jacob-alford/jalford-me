import { useRef , useEffect } from 'react';
import { useSpring } from 'react-spring';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function useScrollToTopOnload(){
  const hasFinished = useRef(false);
  const startPosition = useRef(window.scrollY);
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');
  const [,,stopInter] = useSpring(() => {
    return {
      y:0,
      from:{
        y:startPosition.current
      },
      onRest:() => hasFinished.current = true,
      immediate:startPosition.current === 0 || isTouchDevice,
      config:{
        tension:420,
        friction:69
      },
      onFrame: location => {
        if(!hasFinished.current)
          window.scroll(0,location.y);
      }
    }
  });
  useEffect(() => {
    if(!isTouchDevice){
      window.addEventListener('wheel',stopInter);
      return () => window.removeEventListener('wheel',stopInter);
    }
  },[stopInter,isTouchDevice]);
  useEffect(() => {
    if(isTouchDevice)
      window.scrollTo(0,0);
  },[isTouchDevice]);
}
