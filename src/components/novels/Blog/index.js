import React from 'react';

import DuncanStrauss from '../../sentences/BlogSeries/DuncanStrauss';
import Philosophy from '../../sentences/BlogSeries/Philosophy';

import withPageFade from '../../bindings/wrappers/withPageFade';

import useScrollToTopOnload from '../../bindings/hooks/useScrollToTopOnload';

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
