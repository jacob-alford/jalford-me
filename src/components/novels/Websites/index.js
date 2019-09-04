import React from 'react';

import Jalfordme from './jalfordme';

import withPageFade from '../../bindings/wrappers/withPageFade';

function Websites(){
  return (
    <React.Fragment>
      <Jalfordme />
    </React.Fragment>
  );
}

export default withPageFade(Websites);
