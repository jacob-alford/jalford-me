import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Danger = (props: SurfaceProps) => {
	const { onClick, children } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor='white'
			borderColor='white'
			color='red'>
			{children}
		</Button>
	);
};

export default Danger;
