import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';

import {
	op,
	stackHistory,
	tapeHistory,
	stackHistoryItem,
	tapeHistoryItem
} from '../operators/_types';
import getNextStackAndTape from './iterate';

export enum reducerOpEnum {
	push = 'push',
	stash = 'stash',
	pop = 'pop'
}
export type reducerOperation = {
	type: reducerOpEnum;
	payload: {
		type: op;
		UID: string;
		number?: number;
		notify: (config: { body: string }) => void;
	};
};
export type reducerState = {
	stackHistory: stackHistory;
	tapeHistory: tapeHistory;
	stackStash: stackHistory;
	tapeStash: tapeHistory;
};
type reducerAction = (
	state: reducerState,
	operation: reducerOperation
) => reducerState;

const toState = (
	stackHistory: stackHistory,
	tapeHistory: tapeHistory,
	stackStash: stackHistory,
	tapeStash: tapeHistory,
	stackItem?: stackHistoryItem,
	tapeItem?: tapeHistoryItem
): reducerState => ({
	stackHistory: (stackItem && concat(stackHistory, stackItem)) || stackHistory,
	tapeHistory: (tapeItem && concat(tapeHistory, tapeItem)) || tapeHistory,
	stackStash,
	tapeStash
});

export const getLast = (arr: any[]): any => arr[arr.length - 1];

const calcActions: Record<reducerOpEnum, reducerAction> = {
	[reducerOpEnum.push]: (
		state: reducerState,
		operation: reducerOperation
	): reducerState => {
		const { stackHistory, tapeHistory, stackStash, tapeStash } = state;
		const [nextStackItem, nextTapeItem] = getNextStackAndTape(
			operation,
			getLast(stackHistory),
			getLast(tapeHistory)
		);
		return toState(
			stackHistory,
			tapeHistory,
			stackStash,
			tapeStash,
			nextStackItem,
			nextTapeItem
		);
	},
	[reducerOpEnum.stash]: (state: reducerState): reducerState => {
		const { stackHistory, tapeHistory, stackStash, tapeStash } = state;
		return toState(
			dropRight(stackHistory),
			dropRight(tapeHistory),
			concat(stackStash, getLast(stackHistory)),
			concat(tapeStash, getLast(tapeHistory))
		);
	},
	[reducerOpEnum.pop]: (state: reducerState): reducerState => {
		const { stackHistory, tapeHistory, stackStash, tapeStash } = state;
		return toState(
			concat(stackHistory, getLast(stackStash)),
			concat(tapeHistory, getLast(tapeStash)),
			dropRight(stackStash),
			dropRight(tapeStash)
		);
	}
};

export const defaultState: reducerState = {
	stackHistory: [],
	tapeHistory: [],
	stackStash: [],
	tapeStash: []
};

const calcReducer = (
	state: reducerState,
	operation: reducerOperation
): reducerState => {
	const { type } = operation;
	if (!calcActions[type]) throw new Error(`Unknown reducer action, ${type}!`);
	return calcActions[type](state, operation);
};

export default calcReducer;
