import React from 'react';

import {
  IceCaveFeatured,
  RPNFeatured,
  BlogFeatured,
  PuzzleFeatured
} from '../../paragraphs/Home';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';
import useScrollToTopOnload from '../../bindings/hooks/useScrollToTopOnload';

function Home(){
  useScrollToTopOnload();
  return (
    <StyledHome>
      <BlogFeatured />
      <IceCaveFeatured />
      <RPNFeatured />
      <PuzzleFeatured />
    </StyledHome>
  );
}

export default withPageFade(Home);
