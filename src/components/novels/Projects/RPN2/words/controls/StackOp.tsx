import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const StackOps = (props: SurfaceProps) => {
	const { onClick, children } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.blue(0)}
			borderColor={C.blue(0)}
			color='white'>
			{children}
		</Button>
	);
};

export default StackOps;
