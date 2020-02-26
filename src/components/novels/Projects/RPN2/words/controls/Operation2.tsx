import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Operation2 = (props: SurfaceProps) => {
	const { onClick, children } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.red(1)}
			borderColor={C.blue(0)}
			color={C.cyan(0)}>
			{children}
		</Button>
	);
};

export default Operation2;
