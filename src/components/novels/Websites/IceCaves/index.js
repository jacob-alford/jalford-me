import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import icecaves from 'assets/websites/icecaves.webp';
import squarespace from 'assets/websites/squarespacelogo.svg';

export default function IceCaves(){
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
        alt:'The chillest place, but hot at the same time',
        href:'https://www.icecaves.com/'
      }}
      techRP={() => (
        <TechListing img={squarespace} imgColor='#ffffff' text="Squarespace" url='https://www.squarespace.com/'/>
      )}/>
  );
}
