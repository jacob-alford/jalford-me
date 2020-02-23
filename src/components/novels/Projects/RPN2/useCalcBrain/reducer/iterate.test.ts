import { getRandomUID } from 'functions';

import { drEnum } from '../../RPN2';
import { op } from '../operators/_types';
import getSAndT from './iterate';
import { reducerOperation, reducerOpEnum } from './reducer';

const notify = jest.fn();
const mkSkItm = (number: number) => ({
	UID: expect.any(String),
	number
});
const mkOp = (item: op): reducerOperation => ({
	type: reducerOpEnum.push,
	payload: {
		type: item,
		UID: getRandomUID(),
		notify
	}
});

describe('Successive calculator states derive successfully.', () => {
	it('Pushes a value to history', () => {
		const operation: reducerOperation = {
			type: reducerOpEnum.push,
			payload: {
				type: op.enter,
				UID: getRandomUID(),
				number: 69,
				notify
			}
		};
		expect(getSAndT(operation, [], [])).toStrictEqual([
			[mkSkItm(69)],
			[['ENTER 69', '']]
		]);
	});
	it('Performs arithmetic', () => {
		expect(
			getSAndT(
				mkOp(op.add),
				[mkSkItm(69), mkSkItm(420)],
				[
					['ENTER 69', ''],
					['ENTER 420', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(489)],
			[
				['ENTER 69', ''],
				['ENTER 420', ''],
				['69 + 420', '489']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.sub),
				[mkSkItm(69), mkSkItm(420)],
				[
					['ENTER 69', ''],
					['ENTER 420', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(-351)],
			[
				['ENTER 69', ''],
				['ENTER 420', ''],
				['69 - 420', '-351']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.mul),
				[mkSkItm(69), mkSkItm(420)],
				[
					['ENTER 69', ''],
					['ENTER 420', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(28980)],
			[
				['ENTER 69', ''],
				['ENTER 420', ''],
				['69 * 420', '29,000']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.div),
				[mkSkItm(69), mkSkItm(420)],
				[
					['ENTER 69', ''],
					['ENTER 420', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(69 / 420)],
			[
				['ENTER 69', ''],
				['ENTER 420', ''],
				['69 / 420', '0.164']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.mod),
				[mkSkItm(5), mkSkItm(21)],
				[
					['ENTER 5', ''],
					['ENTER 21', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(1)],
			[
				['ENTER 5', ''],
				['ENTER 21', ''],
				['mod(21, 5)', '1']
			]
		]);
	});
	it('Manipulates the stack', () => {
		expect(
			getSAndT(mkOp(op.enterLast), [mkSkItm(69)], [['ENTER 69', '']])
		).toStrictEqual([
			[mkSkItm(69), mkSkItm(69)],
			[
				['ENTER 69', ''],
				['ENTER 69', '']
			]
		]);
		expect(
			getSAndT(mkOp(op.drop), [mkSkItm(69)], [['ENTER 69', '']])
		).toStrictEqual([
			[],
			[
				['ENTER 69', ''],
				['DROP 69', '']
			]
		]);
		expect(
			getSAndT(mkOp(op.clearAll), [mkSkItm(69)], [['ENTER 69', '']])
		).toStrictEqual([
			[],
			[
				['ENTER 69', ''],
				['CLEAR ALL', '']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.swap),
				[mkSkItm(69), mkSkItm(420)],
				[
					['ENTER 69', ''],
					['ENTER 420', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(420), mkSkItm(69)],
			[
				['ENTER 69', ''],
				['ENTER 420', ''],
				['SWAP', '69, 420']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.roll),
				[mkSkItm(69), mkSkItm(420), mkSkItm(91395)],
				[
					['ENTER 69', ''],
					['ENTER 420', ''],
					['ENTER 91395', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(91395), mkSkItm(69), mkSkItm(420)],
			[
				['ENTER 69', ''],
				['ENTER 420', ''],
				['ENTER 91395', ''],
				['ROLL', '']
			]
		]);
	});
	it('Performs Trig Functions', () => {
		const trigNotify = jest.fn();
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.sin,
						UID: getRandomUID(),
						notify: trigNotify,
						degOrRad: drEnum.deg
					}
				},
				[mkSkItm(90)],
				[['ENTER 90', '']]
			)
		).toStrictEqual([
			[mkSkItm(1)],
			[
				['ENTER 90', ''],
				['sin(90)', '1']
			]
		]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.sin,
						UID: getRandomUID(),
						notify: trigNotify,
						degOrRad: drEnum.rad
					}
				},
				[mkSkItm(Math.PI / 2)],
				[['ENTER 1.57', '']]
			)
		).toStrictEqual([
			[mkSkItm(1)],
			[
				['ENTER 1.57', ''],
				['sin(1.57)', '1']
			]
		]);
	});
	it('Performs Safe-Single Operations', () => {
		expect(
			getSAndT(mkOp(op.x2), [mkSkItm(9)], [['ENTER 9', '']])
		).toStrictEqual([
			[mkSkItm(81)],
			[
				['ENTER 9', ''],
				['x2(9)', '81']
			]
		]);
		expect(
			getSAndT(mkOp(op.eX), [mkSkItm(1)], [['ENTER 1', '']])
		).toStrictEqual([
			[mkSkItm(Math.E)],
			[
				['ENTER 1', ''],
				['eX(1)', '2.72']
			]
		]);
		expect(
			getSAndT(mkOp(op.twoX), [mkSkItm(-1)], [['ENTER -1', '']])
		).toStrictEqual([
			[mkSkItm(0.5)],
			[
				['ENTER -1', ''],
				['twoX(-1)', '0.5']
			]
		]);
		expect(
			getSAndT(mkOp(op.tenX), [mkSkItm(2)], [['ENTER 2', '']])
		).toStrictEqual([
			[mkSkItm(100)],
			[
				['ENTER 2', ''],
				['tenX(2)', '100']
			]
		]);
	});
	it('Notifies with inverse trig error', () => {
		const testNotify = jest.fn();
		getSAndT(
			{
				type: reducerOpEnum.push,
				payload: {
					type: op.asin,
					UID: getRandomUID(),
					notify: testNotify
				}
			},
			[mkSkItm(2)],
			[['ENTER 2', '']]
		);
		expect(testNotify).toHaveBeenCalledWith({
			body: 'Inverse sine only defined for values between zero and one!'
		});
	});
	it('Performs unsafe-single ops', () => {
		const testNotify = jest.fn();
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.asin,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(2)],
				[['ENTER 2', '']]
			)
		).toStrictEqual([[mkSkItm(2)], [['ENTER 2', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.ln,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(-1)],
				[['ENTER -1', '']]
			)
		).toStrictEqual([[mkSkItm(-1)], [['ENTER -1', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.acos,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(2)],
				[['ENTER 2', '']]
			)
		).toStrictEqual([[mkSkItm(2)], [['ENTER 2', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.log10,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(-1)],
				[['ENTER -1', '']]
			)
		).toStrictEqual([[mkSkItm(-1)], [['ENTER -1', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.log2,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(-69)],
				[['ENTER -69', '']]
			)
		).toStrictEqual([[mkSkItm(-69)], [['ENTER -69', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.sqrt,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(-81)],
				[['ENTER -81', '']]
			)
		).toStrictEqual([[mkSkItm(-81)], [['ENTER -81', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.xInv,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(0)],
				[['ENTER 0', '']]
			)
		).toStrictEqual([[mkSkItm(0)], [['ENTER 0', '']]]);
		expect(
			getSAndT(
				{
					type: reducerOpEnum.push,
					payload: {
						type: op.xFact,
						UID: getRandomUID(),
						notify: testNotify
					}
				},
				[mkSkItm(420)],
				[['ENTER 420', '']]
			)
		).toStrictEqual([[mkSkItm(420)], [['ENTER 420', '']]]);
	});
	it('Calculates factorial', () => {
		expect(
			getSAndT(mkOp(op.xFact), [mkSkItm(5)], [['ENTER 5', '']])
		).toStrictEqual([
			[mkSkItm(120)],
			[
				['ENTER 5', ''],
				['5!', '120']
			]
		]);
	});
	it('Refuses factorial', () => {
		const testNotify = jest.fn();
		getSAndT(
			{
				type: reducerOpEnum.push,
				payload: {
					type: op.xFact,
					UID: getRandomUID(),
					notify: testNotify
				}
			},
			[mkSkItm(420)],
			[['ENTER 420', '']]
		);
		expect(testNotify).toHaveBeenCalledWith({
			body:
				'Cannot calculate factorial of integers greater than 170 with 10^53 significant digits!'
		});
	});
	it('Performs Reduction', () => {
		expect(
			getSAndT(
				mkOp(op.sum),
				[mkSkItm(1), mkSkItm(2), mkSkItm(3)],
				[
					['ENTER 1', ''],
					['ENTER 2', ''],
					['ENTER 3', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(6)],
			[
				['ENTER 1', ''],
				['ENTER 2', ''],
				['ENTER 3', ''],
				['sum(1,2,3)', '6']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.product),
				[mkSkItm(1), mkSkItm(4), mkSkItm(3)],
				[
					['ENTER 1', ''],
					['ENTER 4', ''],
					['ENTER 3', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(12)],
			[
				['ENTER 1', ''],
				['ENTER 4', ''],
				['ENTER 3', ''],
				['product(1,4,3)', '12']
			]
		]);
		expect(
			getSAndT(
				mkOp(op.mean),
				[mkSkItm(5), mkSkItm(11), mkSkItm(20)],
				[
					['ENTER 5', ''],
					['ENTER 11', ''],
					['ENTER 20', '']
				]
			)
		).toStrictEqual([
			[mkSkItm(12)],
			[
				['ENTER 5', ''],
				['ENTER 11', ''],
				['ENTER 20', ''],
				['mean(5,11,20)', '12']
			]
		]);
	});
});
