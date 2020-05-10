import React from 'react';
import { useSpring } from 'react-spring';
import useCanvas from 'components/bindings/utilityHooks/useCanvas';
import { draw, store, init } from './draw';
import { Splash, Orbital } from './style';
import Title from 'components/words/BigTitle/BigTitle';
import Background from 'components/paragraphs/Background/Background';

const Home = () => {
  const orbitCnv = useCanvas<store>(
    draw,
    {
      rainParticles: [],
      lightning: 0,
      apeSideLength: Math.exp(-1) - 7 / 200,
      magenta: 0,
      blue: 0,
      orange: 0
    },
    init
  );
  const [titleFade, setTitleFade] = useSpring(() => ({
    opacity: 0,
    from: {
      opacity: 0
    },
    config: {
      tension: 69,
      friction: 42,
      precision: 0.0001
    }
  }));
  const zoom = useSpring({
    transform: `translate3d(0, 0px, 0)`,
    opacity: 1,
    from: {
      transform: `translate3d(0, 112px, 0)`,
      opacity: 0
    },
    config: {
      tension: 69,
      friction: 23,
      precision: 0.0001
    },
    onRest: () => setTitleFade({ opacity: 1 })
  });

  return (
    <Splash>
      <Background />
      <Title style={titleFade}>jalford</Title>
      <Orbital style={zoom} ref={orbitCnv} />
    </Splash>
  );
};

export default Home;
