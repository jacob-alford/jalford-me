import { historyActions } from '../useCalcBrain/_reducer';
import { historyItem, op } from '../useCalcBrain/operators/_types';
import { npButt } from '../useTyper/_types';
import { getRandomUID } from 'functions';

export const press = (op: npButt) => ({ type: op });

export const perform = (
	op: op,
	payload?: number
): { type: historyActions; operation: historyItem } => ({
	type: historyActions.push,
	operation: {
		type: op,
		payload,
		UID: getRandomUID()
	}
});

export const enter = (
	payload: number
): { type: historyActions; operation: historyItem } => ({
	type: historyActions.push,
	operation: {
		type: op.enter,
		payload,
		UID: getRandomUID()
	}
});
export const drop = (): { type: historyActions; operation: historyItem } => ({
	type: historyActions.push,
	operation: {
		type: op.drop,
		UID: getRandomUID()
	}
});
