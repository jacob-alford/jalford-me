import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Danger = (props: SurfaceProps) => {
	const { onClick, children } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.cyan(0)}
			borderColor='white'
			color={C.red(0)}>
			{children}
		</Button>
	);
};

export default Danger;
