import { historyActions } from '../useCalcBrain/_reducer';
import { historyItem, op } from '../useCalcBrain/operators/_types';

export const enter = (
	payload: number
): { type: historyActions; operation: historyItem } => ({
	type: historyActions.push,
	operation: {
		type: op.enter,
		payload
	}
});
export const drop = (): { type: historyActions; operation: historyItem } => ({
	type: historyActions.push,
	operation: {
		type: op.drop
	}
});
