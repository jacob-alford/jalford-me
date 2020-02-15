import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

type ContProps = {
	backgroundColor: string;
	borderColor: string;
};
const Cont = styled.div`
	background: ${(props: ContProps) => props.backgroundColor};
	border: 4px solid ${(props: ContProps) => props.borderColor};
	flex-grow: 1;
	text-align: center;
`;

type ButtProps = {
	colour: string;
};
const InnerButton = styled(Button)`
	color: ${(props: ButtProps) => props.colour};
	text-transform: none;
	font-size: 2rem;
	width: 100%;
`;

export type SurfaceProps = {
	children: ReactNode;
	onClick?: (evt: any) => any;
};

type ButtonProps = {
	children: ReactNode;
	onClick?: (evt: any) => any;
	backgroundColor: string;
	borderColor: string;
	color: string;
};

export default (props: ButtonProps) => {
	const { children, onClick, backgroundColor, borderColor, color } = props;
	return (
		<Cont backgroundColor={backgroundColor} borderColor={borderColor}>
			<InnerButton onClick={onClick} colour={color}>
				{children}
			</InnerButton>
		</Cont>
	);
};
