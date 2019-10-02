import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import icecaves from 'assets/websites/icecaves.webp';
import icecavesFrick from 'assets/websites/icecaves.jpg';
import squarespace from 'assets/websites/squarespacelogo.svg';

export default function IceCaves({featured}){
  return (
    <TemplateWebsite
      heading='Ice Cave and Bandera Volcano'
      tagline='Have you climbed a volcano?'
      year='(2017)'
      action={{
        text:'Brrrrrrr',
        href:'https://www.icecaves.com/'
      }}
      image={{
        source:icecaves,
        altSource:icecavesFrick,
        alt:'The chillest place, but hot at the same time',
        href:'https://www.icecaves.com/'
      }}
      featured={featured}
      techRP={() => (
        <TechListing img={squarespace} imgColor='#ffffff' text="Squarespace" url='https://www.squarespace.com/'/>
      )}/>
  );
}
