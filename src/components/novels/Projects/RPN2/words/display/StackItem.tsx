import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';

import C from '../constants';

const ItemContainer = styled(a.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	top: 0px;
	width: 100%;
`;

const ItemIndex = styled.div`
	color: white;
	margin-right: 16px;
`;

const StackCard = styled.div`
	text-align: right;
	font-size: 30px;
	color: ${C.blue(0)};
	border: 4px solid ${C.blue(0)};
	background: black;
	border-radius: 8px;
	height: ${C.h};
	padding: 8px;
	margin: 8px;
	max-width: 100%;
	text-overflow: ellipse;
	white-space: nowrap;
	overflow: hidden;
`;

const shouldExp = (num: number): boolean => {
	const str = num.toString();
	if (str.length > 14 || str.includes('e')) return true;
	else return false;
};

export const formatNumber = (num: number): string => {
	if (shouldExp(num)) return num.toExponential();
	else return num.toLocaleString();
};

const StackItem = (props: {
	num: number;
	index: number | string;
	animatedStyles: any;
	UID: string;
}) => {
	const { num, index, animatedStyles, UID } = props;
	return (
		<ItemContainer style={animatedStyles} key={UID}>
			<StackCard>{formatNumber(num)}</StackCard>
			<ItemIndex>{index}</ItemIndex>
		</ItemContainer>
	);
};

export default StackItem;
