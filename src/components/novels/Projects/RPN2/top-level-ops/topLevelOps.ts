import { reducerOpEnum } from '../useCalcBrain/reducer/reducer';
import { drEnum } from '../RPN2';
import { stackHistoryItem, op } from '../useCalcBrain/operators/_types';
import { npButt } from '../useTyper/_types';
import { getRandomUID } from 'functions';

export type almostOp = {
	type: reducerOpEnum;
	payload: {
		type: op;
		UID: string;
		number?: number;
		degOrRad?: drEnum;
	};
};

export const press = (op: npButt) => ({ type: op });

export const perform = (op: op, payload?: number): almostOp => ({
	type: reducerOpEnum.push,
	payload: {
		type: op,
		number: payload,
		UID: getRandomUID()
	}
});

export const enter = (payload: number): almostOp => ({
	type: reducerOpEnum.push,
	payload: {
		type: op.enter,
		number: payload,
		UID: getRandomUID()
	}
});
export const stash = (): almostOp => ({
	type: reducerOpEnum.stash,
	payload: {
		type: op.enter,
		UID: getRandomUID()
	}
});
export const drop = (): almostOp => ({
	type: reducerOpEnum.push,
	payload: {
		type: op.drop,
		UID: getRandomUID()
	}
});
