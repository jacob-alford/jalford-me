import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTransition, animated as a } from 'react-spring';
import toNumber from 'lodash/toNumber';
import BackspaceIcon from '@material-ui/icons/Backspace';
import FunctionsIcon from '@material-ui/icons/Functions';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import MultiplyIcon from '@material-ui/icons/Clear';
import withPageFade from 'components/bindings/wrappers/withPageFade';

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
import useTyper from './useTyper/useTyper';
import useScrollToTopOnload from 'components/bindings/hooks/useScrollToTopOnload/';
import { npButt } from './useTyper/_types';
import { reducerOpEnum } from './useCalcBrain/reducer/reducer';
import { op } from './useCalcBrain/operators/_types';
import C from './words/constants';

import {
	enter,
	drop,
	press,
	perform,
	stash,
	pop,
	almostOp
} from './top-level-ops/topLevelOps';
import {
	toggleDegRad,
	getIndex,
	getEntry,
	typeHandlers,
	drEnum,
	trimFrontZeros
} from './utils';
import { RPNContainer, Wrapper } from './styles';
export { drEnum };

const Pi = () => <span dangerouslySetInnerHTML={{ __html: '&pi;' }} />;
const Mu = () => <span dangerouslySetInnerHTML={{ __html: '&mu;' }} />;
const Phi = () => <span dangerouslySetInnerHTML={{ __html: '&phi;' }} />;
const Sigma = () => <span dangerouslySetInnerHTML={{ __html: '&sigma;' }} />;
const Product = () => <span dangerouslySetInnerHTML={{ __html: '&Pi;' }} />;

const RPN2 = () => {
	const [degRad, setDegRad] = useState(drEnum.rad);
	const [constOpen, setConstOpen] = useState(false);
	const [funcOpen, setFuncOpen] = useState(false);
	const [stack, tape, _operate, canUndo, canRedo] = useCalcBrain(degRad);
	const [_entry, amendEntry] = useTyper();
	const entry = useMemo(() => trimFrontZeros(_entry), [_entry]);
	const stackItems = useTransition(stack, item => item.UID, {
		from: { transform: 'translate3d(0,40px,0)', opacity: 0 },
		enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
		leave: { transform: 'translate3d(0,40px,0)', opacity: 0 }
	});
	const tapeAnim = useTransition(tape, item => item[2], {
		from: {
			transform: 'translate3d(40px, 0px, 0)',
			opacity: 0
		},
		enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
		leave: { transform: 'translate3d(-40px,0,0)', opacity: 0 }
	});
	const operate = useCallback(
		(operation: almostOp): void => {
			if (operation.type !== reducerOpEnum.push) {
				_operate(operation);
				return;
			}
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
			if (operation.payload.type === op.enter && !Boolean(entry) && stack.length > 0) {
				_operate(perform(op.enterLast));
				return;
			}
			_operate(operation);
		},
		[entry, _operate, amendEntry, stack.length]
	);
	useEffect(() => {
		const handleKeydown = (evt: any) => {
			const { key } = evt;
			if (typeHandlers[key]) {
				typeHandlers[key](operate, amendEntry, entry, stack);
				evt.preventDefault();
			}
		};
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	}, [amendEntry, entry, operate, stack]);
	useScrollToTopOnload();
	const toggleConst = useCallback(() => {
		if (funcOpen) setFuncOpen(false);
		if (constOpen) setConstOpen(false);
		else setConstOpen(true);
	}, [setConstOpen, setFuncOpen, constOpen, funcOpen]);
	const toggleFunc = useCallback(() => {
		if (constOpen) setConstOpen(false);
		if (funcOpen) setFuncOpen(false);
		else setFuncOpen(true);
	}, [setConstOpen, setFuncOpen, constOpen, funcOpen]);
	return (
		<RPNContainer>
			<Row flexGrow={2}>
				<TapeAndStack>
					<Row>
						<Stack>
							{stackItems.map(({ item: { number, UID }, props: animatedStyles }, index) => (
								<StackItem
									key={UID}
									UID={UID}
									num={number}
									index={getIndex(index, stackItems.length)}
									animatedStyles={animatedStyles}
								/>
							))}
						</Stack>
						<Tape>
							{tapeAnim.map(
								({ item: [operation, value, UID], props: animatedStyles }, index) => {
									return (
										<a.div style={animatedStyles} key={UID}>
											<TapeItem index={index}>{operation}</TapeItem>
											<TapeItem index={index} value>
												{value}
											</TapeItem>
										</a.div>
									);
								}
							)}
						</Tape>
					</Row>
				</TapeAndStack>
			</Row>
			<Row>
				<EnteringValue>{entry || '0'}</EnteringValue>
			</Row>
			<Row>
				<Wrapper>
					<Group>
						{constOpen ? (
							<Row>
								<Operation1 onClick={() => operate(perform(op.speedOfLight))}>c</Operation1>
								<Operation1 onClick={() => operate(perform(op.pi))}>
									<Pi />
								</Operation1>
							</Row>
						) : null}
						{funcOpen ? (
							<Row>
								<Operation1 onClick={() => operate(perform(op.sum))}>
									<FunctionsIcon fontSize='inherit' />
									(...)
								</Operation1>
								<Operation1 onClick={() => operate(perform(op.product))}>
									<Product />
									(...)
								</Operation1>
							</Row>
						) : null}
						{!constOpen && !funcOpen ? (
							<Row>
								<StackOp onClick={() => operate(perform(op.roll))}>Roll</StackOp>
								<StackOp onClick={() => operate(perform(op.swap))}>Swap</StackOp>
							</Row>
						) : null}
						<Row>
							<Danger onClick={() => operate(perform(op.clearAll))}>AC</Danger>
							<Danger backgroundColor={C.blue(2)} onClick={() => operate(drop())}>
								Drop
							</Danger>
						</Row>
						<Row>
							<Danger
								backgroundColor={C.blue(1)}
								color='white'
								onClick={() => amendEntry(press(npButt.clear))}>
								C
							</Danger>
							<Danger
								backgroundColor={C.blue(1)}
								color='white'
								onClick={() => amendEntry(press(npButt.backspace))}>
								<BackspaceIcon fontSize='inherit' />
							</Danger>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.seven))}>7</Entry>
							<Entry onClick={() => amendEntry(press(npButt.eight))}>8</Entry>
							<Entry onClick={() => amendEntry(press(npButt.nine))}>9</Entry>
							<Operation2 onClick={() => operate(perform(op.add))}>
								<AddIcon fontSize='inherit' />
							</Operation2>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.four))}>4</Entry>
							<Entry onClick={() => amendEntry(press(npButt.five))}>5</Entry>
							<Entry onClick={() => amendEntry(press(npButt.six))}>6</Entry>
							<Operation2 onClick={() => operate(perform(op.sub))}>
								<SubtractIcon fontSize='inherit' />
							</Operation2>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.one))}>1</Entry>
							<Entry onClick={() => amendEntry(press(npButt.two))}>2</Entry>
							<Entry onClick={() => amendEntry(press(npButt.three))}>3</Entry>
							<Operation2 onClick={() => operate(perform(op.mul))}>
								<MultiplyIcon fontSize='inherit' />
							</Operation2>
						</Row>
						<Row>
							<Entry onClick={() => amendEntry(press(npButt.dot))}>.</Entry>
							<Entry onClick={() => amendEntry(press(npButt.zero))}>0</Entry>
							<Entry onClick={() => amendEntry(press(npButt.pm))}>±</Entry>
							<Operation2 onClick={() => operate(perform(op.div))}>/</Operation2>
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
						{constOpen ? (
							<Row>
								<Operation1 onClick={() => operate(perform(op.gldnRatio))}>
									<Phi />
								</Operation1>
								<Operation1 onClick={() => operate(perform(op.sqrt2))}>
									2<sup>½</sup>
								</Operation1>
							</Row>
						) : null}
						{funcOpen ? (
							<Row>
								<Operation1 onClick={() => operate(perform(op.mean))}>
									<Mu />
									(...)
								</Operation1>
								<Operation1 onClick={() => operate(perform(op.var))}>
									<Sigma />
									<sup>2</sup>(...)
								</Operation1>
							</Row>
						) : null}
						{!constOpen && !funcOpen ? (
							<Row>
								<StackOp disabled={!canUndo} onClick={() => operate(stash())} flexGrow={0}>
									Undo
								</StackOp>
								<StackOp disabled={!canRedo} onClick={() => operate(pop())} flexGrow={0}>
									Redo
								</StackOp>
							</Row>
						) : null}
						<Row>
							<Entry toggled={constOpen} onClick={toggleConst}>
								const
							</Entry>
							<Entry toggled={funcOpen} onClick={toggleFunc}>
								func
							</Entry>
							<Operation2 onClick={() => toggleDegRad(degRad, setDegRad)}>{degRad}</Operation2>
						</Row>
						<Row>
							<Operation1 onClick={() => operate(perform(op.sin))}>sin(x)</Operation1>
							<Operation1 onClick={() => operate(perform(op.cos))}>cos(x)</Operation1>
							<Operation1 onClick={() => operate(perform(op.tan))}>tan(x)</Operation1>
						</Row>
						<Row>
							<Operation1 onClick={() => operate(perform(op.asin))}>asin(x)</Operation1>
							<Operation1 onClick={() => operate(perform(op.acos))}>acos(x)</Operation1>
							<Operation1 onClick={() => operate(perform(op.atan))}>atan(x)</Operation1>
						</Row>
						<Row>
							<Operation1 onClick={() => operate(perform(op.xInv))}>
								<sup>1</sup>/<sub>x</sub>
							</Operation1>
							<Operation1 onClick={() => operate(perform(op.sqrt))}>
								x<sup>½</sup>
							</Operation1>
							<Operation1 onClick={() => operate(perform(op.x2))}>
								x<sup>2</sup>
							</Operation1>
							<Operation1 onClick={() => operate(perform(op.xFact))}>x!</Operation1>
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
							<Operation1 onClick={() => operate(perform(op.ln))}>ln</Operation1>
						</Row>
					</Group>
				</Wrapper>
			</Row>
		</RPNContainer>
	);
};

export default withPageFade(RPN2);
