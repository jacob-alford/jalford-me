import React from 'react';

import { FeaturedPhoto } from '../../paragraphs/Home';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';

function Home(props){
  return (
    <StyledHome>
      <FeaturedPhoto />
    </StyledHome>
  );
}

export default withPageFade(Home);
