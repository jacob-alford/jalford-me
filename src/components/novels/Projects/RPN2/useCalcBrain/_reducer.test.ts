import calcReducer, { historyActions, calculatorState } from './_reducer';
import { historyItem, op } from './operators/_types';

const neUID = (operation: { type: op; payload?: number }): historyItem => {
	const { type, payload } = operation;
	return {
		type,
		payload,
		UID: expect.any(String)
	};
};

describe('Calc-reducer properly manages state', () => {
	it('Pushes an action to state', () => {
		const testState: calculatorState = {
			history: [],
			stash: []
		};
		expect(
			calcReducer(testState, {
				type: historyActions.push,
				operation: neUID({ type: op.enter, payload: 69 })
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
			operation: neUID({ type: op.enter, payload: 69 })
		});
		testState = calcReducer(testState, {
			type: historyActions.push,
			operation: neUID({ type: op.sqrt })
		});
		testState = calcReducer(testState, {
			type: historyActions.stash
		});
		expect(testState).toMatchObject({
			history: [
				neUID({
					type: op.enter,
					payload: 69
				})
			],
			stash: [
				neUID({
					type: op.sqrt
				})
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
			operation: neUID({ type: op.enter, payload: 69 })
		});
		testState = calcReducer(testState, {
			type: historyActions.push,
			operation: neUID({ type: op.sqrt })
		});
		testState = calcReducer(testState, {
			type: historyActions.stash
		});
		testState = calcReducer(testState, {
			type: historyActions.pop
		});
		expect(testState).toMatchObject({
			history: [
				neUID({
					type: op.enter,
					payload: 69
				}),
				neUID({
					type: op.sqrt
				})
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
