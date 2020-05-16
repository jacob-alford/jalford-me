import { useRef, useEffect, useCallback } from 'react';
import { useSpring } from 'react-spring';

import { detectMobile } from 'functions';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function useTriggerScroll(finalLocation = 0) {
  const isTouchDevice = useRef(detectMobile());
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  // @ts-ignore
  const [, setInter, stopInter] = useSpring(() => ({
    y: 0,
    config: {
      tension: 420,
      friction: 69
    }
  }));
  useEffect(() => {
    if (!isTouchDevice.current && !prefersReducedMotion) {
      // @ts-ignore
      window.addEventListener('wheel', stopInter);
      // @ts-ignore
      return () => window.removeEventListener('wheel', stopInter);
    }
  }, [stopInter, isTouchDevice, prefersReducedMotion]);
  return useCallback(() => {
    setInter({
      y: finalLocation,
      reset: true,
      from: { y: window.scrollY },
      immediate: isTouchDevice.current || prefersReducedMotion,
      // @ts-ignore
      onFrame: (props: { y: number }) => {
        window.scroll(0, props.y);
      }
    });
  }, [setInter, finalLocation, prefersReducedMotion]);
}
