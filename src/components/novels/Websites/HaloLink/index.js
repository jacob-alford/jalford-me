import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import haloLink from 'assets/websites/haloLink.webp';
import reactLogo from 'assets/websites/reactlogo.svg';
import graphQlLogo from 'assets/websites/GraphQL_Logo.svg';
import tensorflowLogo from 'assets/websites/TF_White_Icon.svg';

export default function HaloLink(){
  return (
    <TemplateWebsite
      heading='Halo Link'
      tagline='I blended multiband images together with math'
      year='(2019)'
      action={{
        text:'Pathologize',
        href:'http://www.indicalab.com/halolink/'
      }}
      image={{
        source:haloLink,
        alt:'A pathologists toolbag',
        href:'http://www.indicalab.com/halolink/'
      }}
      techRP={() => (
        <React.Fragment>
          <TechListing img={reactLogo} text="React" url='https://reactjs.org/'/>
          <TechListing img={graphQlLogo} text="GraphQL" url='https://graphql.org'/>
          <TechListing img={tensorflowLogo} text="TensorFlow" url='https://www.tensorflow.org/js'/>
        </React.Fragment>
      )}/>
  );
}
