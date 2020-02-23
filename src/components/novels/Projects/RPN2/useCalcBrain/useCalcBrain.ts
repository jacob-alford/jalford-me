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

type almostOperation = {
	type: reducerOpEnum;
	payload: {
		type: op;
		UID: string;
		number?: number;
	};
};

export default function useCalcBrain(): [stackItem[], tapeItem[], any] {
	const [calcState, _mutateCalcHistory] = useReducer(calcReducer, defaultState);
	const notify = useNotify({
		alertType: 'error',
		timeout: Infinity
	});
	const mutateCalcHistory = useCallback(
		(operation: almostOperation): void =>
			_mutateCalcHistory({
				type: operation.type,
				payload: {
					...operation.payload,
					notify
				}
			}),
		[notify]
	);
	return [
		getLastStack(calcState.stackHistory),
		getLastTape(calcState.tapeHistory),
		mutateCalcHistory
	];
}
