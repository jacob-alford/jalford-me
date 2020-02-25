import { useReducer, useCallback } from 'react';

import useNotify from 'components/bindings/hooks/useNotify';
import { op } from './operators/_types';
import calcReducer, {
	defaultState,
	reducerOpEnum,
	getLastStack,
	getLastTape
} from './reducer/reducer';
import { tapeItem, stackItem } from './operators/_types';
import { getRandomUID } from 'functions';

type almostOperation = {
	type: reducerOpEnum;
	payload: {
		type: op;
		UID: string;
		number?: number;
	};
};

export default function useCalcBrain(): [
	stackItem[],
	tapeItem[],
	any,
	boolean,
	boolean
] {
	const [calcState, _mutateCalcHistory] = useReducer(calcReducer, defaultState);
	const notify = useNotify({
		alertType: 'error',
		timeout: Infinity
	});
	const mutateCalcHistory = useCallback(
		(operation: almostOperation): void => {
			if (
				operation.type === reducerOpEnum.push &&
				calcState.stackStash.length > 0
			)
				_mutateCalcHistory({
					type: reducerOpEnum.clearStash,
					payload: {
						type: op.enter,
						UID: getRandomUID(),
						notify
					}
				});
			_mutateCalcHistory({
				type: operation.type,
				payload: {
					...operation.payload,
					notify
				}
			});
		},
		[notify, calcState.stackStash.length]
	);
	return [
		getLastStack(calcState.stackHistory),
		getLastTape(calcState.tapeHistory),
		mutateCalcHistory,
		calcState.stackHistory.length > 0,
		calcState.stackStash.length > 0
	];
}
