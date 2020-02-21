import { useReducer, useMemo } from 'react';

import useNotify from 'components/bindings/hooks/useNotify';

import calcReducer, { defaultState } from './_reducer';
import { tapeItem, stackItem } from './operators/_types';
import getDerivedStackAndTape from './_derived';

export default function useCalcBrain(alertUIDCache: {
	current: { [key: string]: boolean };
}): [stackItem[], tapeItem[], any] {
	const [calcHistory, mutateCalcHistory] = useReducer(
		calcReducer,
		defaultState
	);
	const notify = useNotify({
		alertType: 'error',
		timeout: Infinity
	});
	const [stack, tape] = useMemo(
		() =>
			getDerivedStackAndTape(
				calcHistory.history,
				alertUIDCache.current,
				notify
			),
		[calcHistory.history, notify, alertUIDCache]
	);
	return [stack, tape, mutateCalcHistory];
}
