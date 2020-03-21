import React from 'react';
import { animated as a } from 'react-spring';

import { MUITitle, DB, Blue, Gray } from './style';

const BeegTitle = (props: { children: string; style: any }) => {
	const { style, children } = props;
	return (
		<MUITitle align='center' variant='h1' style={style}>
			<DB>{children[0]}</DB>
			<Blue>{children[1]}</Blue>
			<Gray>{children.slice(2)}</Gray>
		</MUITitle>
	);
};

export default BeegTitle;
