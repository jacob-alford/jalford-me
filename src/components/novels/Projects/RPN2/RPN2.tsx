import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useTransition } from 'react-spring';
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

import {
	Stack,
	Tape,
	StackItem,
	TapeItem,
	TapeAndStack,
	EnteringValue
} from './words/display';

import useCalcBrain from './useCalcBrain/useCalcBrain';
import { op, stackItem } from './useCalcBrain/operators/_types';

import useTyper from './useTyper/useTyper';
import { npButt } from './useTyper/_types';

import {
	enter,
	drop,
	press,
	perform,
	stash,
	almostOp
} from './top-level-ops/topLevelOps';

export enum drEnum {
	deg = 'deg',
	rad = 'rad'
}

const toggleDegRad = (degRad: drEnum, setDegRad: (val: any) => void): void =>
	degRad === drEnum.deg ? setDegRad(drEnum.rad) : setDegRad(drEnum.deg);

const getIndex = (index: number, length: number): string | number =>
	index === length - 1 ? 'x' : index === length - 2 ? 'y' : index + 1;

const getEntry = (entry: string, stack: stackItem[]): number => {
	const number = toNumber(entry);
	if (number === 0 || number) return number;
	else {
		const lastItem = stack[stack.length - 1];
		if (lastItem) return lastItem.number;
		else return 0;
	}
};

const trimFrontZeros = (num: string): string => {
	let outStr = '';
	let hasEncounteredNonZero = false;
	num.split('').forEach(char => {
		if (char !== '0' && !hasEncounteredNonZero) hasEncounteredNonZero = true;
		if (char === '.' && outStr.length === 0) {
			outStr += '0.';
			return;
		}
		if (hasEncounteredNonZero) outStr += char;
	});
	return outStr;
};

const RPNContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 100%;
	height: max-content;
	min-height: 100vh;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 100%;
	max-width: 750px;
`;

export default function RPN2() {
	const [stack, tape, _operate] = useCalcBrain();
	const [degRad, setDegRad] = useState(drEnum.rad);
	const [_entry, amendEntry] = useTyper();
	const entry = useMemo(() => trimFrontZeros(_entry), [_entry]);
	const stackItems = useTransition(stack, item => item.UID, {
		from: { transform: 'translate3d(0,40px,0)', opacity: 0 },
		enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
		leave: { transform: 'translate3d(0,40px,0)', opacity: 0 }
	});
	const operate = useCallback(
		(operation: almostOp): void => {
			if (
				operation.payload.type !== op.enter &&
				operation.payload.type !== op.drop &&
				operation.payload.type !== op.swap &&
				operation.payload.type !== op.roll &&
				toNumber(entry)
			) {
				_operate(enter(toNumber(entry)));
				amendEntry(press(npButt.clear));
			}
			if (operation.payload.type === op.drop && Boolean(entry)) {
				amendEntry(press(npButt.clear));
				return;
			}
			if (
				operation.payload.type === op.enter &&
				!Boolean(entry) &&
				stack.length > 0
			) {
				_operate(perform(op.enterLast));
				return;
			}
			_operate(operation);
		},
		[entry, _operate, amendEntry, stack.length]
	);
	return (
		<RPNContainer>
			<Row flexGrow={2} minHeight='270px' maxHeight='32.5vh'>
				<TapeAndStack>
					<Row>
						<Stack>
							{stackItems.map(
								({ item: { number, UID }, props: animatedStyles }, index) => (
									<StackItem
										key={UID}
										UID={UID}
										num={number}
										index={getIndex(index, stackItems.length)}
										animatedStyles={animatedStyles}
									/>
								)
							)}
						</Stack>
						<Tape>
							{tape.map(([operation, value], index) => (
								<>
									<TapeItem index={index}>{operation}</TapeItem>
									<TapeItem index={index} value>
										{value}
									</TapeItem>
								</>
							))}
						</Tape>
					</Row>
					<EnteringValue>{entry || '0'}</EnteringValue>
				</TapeAndStack>
			</Row>
			<Row>
				<Wrapper>
					<Group>
						<Row>
							<Danger onClick={() => operate(drop())}>Drop</Danger>
							<Danger onClick={() => amendEntry(press(npButt.backspace))}>
								<BackspaceIcon />
							</Danger>
						</Row>
						<Row>
							<StackOp onClick={() => operate(stash())} flexGrow={0}>
								Undo
							</StackOp>
							<StackOp onClick={() => operate(stash())} flexGrow={0}>
								Redo
							</StackOp>
						</Row>

						<Row>
							<StackOp onClick={() => operate(perform(op.roll))}>Roll</StackOp>
							<StackOp onClick={() => operate(perform(op.swap))}>Swap</StackOp>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.seven))}>7</Entry>
							<Entry onClick={() => amendEntry(press(npButt.eight))}>8</Entry>
							<Entry onClick={() => amendEntry(press(npButt.nine))}>9</Entry>
							<Operation2 onClick={() => operate(perform(op.add))}>
								<AddIcon />
							</Operation2>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.four))}>4</Entry>
							<Entry onClick={() => amendEntry(press(npButt.five))}>5</Entry>
							<Entry onClick={() => amendEntry(press(npButt.six))}>6</Entry>
							<Operation2 onClick={() => operate(perform(op.sub))}>
								<SubtractIcon />
							</Operation2>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.one))}>1</Entry>
							<Entry onClick={() => amendEntry(press(npButt.two))}>2</Entry>
							<Entry onClick={() => amendEntry(press(npButt.three))}>3</Entry>
							<Operation2 onClick={() => operate(perform(op.mul))}>
								<MultiplyIcon />
							</Operation2>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.dot))}>.</Entry>
							<Entry onClick={() => amendEntry(press(npButt.zero))}>0</Entry>
							<Entry onClick={() => amendEntry(press(npButt.pm))}>±</Entry>
							<Operation2 onClick={() => operate(perform(op.div))}>
								/
							</Operation2>
						</Row>
						<Row>
							<StackOp
								onClick={() => {
									operate(enter(getEntry(entry, stack)));
									amendEntry(press(npButt.clear));
								}}>
								enter
							</StackOp>
						</Row>
					</Group>

					<Group>
						<Row>
							<Danger onClick={() => operate(perform(op.clearAll))}>AC</Danger>
							<Danger onClick={() => amendEntry(press(npButt.clear))}>C</Danger>
						</Row>
						<Row>
							<Entry onClick={() => null}>C</Entry>
							<Entry onClick={() => null}>
								<FunctionsIcon />
							</Entry>
							<Operation2 onClick={() => toggleDegRad(degRad, setDegRad)}>
								{degRad}
							</Operation2>
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
							<Operation1 onClick={() => operate(perform(op.xInv))}>
								x<sup>-1</sup>
							</Operation1>
							<Operation1 onClick={() => operate(perform(op.sqrt))}>
								x<sup>½</sup>
							</Operation1>
							<Operation1 onClick={() => operate(perform(op.x2))}>
								x<sup>2</sup>
							</Operation1>
							<Operation1 onClick={() => operate(perform(op.xFact))}>
								x!
							</Operation1>
						</Row>
						<Row>
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
							<Operation1 onClick={() => operate(perform(op.ln))}>
								ln
							</Operation1>
						</Row>
					</Group>
				</Wrapper>
			</Row>
		</RPNContainer>
	);
}
