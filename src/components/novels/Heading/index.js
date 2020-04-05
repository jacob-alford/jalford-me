import React from 'react';
import { useSpring, animated as a } from 'react-spring';

import Header from 'components/paragraphs/Header';

import themeConstruct from 'theme';

const styles = themeConstruct(['getHeaderBg'], ([headerBg]) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: headerBg,
		MozBoxShadow: 'inset 0 -10px 16px -10px rgba(11,11,11,.6)',
		WebkitBoxShadow: 'inset 0 -10px 16px -10px rgba(11,11,11,.6)',
		boxShadow: 'inset 0 -10px 16px -10px rgba(11,11,11,.6)'
	}
}));

export default function Heading(props) {
	const { headerIsOpen } = props;
	const { height, minHeight, paddingTop } = useSpring({
		height: `${headerIsOpen ? 25 : 0}vh`,
		minHeight: `${headerIsOpen ? 135 : 0}px`,
		paddingTop: `${headerIsOpen ? 48 : 0}px`
	});
	return (
		<a.div
			style={{
				...styles.container,
				height: height,
				minHeight: minHeight,
				paddingTop: paddingTop
			}}>
			<div>
				<Header headerIsOpen={headerIsOpen} />
			</div>
		</a.div>
	);
}
