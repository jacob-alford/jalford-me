import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import concat from 'lodash/concat';
import slice from 'lodash/slice';

const StackItem = styled.div`
	width: calc(100% - 2px);
	height: 71px;
	background: rgba(255, 255, 255, 0.6);
	color: black;
	border: 1px solid black;
`;

const StackColumn = styled.div`
	width: 50%;
`;

const padArr = (arr: number[], length: number): (number | string)[] =>
	arr.length < length
		? concat(Array(length - arr.length).fill(''), arr)
		: slice(arr, arr.length - length, arr.length);

const StackGroup: FunctionComponent<{ stack: number[] }> = ({ stack }) => (
	<>
		<StackColumn>
			{padArr(stack, 5).map(num => (
				<StackItem>{num}</StackItem>
			))}
		</StackColumn>
		<StackColumn>
			{padArr(slice(stack, 5), 5).map(num => (
				<StackItem>{num}</StackItem>
			))}
		</StackColumn>
	</>
);

export default StackGroup;
