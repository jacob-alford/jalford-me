import React from 'react';

import {
  IceCaveFeatured,
  RPNFeatured,
  BlogFeatured,
  PuzzleFeatured
} from '../../paragraphs/Home';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';
import useRHook from '../../bindings/hooks/useRHook';

function Home(props){
  const { userLoading , user } = useRHook();
  return (
    <StyledHome>
      <BlogFeatured />
      <IceCaveFeatured />
      {(!userLoading && user.loggedIn) ?
         <PuzzleFeatured />
       : null}
      <RPNFeatured />
    </StyledHome>
  );
}

export default withPageFade(Home);
