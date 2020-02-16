import React from 'react';
import styled from 'styled-components';

import C from '../constants';

const ItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ItemIndex = styled.div`
	color: white;
	margin-right: 16px;
`;

const StackCard = styled.div`
	text-align: right;
	font-size: 32px;
	color: ${C.blue(2)};
	border: 4px solid ${C.blue(0)};
	background: ${C.blue(0)};
	border-radius: 8px;
	height: ${C.h};
	width: max-content;
	padding: 8px;
	margin: 16px;
	margin-left: 8px;
`;

const StackItem = (props: { num: number; index: number | string }) => {
	const { num, index } = props;
	return (
		<ItemContainer>
			<StackCard>{num}</StackCard>
			<ItemIndex>{index}</ItemIndex>
		</ItemContainer>
	);
};

export default StackItem;
