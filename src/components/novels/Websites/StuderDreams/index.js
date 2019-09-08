import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import studerdreams from 'assets/websites/StuderDreams.webp';
import studerdreamsForLesserDevices from 'assets/websites/StuderDreams.jpg';
import html5 from 'assets/websites/html5logo.svg';
import jqueryLogo from 'assets/websites/jquery-icon.svg';

export default function StuderDreams(){
  return (
    <TemplateWebsite
      heading='Studer Dreams'
      tagline='You will be missed, old friend'
      year='(2014)'
      action={{
        text:'Rest in Peace',
        href:'https://youtu.be/XTzf8QA3-vs'
      }}
      image={{
        source:studerdreams,
        altSource:studerdreamsForLesserDevices,
        alt:'Rest in peace',
        href:'/websites'
      }}
      techRP={() => (
        <React.Fragment>
          <TechListing img={html5} text="HTML 5" url='https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5'/>
          <TechListing img={jqueryLogo} text="jQuery" url='https://jquery.com/'/>
        </React.Fragment>
      )}/>
  );
}
