import calcReducer, {
	reducerOperation,
	reducerOpEnum,
	reducerState
} from './reducer';
import { op, stackItem, tapeItem } from '../operators/_types';
import { getRandomUID } from 'functions';

const notify = jest.fn();

const mkOp = (
	histType: reducerOpEnum,
	payloadType: op,
	payload?: number
): reducerOperation => ({
	type: histType,
	payload: {
		type: payloadType,
		UID: getRandomUID(),
		number: payload,
		notify
	}
});

const mkStkItm = (number: number): stackItem => ({
	UID: expect.any(String),
	number
});

const mkTpItm = (arr: [string, string]): tapeItem => [
	arr[0],
	arr[1],
	expect.any(String)
];

describe('Calc-reducer properly manages state', () => {
	it('Pushes an action to state', () => {
		const testState: reducerState = {
			stackHistory: [],
			tapeHistory: [],
			stackStash: [],
			tapeStash: []
		};
		expect(
			calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 5))
		).toMatchObject({
			stackHistory: [[mkStkItm(5)]],
			tapeHistory: [[mkTpItm(['ENTER 5', ''])]],
			stackStash: [],
			tapeStash: []
		});
	});
	it('Pushes multiple actions to state', () => {
		let testState: reducerState = {
			stackHistory: [],
			tapeHistory: [],
			stackStash: [],
			tapeStash: []
		};
		testState = calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 5));
		testState = calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 10));
		testState = calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 15));
		expect(testState).toMatchObject({
			stackHistory: [
				[mkStkItm(5)],
				[mkStkItm(5), mkStkItm(10)],
				[mkStkItm(5), mkStkItm(10), mkStkItm(15)]
			],
			tapeHistory: [
				[mkTpItm(['ENTER 5', ''])],
				[mkTpItm(['ENTER 10', '']), mkTpItm(['ENTER 5', ''])],
				[
					mkTpItm(['ENTER 15', '']),
					mkTpItm(['ENTER 10', '']),
					mkTpItm(['ENTER 5', ''])
				]
			],
			stackStash: [],
			tapeStash: []
		});
	});
	it('Stashes a history action', () => {
		const testState: reducerState = {
			stackHistory: [[mkStkItm(5)]],
			tapeHistory: [[mkTpItm(['ENTER 5', ''])]],
			stackStash: [],
			tapeStash: []
		};
		expect(
			calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter))
		).toMatchObject({
			stackHistory: [],
			tapeHistory: [],
			stackStash: [[mkStkItm(5)]],
			tapeStash: [[mkTpItm(['ENTER 5', ''])]]
		});
	});
	it('Stashes multiple actions', () => {
		let testState: reducerState = {
			stackHistory: [
				[mkStkItm(5)],
				[mkStkItm(5), mkStkItm(10)],
				[mkStkItm(5), mkStkItm(10), mkStkItm(15)]
			],
			tapeHistory: [
				[mkTpItm(['ENTER 5', ''])],
				[mkTpItm(['ENTER 5', '']), mkTpItm(['ENTER 10', ''])],
				[
					mkTpItm(['ENTER 5', '']),
					mkTpItm(['ENTER 10', '']),
					mkTpItm(['ENTER 15', ''])
				]
			],
			stackStash: [],
			tapeStash: []
		};
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		expect(testState).toMatchObject({
			stackHistory: [[mkStkItm(5)]],
			tapeHistory: [[mkTpItm(['ENTER 5', ''])]],
			stackStash: [
				[mkStkItm(5), mkStkItm(10), mkStkItm(15)],
				[mkStkItm(5), mkStkItm(10)]
			],
			tapeStash: [
				[
					mkTpItm(['ENTER 5', '']),
					mkTpItm(['ENTER 10', '']),
					mkTpItm(['ENTER 15', ''])
				],
				[mkTpItm(['ENTER 5', '']), mkTpItm(['ENTER 10', ''])]
			]
		});
	});
	it('Pops an action', () => {
		let testState: reducerState = {
			stackHistory: [],
			tapeHistory: [],
			stackStash: [],
			tapeStash: []
		};
		testState = calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 5));
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		testState = calcReducer(testState, mkOp(reducerOpEnum.pop, op.enter));
		expect(testState).toMatchObject({
			stackHistory: [[mkStkItm(5)]],
			tapeHistory: [[mkTpItm(['ENTER 5', ''])]],
			stackStash: [],
			tapeStash: []
		});
	});
	it('Pops multiple actions', () => {
		let testState: reducerState = {
			stackHistory: [],
			tapeHistory: [],
			stackStash: [],
			tapeStash: []
		};
		testState = calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 5));
		testState = calcReducer(testState, mkOp(reducerOpEnum.push, op.enter, 10));
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		testState = calcReducer(testState, mkOp(reducerOpEnum.pop, op.enter));
		testState = calcReducer(testState, mkOp(reducerOpEnum.pop, op.enter));
		expect(testState).toMatchObject({
			stackHistory: [[mkStkItm(5)], [mkStkItm(5), mkStkItm(10)]],
			tapeHistory: [
				[mkTpItm(['ENTER 5', ''])],
				[mkTpItm(['ENTER 10', '']), mkTpItm(['ENTER 5', ''])]
			],
			stackStash: [],
			tapeStash: []
		});
	});
});
