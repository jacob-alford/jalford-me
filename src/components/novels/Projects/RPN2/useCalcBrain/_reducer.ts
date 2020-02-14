import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import last from 'lodash/last';

import { historyItem } from './operators/_types';

export const opCat = (arr: historyItem[], item: any): historyItem[] =>
	(item && concat(arr, item)) || arr;

export enum historyActions {
	push = 'push',
	stash = 'stash',
	pop = 'pop'
}
export type calculatorState = {
	history: historyItem[];
	stash: historyItem[];
};
type calculatorAction = (
	state: calculatorState,
	operation?: historyItem
) => calculatorState;

const calculatorActions: Record<historyActions, calculatorAction> = {
	[historyActions.push]: (
		state: calculatorState,
		operation?: historyItem
	): calculatorState => {
		const { history, stash } = state;
		if (!operation)
			throw new Error('Unable to push to history without operation!');
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
	action: { type: historyActions; operation?: historyItem }
): calculatorState => {
	const { type, operation } = action;
	if (!calculatorActions[type])
		throw new Error(`Unknown calculator action, ${type}!`);
	return calculatorActions[type](state, operation);
};

export default calcReducer;
