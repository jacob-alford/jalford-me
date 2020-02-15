import React, { useState } from 'react';
import styled from 'styled-components';
import toNumber from 'lodash/toNumber';

import {
	Group,
	Row,
	StackOp,
	Operation1,
	Operation2,
	Entry,
	Danger
} from './words/controls';

import useCalcBrain from './useCalcBrain/useCalcBrain';
import { op } from './useCalcBrain/operators/_types';
import useTyper from './useTyper/useTyper';
import { npButt } from './useTyper/_types';

import { enter, drop, press, perform } from './top-level-ops/topLevelOps';

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
	const [entry, amendEntry] = useTyper();
	console.log(stack, entry);
	return (
		<RPNContainer>
			<Row>
				<Group>
					<Row>
						<Danger onClick={() => operate(drop())}>Drop</Danger>
						<StackOp onClick={() => operate(perform(op.roll))}>Roll</StackOp>
						<StackOp onClick={() => operate(perform(op.swap))}>Swap</StackOp>
					</Row>
					<Row>
						<Entry onClick={() => amendEntry(press(npButt.seven))}>7</Entry>
						<Entry onClick={() => amendEntry(press(npButt.eight))}>8</Entry>
						<Entry onClick={() => amendEntry(press(npButt.nine))}>9</Entry>
					</Row>
					<Row>
						<Entry onClick={() => amendEntry(press(npButt.four))}>4</Entry>
						<Entry onClick={() => amendEntry(press(npButt.five))}>5</Entry>
						<Entry onClick={() => amendEntry(press(npButt.six))}>6</Entry>
					</Row>
					<Row>
						<Entry onClick={() => amendEntry(press(npButt.one))}>1</Entry>
						<Entry onClick={() => amendEntry(press(npButt.two))}>2</Entry>
						<Entry onClick={() => amendEntry(press(npButt.three))}>3</Entry>
					</Row>
					<Row>
						<Entry onClick={() => amendEntry(press(npButt.dot))}>.</Entry>
						<Entry onClick={() => amendEntry(press(npButt.zero))}>0</Entry>
						<Entry onClick={() => amendEntry(press(npButt.pm))}>±</Entry>
					</Row>
					<Row>
						<Danger onClick={() => amendEntry(press(npButt.backspace))}>
							{'<-'}
						</Danger>
						<Danger onClick={() => amendEntry(press(npButt.clear))}>C</Danger>
						<StackOp
							onClick={() => {
								operate(enter(toNumber(entry)));
								amendEntry(press(npButt.clear));
							}}>
							enter
						</StackOp>
					</Row>
				</Group>
				<Group>
					<Row></Row>
				</Group>
			</Row>
		</RPNContainer>
	);
}
