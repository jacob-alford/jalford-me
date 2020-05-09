import React from 'react';
import { useSpring } from 'react-spring';
import useCanvas from 'components/bindings/utilityHooks/useCanvas';
import { House, Landscape } from './st';
import { draw, init, store } from './draw';

const Background = () => {
  const horizonSpring = useSpring({
    horizon: 0.5,
    from: {
      horizon: 0.69
    },
    config: {
      tension: 69,
      friction: 42,
      precision: 0.0001
    }
  });
  const canvas = useCanvas<store>(
    params => {
      const { store } = params;
      store.horizonPerc = horizonSpring.horizon.getValue();
      draw(params);
    },
    { horizonPerc: 0 },
    init
  );
  const fade = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    },
    config: {
      tension: 69,
      friction: 42,
      precision: 0.0001
    }
  });
  return (
    <Landscape style={fade}>
      <House ref={canvas}></House>
    </Landscape>
  );
};

export default Background;
