import React , { useState , useEffect } from 'react';

import DuncanStrauss from '../../sentences/BlogSeries/DuncanStrauss';



import withPageFade from '../../bindings/wrappers/withPageFade';

const styles = {

}

function Blog(props) {
  return (
    <DuncanStrauss />
  );
}

export default withPageFade(Blog);
