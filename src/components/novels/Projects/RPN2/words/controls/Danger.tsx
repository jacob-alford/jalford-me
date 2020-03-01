import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Danger = (props: SurfaceProps) => {
	const {
		onClick,
		children,
		backgroundColor = C.blue(2),
		color = C.red(0)
	} = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={backgroundColor}
			borderColor='white'
			color={color}>
			{children}
		</Button>
	);
};

export default Danger;
