import React from 'react';

import {
  IceCaveFeatured,
  RPNFeatured,
  BlogFeatured
} from '../../paragraphs/Home';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';

function Home(props){
  return (
    <StyledHome>
      <BlogFeatured />
      <IceCaveFeatured />
      <RPNFeatured />
    </StyledHome>
  );
}

export default withPageFade(Home);
