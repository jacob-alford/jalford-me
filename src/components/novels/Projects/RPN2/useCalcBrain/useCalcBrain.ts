import { useReducer, useMemo } from 'react';

import useNotify from 'components/bindings/hooks/useNotify';

import calcReducer, { defaultState } from './_reducer';
import getDerivedStackAndTape from './_derived';

export default function useCalcBrain() {
	const [calcHistory, mutateCalcHistory] = useReducer(
		calcReducer,
		defaultState
	);
	const notify = useNotify({
		alertType: 'error'
	});
	const [stack, tape] = useMemo(
		() => getDerivedStackAndTape(calcHistory.history, notify),
		[calcHistory.history, notify]
	);
	return [stack, tape, mutateCalcHistory];
}