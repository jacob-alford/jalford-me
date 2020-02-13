import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import last from 'lodash/last';

import { op } from './operators/_types';

const opCat = (arr: op[], item: any): op[] =>
	(item && concat(arr, item)) || arr;

enum historyActions {
	push = 'push',
	stash = 'stash',
	pop = 'pop'
}
type calculatorState = {
	history: op[];
	stash: op[];
};
type calculatorAction = (
	state: calculatorState,
	operation: op
) => calculatorState;

const calculatorActions: Record<historyActions, calculatorAction> = {
	[historyActions.push]: (
		state: calculatorState,
		operation: op
	): calculatorState => {
		const { history, stash } = state;
		return {
			history: concat(history, operation),
			stash
		};
	},
	[historyActions.stash]: (state: calculatorState): calculatorState => {
		const { history, stash } = state;
		return {
			history: dropRight(history),
			stash: opCat(stash, last(history))
		};
	},
	[historyActions.pop]: (state: calculatorState): calculatorState => {
		const { history, stash } = state;
		return {
			stash: dropRight(stash),
			history: opCat(history, last(stash))
		};
	}
};

export const defaultState: calculatorState = {
	history: [],
	stash: []
};

const calcReducer = (
	state: calculatorState,
	action: { type: historyActions; operation: op }
): calculatorState => {
	const { type, operation } = action;
	if (!calculatorActions[type])
		throw new Error(`Unknown calculator action, ${type}!`);
	return calculatorActions[type](state, operation);
};

export default calcReducer;
