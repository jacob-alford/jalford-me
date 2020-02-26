import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Entry = (props: SurfaceProps) => {
	const { onClick, children, flexGrow } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.red(2)}
			borderColor={C.orange(0)}
			flexGrow={flexGrow}
			color={C.cyan(0)}>
			{children}
		</Button>
	);
};

export default Entry;
