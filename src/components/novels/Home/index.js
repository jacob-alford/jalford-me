import React from 'react';

import {
  IceCaveFeatured,
  RPNFeatured,
  BlogFeatured,
  PuzzleFeatured
} from 'components/paragraphs/Home';

import { StyledHome } from './style.js';

import withPageFade from 'components/bindings/wrappers/withPageFade';
import useScrollToTopOnload from 'components/bindings/hooks/useScrollToTopOnload';

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
