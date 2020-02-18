import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import C from './constants';

type ContProps = {
	backgroundColor: string;
	borderColor: string;
	flexGrow?: number;
};
const Cont = styled.div`
	background: ${(props: ContProps) => props.backgroundColor};
	border: 4px solid ${(props: ContProps) => props.borderColor};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: ${({ flexGrow = 1 }) => flexGrow};
	text-align: center;
	border-radius: 16px;
	margin: 2px;
	@media (max-width: 425px) {
	}
`;

type ButtProps = {
	colour: string;
};
const InnerButton = styled(Button)`
	color: ${(props: ButtProps) => props.colour};
	display: block;
	text-transform: none;
	font-size: 2rem;
	width: 100%;
	height: ${C.H};
	border-radius: 16px;
	@media (max-width: 425px) {
	}
`;

export type SurfaceProps = {
	children: ReactNode;
	onClick?: (evt: any) => any;
	flexGrow?: number;
};

type ButtonProps = {
	children: ReactNode;
	onClick?: (evt: any) => any;
	backgroundColor: string;
	borderColor: string;
	color: string;
	flexGrow?: number;
};

export default (props: ButtonProps) => {
	const {
		children,
		onClick,
		backgroundColor,
		borderColor,
		color,
		flexGrow
	} = props;
	return (
		<Cont
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			flexGrow={flexGrow}>
			<InnerButton onClick={onClick} colour={color}>
				{children}
			</InnerButton>
		</Cont>
	);
};
