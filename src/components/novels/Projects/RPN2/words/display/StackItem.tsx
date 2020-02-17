import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';

import C from '../constants';

const ItemContainer = styled(a.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	top: 0px;
`;

const ItemIndex = styled.div`
	color: white;
	margin-right: 16px;
`;

const StackCard = styled.div`
	text-align: right;
	font-size: 32px;
	color: ${C.blue(0)};
	border: 4px solid ${C.blue(0)};
	background: black;
	border-radius: 8px;
	height: ${C.h};
	width: max-content;
	padding: 8px;
	margin: 16px;
	margin-left: 8px;
`;

const StackItem = (props: {
	num: number;
	index: number | string;
	animatedStyles: any;
	UID: string;
}) => {
	const { num, index, animatedStyles, UID } = props;
	return (
		<ItemContainer style={animatedStyles} key={UID}>
			<StackCard>{num}</StackCard>
			<ItemIndex>{index}</ItemIndex>
		</ItemContainer>
	);
};

export default StackItem;
