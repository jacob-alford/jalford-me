import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const Entry = (props: SurfaceProps) => {
	const { onClick, children, flexGrow, toggled } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.red(2)}
			borderColor={C.orange(0)}
			flexGrow={flexGrow}
			toggled={toggled ? C.red(1) : undefined}
			color={C.cyan(0)}>
			{children}
		</Button>
	);
};

export default Entry;
