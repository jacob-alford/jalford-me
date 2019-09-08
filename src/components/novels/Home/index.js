import React from 'react';

import {
  IceCaveFeatured,
  RPNFeatured,
  BlogFeatured,
  PuzzleFeatured
} from 'components/paragraphs/Home';

import withPageFade from 'components/bindings/wrappers/withPageFade';

function Home(){
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
