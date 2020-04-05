import React from 'react';

import {
	WebsitesFeatured,
	RPNFeatured,
	BlogFeatured,
	PuzzleFeatured
} from 'components/paragraphs/Home';

import withPageFade from 'components/bindings/wrappers/withPageFade';

function Home() {
	return (
		<React.Fragment>
			<BlogFeatured />
			<WebsitesFeatured />
			<PuzzleFeatured />
			<RPNFeatured />
		</React.Fragment>
	);
}

export default withPageFade(Home);
