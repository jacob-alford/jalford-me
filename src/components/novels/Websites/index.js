import React from 'react';

import Jalfordme from './jalfordme';
import OldJalfordMe from './OldJalfordMe';
import Jalfordco from './Jalfordco';
import OldWebsite from './OldWebsite';
import LaBellaVita from './LaBellaVita';
import SurfShackPizza from './SurfShackPizza';
import IceCaves from './IceCaves';
import StuderDreams from './StuderDreams';
import HaloLink from './HaloLink';
import WordPressMe from './WordPressMe';

import withPageFade from 'components/bindings/wrappers/withPageFade';

function Websites(){
  return (
    <React.Fragment>
      <Jalfordme />
      <HaloLink />
      <SurfShackPizza />
      <OldWebsite />
      <LaBellaVita />
      <StuderDreams />
      <WordPressMe />
      <IceCaves />
      <Jalfordco />
      <OldJalfordMe />
    </React.Fragment>
  );
}

export default withPageFade(Websites);
