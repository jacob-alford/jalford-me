import React from 'react';

import TemplateWebsite from 'components/novels/Websites/Template.js';
import TechListing from 'components/words/IconText';

import surfshackpizza from 'assets/websites/surfshackpizza.webp';
import surfshackpizzaAppleEdition from 'assets/websites/surfshackpizza.jpg';
import wordpress from 'assets/websites/Wordpress-Logo.svg';

export default function SurfShackPizza({ featured }) {
	return (
		<TemplateWebsite
			heading='Surf Shack Pizza'
			tagline='Crave our California Carbs'
			year='(2013)'
			action={{
				text: 'Mmmmmmmm',
				href: 'http://surfshackpizza.net/'
			}}
			image={{
				source: surfshackpizza,
				altSource: surfshackpizzaAppleEdition,
				alt: 'California Carbs',
				href: 'http://surfshackpizza.net/'
			}}
			featured={featured}
			techRP={() => (
				<TechListing img={wordpress} text='Wordpress' url='https://wordpress.com/' />
			)}
		/>
	);
}
