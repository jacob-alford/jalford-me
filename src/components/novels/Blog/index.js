import React from 'react';

import DuncanStrauss from 'components/sentences/BlogSeries/DuncanStrauss';
import Philosophy from 'components/sentences/BlogSeries/Philosophy';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useScrollToTopOnload from 'components/bindings/hooks/useScrollToTopOnload';

function Blog() {
  useScrollToTopOnload();
  return (
    <React.Fragment>
      <DuncanStrauss minHeight={1000} widthStr="100vw"/>
      <Philosophy minHeight={1000} widthStr="100vw"/>
    </React.Fragment>

  );
}

export default withPageFade(Blog);
