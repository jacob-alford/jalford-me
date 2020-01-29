import React from 'react';

import DuncanStrauss from 'components/sentences/BlogSeries/DuncanStrauss';
import withPageFade from 'components/bindings/wrappers/withPageFade';

function Blog() {
	return (
		<React.Fragment>
			<DuncanStrauss minHeight={1000} widthStr='100vw' />
		</React.Fragment>
	);
}

export default withPageFade(Blog);
