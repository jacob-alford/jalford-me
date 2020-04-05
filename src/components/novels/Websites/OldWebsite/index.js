import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import oldGif from 'assets/websites/oldoldMotion.webm';
import gsapLogo from 'assets/websites/GSAP.png';
import jqueryLogo from 'assets/websites/jquery-icon.svg';
import phpLogo from 'assets/websites/phplogo.svg';

export default function OldWebsite({ featured }) {
	return (
		<TemplateWebsite
			heading='Long Ago'
			tagline='In a car dealership far far away'
			year='(2014)'
			action={{
				disabled: true
			}}
			video={{
				source: oldGif,
				alt: 'An old website from long ago',
				href: '/websites'
			}}
			featured={featured}
			techRP={() => (
				<React.Fragment>
					<TechListing img={phpLogo} text='PHP' url='https://www.php.net/' />
					<TechListing img={jqueryLogo} text='jQuery' url='https://jquery.com/' />
					<TechListing img={gsapLogo} text='GSAP' url='https://greensock.com/tweenmax/' />
				</React.Fragment>
			)}
		/>
	);
}
