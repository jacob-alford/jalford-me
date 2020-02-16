import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import toNumber from 'lodash/toNumber';

import BackspaceIcon from '@material-ui/icons/Backspace';
import FunctionsIcon from '@material-ui/icons/Functions';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import MultiplyIcon from '@material-ui/icons/Clear';

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
	const notifUIDCache = useRef([]);
	const [stack, tape, operate] = useCalcBrain(notifUIDCache);
	const [degRad, setDegRad] = useState(drEnum.rad);
	const [entry, amendEntry] = useTyper();
	console.log(stack, entry);
	return (
		<RPNContainer>
			<Row>
				<Group>
					<Row>
						<Danger onClick={() => operate(perform(op.clearAll))}>AC</Danger>
						<Danger onClick={() => amendEntry(press(npButt.clear))}>C</Danger>
						<Danger onClick={() => amendEntry(press(npButt.backspace))}>
							<BackspaceIcon />
						</Danger>
					</Row>
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
						<StackOp
							onClick={() => {
								operate(enter(toNumber(entry) || stack[0]));
								amendEntry(press(npButt.clear));
							}}>
							enter
						</StackOp>
					</Row>
				</Group>
				<Group>
					<Row>
						<Operation2 onClick={() => toggleDegRad(degRad, setDegRad)}>
							{degRad}
						</Operation2>
						<Entry onClick={() => null}>C</Entry>
						<Entry onClick={() => null}>
							<FunctionsIcon />
						</Entry>
						<Operation1 onClick={() => operate(perform(op.xInv))}>
							<sup>1</sup>/<sub>x</sub>
						</Operation1>
					</Row>
					<Row>
						<Operation2 onClick={() => operate(perform(op.add))}>
							<AddIcon />
						</Operation2>
						<Operation2 onClick={() => operate(perform(op.sub))}>
							<SubtractIcon />
						</Operation2>
						<Operation2 onClick={() => operate(perform(op.mul))}>
							<MultiplyIcon />
						</Operation2>
						<Operation2 onClick={() => operate(perform(op.div))}>/</Operation2>
					</Row>
					<Row>
						<Operation1 onClick={() => operate(perform(op.sin))}>
							sin
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.cos))}>
							cos
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.tan))}>
							tan
						</Operation1>
					</Row>
					<Row>
						<Operation1 onClick={() => operate(perform(op.asin))}>
							asin
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.acos))}>
							acos
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.atan))}>
							atan
						</Operation1>
					</Row>

					<Row>
						<Operation1 onClick={() => operate(perform(op.sqrt))}>
							x<sup>½</sup>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.tenX))}>
							10<sup>x</sup>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.twoX))}>
							2<sup>x</sup>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.eX))}>
							e<sup>x</sup>
						</Operation1>
					</Row>
					<Row>
						<Operation1 onClick={() => operate(perform(op.xRty))}>
							y<sup>1/x</sup>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.x2))}>
							x<sup>2</sup>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.yX))}>
							y<sup>x</sup>
						</Operation1>
					</Row>
					<Row>
						<Operation1 onClick={() => operate(perform(op.log10))}>
							log<sub>10</sub>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.log2))}>
							log<sub>2</sub>
						</Operation1>
						<Operation1 onClick={() => operate(perform(op.ln))}>ln</Operation1>
					</Row>
				</Group>
			</Row>
		</RPNContainer>
	);
}
