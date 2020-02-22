import getSAndT from './_derived';
import { getRandomUID } from 'functions';

import { historyItem, op, stackItem } from './operators/_types';

const notify = jest.fn();
const emptySAndT = [[], []];
const alertCache: { [key: string]: boolean } = {};

const mkStkItm = (number: number): stackItem => ({
	number,
	UID: expect.any(String)
});

describe('Calculator functions operate properly', () => {
	it('Returns empty array given empty history', () => {
		const history: historyItem[] = [];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual(emptySAndT);
	});
	it('Pushes a value', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 69,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(69)],
			[['ENTER 69', '']]
		]);
	});
	it('Pushes multiple values', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 69,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 420,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(69), mkStkItm(420)],
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
				payload: 69,
				UID: getRandomUID()
			},
			{
				type: op.drop,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
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
				payload: 3,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 6,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 9,
				UID: getRandomUID()
			},
			{
				type: op.roll,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(9), mkStkItm(3), mkStkItm(6)],
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
				payload: 3,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 6,
				UID: getRandomUID()
			},
			{
				type: op.swap,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(6), mkStkItm(3)],
			[
				['ENTER 3', ''],
				['ENTER 6', ''],
				['SWAP', '3, 6']
			]
		]);
	});
	it('Clears All', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 420,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 69,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 42069,
				UID: getRandomUID()
			},
			{
				type: op.clearAll,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[],
			[
				['ENTER 420', ''],
				['ENTER 69', ''],
				['ENTER 42,100', ''],
				['CLEAR ALL', '']
			]
		]);
	});
	it('Notifies an error for too few args', () => {
		const history: historyItem[] = [
			{
				type: op.ln,
				UID: getRandomUID()
			}
		];
		const testNotify = jest.fn();
		getSAndT(history, alertCache, testNotify);
		expect(testNotify).toHaveBeenCalledWith({
			body: 'Unable to perform ln on stack with length of 0!'
		});
	});
	it('Notifies an error for erroneous value', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: -69,
				UID: getRandomUID()
			},
			{
				type: op.acos,
				UID: getRandomUID()
			}
		];
		const testNotify = jest.fn();
		getSAndT(history, alertCache, testNotify);
		expect(testNotify).toHaveBeenCalledWith({
			body: 'Inverse cosine only defined for values between zero and one!'
		});
	});
	it('Performs arithmetic (double)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: -69,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 420,
				UID: getRandomUID()
			},
			{
				type: op.div,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(-69 / 420)],
			[
				['ENTER -69', ''],
				['ENTER 420', ''],
				['-69/420', '-0.164']
			]
		]);
	});
	it('Naturally Logates (single)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: Math.E,
				UID: getRandomUID()
			},
			{
				type: op.ln,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(1)],
			[
				['ENTER 2.72', ''],
				['ln(2.72)', '1']
			]
		]);
	});
	it('Calculates the mean (reduce)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 15,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 25,
				UID: getRandomUID()
			},
			{
				type: op.enter,
				payload: 32,
				UID: getRandomUID()
			},
			{
				type: op.mean,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(24)],
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
				payload: 15,
				UID: getRandomUID()
			},
			{
				type: op.xFact,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(1307674368000)],
			[
				['ENTER 15', ''],
				['15!', '1,310,000,000,000']
			]
		]);
	});
	it('Refuses a factorial (reduce)', () => {
		const history: historyItem[] = [
			{
				type: op.enter,
				payload: 420,
				UID: getRandomUID()
			},
			{
				type: op.xFact,
				UID: getRandomUID()
			}
		];
		const testNotify = jest.fn();
		expect(getSAndT(history, alertCache, testNotify)).toStrictEqual([
			[mkStkItm(420)],
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
				type: op.pi,
				UID: getRandomUID()
			}
		];
		expect(getSAndT(history, alertCache, notify)).toStrictEqual([
			[mkStkItm(Math.PI)],
			[['pi', '3.14']]
		]);
	});
});
