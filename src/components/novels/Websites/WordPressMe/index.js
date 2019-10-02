import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import wordpressWebP from 'assets/websites/wordpress_site.webp';
import wordPressJpegForAEPL from 'assets/websites/wordpress_site.jpg';
import wordpress from 'assets/websites/Wordpress-Logo.svg';

export default function WordPressMe({featured}){
  return (
    <TemplateWebsite
      heading='[OG] jalford.co'
      tagline='Hey, WordPress actually looks pretty good'
      year='(2016)'
      action={{
        disabled:true
      }}
      image={{
        source:wordpressWebP,
        altSource:wordPressJpegForAEPL,
        alt:'My WordPress Site',
        href:'/websites'
      }}
      featured={featured}
      techRP={() => (
        <TechListing img={wordpress} text="Wordpress" url='https://wordpress.com/'/>
      )}/>
  );
}
