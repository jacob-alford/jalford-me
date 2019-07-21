import React from 'react';

import { IceCaveFeatured } from '../../paragraphs/Home';
import { RPNFeatured } from '../../paragraphs/Home';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';

function Home(props){
  return (
    <StyledHome>
      <IceCaveFeatured />
      <RPNFeatured />
    </StyledHome>
  );
}

export default withPageFade(Home);
