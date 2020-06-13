import React from 'react';
import useBabylon from 'components/bindings/utilityHooks/useBabylon';
import init from './IntroII.init';

import { Splash } from './IntroII.style';

const Intro = () => {
  const canvasRef = useBabylon(init);

  return <Splash ref={canvasRef} />;
};

export default Intro;
