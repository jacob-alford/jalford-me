import getSAndT from './_derived';

import { historyItem, op } from './operators/_types';

const notify = jest.fn();
const emptySAndT = [[], []];

describe('Calculator functions operate properly', () => {
	it('Returns empty array given empty history', () => {
		const history: historyItem[] = [];
		expect(getSAndT(history, notify)).toStrictEqual(emptySAndT);
	});
	it('Pushes a value', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 69
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([[69], [['ENTER 69', '']]]);
	});
	it('Pushes multiple values', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 69
			},
			{
				type: op.enter,
				payload: 420
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[69, 420],
			[
				['ENTER 69', ''],
				['ENTER 420', '']
			]
		]);
	});
	it('Drops a value', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 69
			},
			{
				type: op.drop
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[],
			[
				['ENTER 69', ''],
				['DROP 69', '']
			]
		]);
	});
	it('Rolls the stack', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 3
			},
			{
				type: op.enter,
				payload: 6
			},
			{
				type: op.enter,
				payload: 9
			},
			{
				type: op.roll
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[9, 3, 6],
			[
				['ENTER 3', ''],
				['ENTER 6', ''],
				['ENTER 9', ''],
				['ROLL', '']
			]
		]);
	});
	it('Swaps the stack', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 3
			},
			{
				type: op.enter,
				payload: 6
			},
			{
				type: op.swap
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[6, 3],
			[
				['ENTER 3', ''],
				['ENTER 6', ''],
				['SWAP 3, 6', '']
			]
		]);
	});
	it('Clears All', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 420
			},
			{
				type: op.enter,
				payload: 69
			},
			{
				type: op.enter,
				payload: 42069
			},
			{
				type: op.clearAll
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[],
			[
				['ENTER 420', ''],
				['ENTER 69', ''],
				['ENTER 42069', ''],
				['CLEAR ALL', '']
			]
		]);
	});
	it('Notifies an error for too few args', () => {
		const history: historyItem[] = [{ type: op.ln }];
		const testNotify = jest.fn();
		getSAndT(history, testNotify);
		expect(testNotify).toHaveBeenCalledWith({
			body: 'Unable to perform ln on stack with length of 0!'
		});
	});
	it('Notifies an error for erroneous value', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: -69
			},
			{
				type: op.acos
			}
		];
		const testNotify = jest.fn();
		getSAndT(history, testNotify);
		expect(testNotify).toHaveBeenCalledWith({
			body: 'Inverse cosine only defined for values between zero and one!'
		});
	});
	it('Performs arithmetic (double)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: -69
			},
			{
				type: op.enter,
				payload: 420
			},
			{ type: op.div }
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[-69 / 420],
			[
				['ENTER -69', ''],
				['ENTER 420', ''],
				['-69/420', '-0.16428571428571428']
			]
		]);
	});
	it('Naturally Logates (single)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: Math.E
			},
			{ type: op.ln }
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[1],
			[
				['ENTER 2.718281828459045', ''],
				['ln(2.718281828459045)', '1']
			]
		]);
	});
	it('Calculates the mean (reduce)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 15
			},
			{
				type: op.enter,
				payload: 25
			},
			{
				type: op.enter,
				payload: 32
			},
			{ type: op.mean }
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[24],
			[
				['ENTER 15', ''],
				['ENTER 25', ''],
				['ENTER 32', ''],
				['mean(15,25,32)', '24']
			]
		]);
	});
	it('Calculates a factorial (reduce)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 15
			},
			{ type: op.xFact }
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[1307674368000],
			[
				['ENTER 15', ''],
				['15!', '1307674368000']
			]
		]);
	});
	it('Refuses a factorial (reduce)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 420
			},
			{ type: op.xFact }
		];
		const testNotify = jest.fn();
		expect(getSAndT(history, testNotify)).toStrictEqual([
			[420],
			[['ENTER 420', '']]
		]);
		expect(testNotify).toHaveBeenCalledWith({
			body:
				'Cannot calculate factorial of integers greater than 170 with 10^53 significant digits!'
		});
	});
	it('Spits out a constant (constant)', () => {
		const history: historyItem[] = [
			{
				type: op.pi
			}
		];
		expect(getSAndT(history, notify)).toStrictEqual([
			[Math.PI],
			[['pi', '3.141592653589793']]
		]);
	});
});
