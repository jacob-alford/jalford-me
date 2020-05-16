import { useRef } from 'react';
import { useSpring } from 'react-spring';

const useDropSlide = (
  delay: number,
  shouldBeStraight: boolean,
  onStopCallback?: () => void
) => {
  const randomOffset = useRef(Math.random() * 24 - 12);
  return useSpring({
    transform: `translate3d(${shouldBeStraight ? 0 : randomOffset.current}px, 0vh, 0)`,
    opacity: 1,
    from: {
      transform: `translate3d(0px, -37px, 0)`,
      opacity: 0
    },
    config: {
      tension: 69,
      friction: 23,
      precision: 0.001
    },
    delay: shouldBeStraight ? 0 : delay,
    onRest: onStopCallback || (() => null)
  });
};
export default useDropSlide;
