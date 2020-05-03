import { useEffect, useRef } from 'react';

const useInitEffect = (callback: () => void | (() => void)) => {
  const initialRender = useRef<boolean>(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      const cleanup = callback();
      if (cleanup) return () => cleanup();
    }
  }, [callback]);
};

export default useInitEffect;
