import React from 'react';
import Button, { SurfaceProps } from '../Button';
import C from '../constants';

const StackOps = (props: SurfaceProps) => {
	const { onClick, children, disabled } = props;
	return (
		<Button
			onClick={onClick}
			backgroundColor={C.blue(2)}
			borderColor={C.blue(0)}
			disabled={disabled}
			color={C.cyan(0)}>
			{children}
		</Button>
	);
};

export default StackOps;
