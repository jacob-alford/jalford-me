import React from 'react';

import Container from 'components/words/Holder';

import CircularProgress from '@material-ui/core/CircularProgress';

import themeConstruct from 'theme';

const styles = themeConstruct(
	['getCardPadding', 'getMajorSpacing'],
	([padding, spacing]) => ({
		superHolder: {
			width: '100vw'
		},
		holder: {
			padding: padding,
			marginTop: '128px',
			width: '100px',
			height: '100px'
		}
	})
);

export default function Loader() {
	return (
		<Container style={styles.superholder}>
			<Container style={styles.holder}>
				<CircularProgress />
			</Container>
		</Container>
	);
}
