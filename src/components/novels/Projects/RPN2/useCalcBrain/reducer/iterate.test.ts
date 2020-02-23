import { getRandomUID } from 'functions';

import { op } from '../operators/_types';
import getSAndT from './iterate';
import { reducerOperation, reducerOpEnum } from './reducer';

const notify = jest.fn();
const mkSkItm = (number: number) => ({
	UID: expect.any(String),
	number
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
});
