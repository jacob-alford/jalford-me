import calcReducer, { historyActions, calculatorState } from './_reducer';
import { historyItem, op } from './operators/_types';

describe('Calc-reducer properly manages state', () => {
	it('Pushes an action to state', () => {
		const testState: calculatorState = {
			history: [],
			stash: []
		};
		expect(
			calcReducer(testState, {
				type: historyActions.push,
				operation: { type: op.enter, payload: 69 }
			})
		).toMatchObject({
			history: [
				{
					type: op.enter,
					payload: 69
				}
			],
			stash: []
		});
	});
	it('Pushes multiple items, and stashes properly', () => {
		let testState: calculatorState = {
			history: [],
			stash: []
		};
		testState = calcReducer(testState, {
			type: historyActions.push,
			operation: { type: op.enter, payload: 69 }
		});
		testState = calcReducer(testState, {
			type: historyActions.push,
			operation: { type: op.sqrt }
		});
		testState = calcReducer(testState, {
			type: historyActions.stash
		});
		expect(testState).toMatchObject({
			history: [
				{
					type: op.enter,
					payload: 69
				}
			],
			stash: [
				{
					type: op.sqrt
				}
			]
		});
	});
	it('Pushes multiple items, stashes, and pops properly', () => {
		let testState: calculatorState = {
			history: [],
			stash: []
		};
		testState = calcReducer(testState, {
			type: historyActions.push,
			operation: { type: op.enter, payload: 69 }
		});
		testState = calcReducer(testState, {
			type: historyActions.push,
			operation: { type: op.sqrt }
		});
		testState = calcReducer(testState, {
			type: historyActions.stash
		});
		testState = calcReducer(testState, {
			type: historyActions.pop
		});
		expect(testState).toMatchObject({
			history: [
				{
					type: op.enter,
					payload: 69
				},
				{
					type: op.sqrt
				}
			],
			stash: []
		});
	});
	it('Throws an error when pushing without operation', () => {
		let testState: calculatorState = {
			history: [],
			stash: []
		};
		expect(() =>
			calcReducer(testState, {
				type: historyActions.push
			})
		).toThrow('Unable to push to history without operation!');
	});
});
