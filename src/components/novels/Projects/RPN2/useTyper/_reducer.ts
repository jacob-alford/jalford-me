import { typeActions } from './_actions';
import { npButt } from './_types';

const typeReducer = (state: string, action: { type: npButt }): string => {
	if (!typeActions[action.type])
		throw new Error(`Unknown typing reducer action, ${action.type}!`);
	return typeActions[action.type](state);
};

export default typeReducer;
