import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Entry = (props: SurfaceProps) => {
	const { onClick, children } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.orange(1)}
			borderColor={C.orange(0)}
			color='black'>
			{children}
		</Button>
	);
};

export default Entry;
