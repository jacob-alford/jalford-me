import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import squarespace from 'assets/websites/squarespacelogo.svg';
import jalfordCO from 'assets/websites/jalford-co.png';

export default function Jalfordco({featured}){
  return (
    <TemplateWebsite
      heading='jalford.co the sequel'
      tagline="Drag; drag; and drop!"
      year='(early 2018)'
      action={{
        text:'Live Demo',
        href:'https://jalford.me/'
      }}
      image={{
        source:jalfordCO,
        alt:'My squarespace site',
        href:'/websites'
      }}
      featured={featured}
      techRP={() => (
        <React.Fragment>
          <TechListing img={squarespace} text="Squarespace" url='https://www.squarespace.com/'/>
        </React.Fragment>
      )}/>
  );
}
