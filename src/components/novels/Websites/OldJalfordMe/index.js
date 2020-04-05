import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import bootstrapLogo from 'assets/websites/Boostrap_logo.svg';
import jquery from 'assets/websites/jquery-icon.svg';
import jalfordMe from 'assets/websites/jalford-me-just.webp';
import jalfordMeForSafariONLY from 'assets/websites/jalford-me-just.jpg';

export default function OldJalfordMe({ featured }) {
	return (
		<TemplateWebsite
			heading='The Website of Yesteryear'
			tagline='(Really just copying Squarespace)'
			year='(late 2018)'
			action={{
				disabled: true
			}}
			image={{
				source: jalfordMe,
				altSource: jalfordMeForSafariONLY,
				alt: 'My previous iteration',
				href: 'https://jalford.me/'
			}}
			featured={featured}
			techRP={() => (
				<React.Fragment>
					<TechListing img={jquery} text='jQuery' url='https://jquery.com/' />
					<TechListing img={bootstrapLogo} text='BootStrap' url='https://getbootstrap.com/' />
				</React.Fragment>
			)}
		/>
	);
}
