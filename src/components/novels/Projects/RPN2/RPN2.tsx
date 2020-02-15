import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import StackOp from './words/controls/StackOp';
import Operation1 from './words/controls/Operation1';
import Operation2 from './words/controls/Operation2';
import Entry from './words/controls/Entry';

import useCalcBrain from './useCalcBrain/useCalcBrain';
import { enter, drop } from './top-level-ops/topLevelOps';

export enum drEnum {
	deg = 'deg',
	rad = 'rad'
}

const toggleDegRad = (degRad: drEnum, setDegRad: (val: any) => void): void =>
	degRad === drEnum.deg ? setDegRad(drEnum.rad) : setDegRad(drEnum.deg);

const RPNContainer = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	padding-top: 50px;
	background: black;
`;

export default function RPN2() {
	const [stack, tape, operate] = useCalcBrain();
	const [degRad, setDegRad] = useState(drEnum.rad);
	return (
		<RPNContainer>
			<StackOp>roll</StackOp>
			<Operation1>
				e<sup>x</sup>
			</Operation1>
			<Operation2>cos</Operation2>
			<Entry>1</Entry>
		</RPNContainer>
	);
}
