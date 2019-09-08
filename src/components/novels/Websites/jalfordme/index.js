import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import reactlogo from 'assets/websites/reactlogo.svg';
import reduxlogo from 'assets/websites/reduxlogo.svg';
import firebaselogo from 'assets/websites/firebaselogo.svg';
import featured2 from 'assets/websites/jalfordme_feat2.webp';
import featured2Jpeg from 'assets/websites/jalfordme_feat2.jpg';

export default function Jalfordme(){
  return (
    <TemplateWebsite
      heading='jalford.me'
      tagline='Inspiring artful design, and proper practice'
      year='(2019)'
      action={{
        text:'Live Demo',
        href:'/'
      }}
      image={{
        source:featured2,
        altSource:featured2Jpeg,
        alt:'The Duncan Strauss Mysteries',
        href:'/posts'
      }}
      techRP={() => (
        <React.Fragment>
          <TechListing img={reactlogo} text="React" url='https://reactjs.org/'/>
          <TechListing img={reduxlogo} text="Redux" url='https://react-redux.js.org/'/>
          <TechListing img={firebaselogo} text="Firebase" url='https://firebase.google.com/'/>
        </React.Fragment>
      )}/>
  );
}
