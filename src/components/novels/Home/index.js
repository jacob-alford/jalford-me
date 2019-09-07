import React from 'react';

import {
  IceCaveFeatured,
  RPNFeatured,
  BlogFeatured,
  PuzzleFeatured
} from 'components/paragraphs/Home';

import withPageFade from 'components/bindings/wrappers/withPageFade';
import useScrollToTopOnload from 'components/bindings/hooks/useScrollToTopOnload';

function Home(){
  useScrollToTopOnload();
  return (
    <React.Fragment>
      <BlogFeatured />
      <IceCaveFeatured />
      <RPNFeatured />
      <PuzzleFeatured />
    </React.Fragment>
  );
}

export default withPageFade(Home);
