import { useRef, useEffect } from 'react';
import { useSpring } from 'react-spring';

import { detectMobile } from 'functions';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function useScrollToTopOnload(callback) {
  const hasFinished = useRef(false);
  const startPosition = useRef(window.scrollY);
  const isTouchDevice = useRef(detectMobile());
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [, , stopInter] = useSpring(() => {
    return {
      y: 0,
      from: {
        y: startPosition.current
      },
      immediate: startPosition.current === 0 || isTouchDevice.current,
      config: {
        tension: 420,
        friction: 69
      },
      onFrame: location => {
        if (location.y === 0) {
          hasFinished.current = true;
          if (callback) callback();
        }
        if (!hasFinished.current) window.scroll(0, location.y);
      }
    };
  });
  useEffect(() => {
    if (!isTouchDevice.current && !prefersReducedMotion) {
      window.addEventListener('wheel', stopInter);
      return () => window.removeEventListener('wheel', stopInter);
    }
  }, [stopInter, isTouchDevice, prefersReducedMotion]);
  useEffect(() => {
    if (isTouchDevice.current || prefersReducedMotion) window.scrollTo(0, 0);
  }, [isTouchDevice, prefersReducedMotion]);
}
