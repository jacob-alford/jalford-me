import calcReducer, {
	reducerOperation,
	reducerOpEnum,
	reducerState
} from './reducer';
import { op, stackItem } from '../operators/_types';
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
			tapeHistory: [[['ENTER 5', '']]],
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
				[['ENTER 5', '']],
				[
					['ENTER 5', ''],
					['ENTER 10', '']
				],
				[
					['ENTER 5', ''],
					['ENTER 10', ''],
					['ENTER 15', '']
				]
			],
			stackStash: [],
			tapeStash: []
		});
	});
	it('Stashes a history action', () => {
		const testState: reducerState = {
			stackHistory: [[mkStkItm(5)]],
			tapeHistory: [[['ENTER 5', '']]],
			stackStash: [],
			tapeStash: []
		};
		expect(
			calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter))
		).toMatchObject({
			stackHistory: [],
			tapeHistory: [],
			stackStash: [[mkStkItm(5)]],
			tapeStash: [[['ENTER 5', '']]]
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
				[['ENTER 5', '']],
				[
					['ENTER 5', ''],
					['ENTER 10', '']
				],
				[
					['ENTER 5', ''],
					['ENTER 10', ''],
					['ENTER 15', '']
				]
			],
			stackStash: [],
			tapeStash: []
		};
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		testState = calcReducer(testState, mkOp(reducerOpEnum.stash, op.enter));
		expect(testState).toMatchObject({
			stackHistory: [[mkStkItm(5)]],
			tapeHistory: [[['ENTER 5', '']]],
			stackStash: [
				[mkStkItm(5), mkStkItm(10), mkStkItm(15)],
				[mkStkItm(5), mkStkItm(10)]
			],
			tapeStash: [
				[
					['ENTER 5', ''],
					['ENTER 10', ''],
					['ENTER 15', '']
				],
				[
					['ENTER 5', ''],
					['ENTER 10', '']
				]
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
			tapeHistory: [[['ENTER 5', '']]],
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
				[['ENTER 5', '']],
				[
					['ENTER 5', ''],
					['ENTER 10', '']
				]
			],
			stackStash: [],
			tapeStash: []
		});
	});
});
