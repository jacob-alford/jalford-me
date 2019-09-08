import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import cssLogo from 'assets/websites/csslogo.svg';
import jqueryLogo from 'assets/websites/jquery-icon.svg';
import labellavita from 'assets/websites/labellavita.webp';
import labellavitaForApple from 'assets/websites/labellavita.jpg';

export default function LaBellaVita(){
  return (
    <TemplateWebsite
      heading='La Bella Vita'
      tagline='The Italian Eatery Made with Love (now closed)'
      year='(2014)'
      action={{
        disabled:true
      }}
      image={{
        source:labellavita,
        altSource:labellavitaForApple,
        alt:'Rest in peace, old friend',
        href:'/websites'
      }}
      techRP={() => (
        <React.Fragment>
          <TechListing img={jqueryLogo} text="jQuery" url='https://jquery.com/'/>
          <TechListing img={cssLogo} text="CSS" url='https://www.w3schools.com/css/'/>
        </React.Fragment>
      )}/>
  );
}
