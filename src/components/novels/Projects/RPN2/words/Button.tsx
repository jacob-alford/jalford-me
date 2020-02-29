import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import C from './constants';

type ContProps = {
	backgroundColor: string;
	borderColor: string;
	flexGrow?: number;
	toggled?: string;
};
const Cont = styled.div`
	background: ${(props: ContProps) =>
		props.toggled ? props.toggled : props.backgroundColor};
	transition: background 0.25s;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: ${({ flexGrow = 1 }) => flexGrow};
	text-align: center;
	height: ${C.H};
	border-bottom: 2px solid rgba(255, 255, 255, 0.8);
`;

type ButtProps = {
	colour: string;
};
const InnerButton = styled(Button)`
	color: ${(props: ButtProps) => props.colour};
	text-transform: none;
	font-size: 1.5rem;
	width: 100%;
	height: 100%;
	border-radius: 16px;
	line-height: 0px;
	@media (max-height: 500px) {
		font-size: 0.75rem;
	}
`;

export type SurfaceProps = {
	children: ReactNode;
	onClick?: (evt: any) => any;
	flexGrow?: number;
	disabled?: boolean;
	toggled?: boolean;
};

type ButtonProps = {
	children: ReactNode;
	onClick?: (evt: any) => any;
	backgroundColor: string;
	borderColor: string;
	color: string;
	flexGrow?: number;
	disabled?: boolean;
	toggled?: string;
};

export default (props: ButtonProps) => {
	const {
		children,
		onClick,
		backgroundColor,
		borderColor,
		color,
		flexGrow,
		disabled,
		toggled
	} = props;
	return (
		<Cont
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			flexGrow={flexGrow}
			toggled={toggled}>
			<InnerButton disabled={disabled} onClick={onClick} colour={color}>
				{children}
			</InnerButton>
		</Cont>
	);
};
