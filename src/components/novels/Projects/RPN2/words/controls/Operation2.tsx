import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Operation2 = (props: SurfaceProps) => {
	const { onClick, children } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.blue(1)}
			borderColor={C.blue(0)}
			color='white'>
			{children}
		</Button>
	);
};

export default Operation2;
