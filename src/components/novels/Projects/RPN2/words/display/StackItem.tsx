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

export const formatNumber = (num: number): number | string => {
	const decimals = num.toString().split('.');
	if (num.toString().length > 27) return num.toPrecision(21);
	if (decimals.length < 2) return num.toLocaleString();
	else
		return num.toLocaleString(undefined, {
			minimumFractionDigits: decimals[1].length
		});
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
