const isolate = (state, property, update) => ({
	...state,
	[property]: update
});

const indexHandler = (state, index, val) => {
	const copy = [...state];
	copy[index] = val;
	return copy;
};
const boolHandler = (state, index, truthfullness) => {
	const copy = [...state];
	copy[index] = truthfullness;
	return copy;
};

const initialState = {
	values: ['', '', '', '', '', ''],
	success: [null, null, null, null, null, null]
};

const actors = {
	setVal: 'setVal',
	setSuccess: 'setSuccess',
	setFailure: 'setFailure'
};
const actions = {
	[actors.setVal]: (state, { index, val }) =>
		isolate(state, 'values', indexHandler(state.values, index, val)),
	[actors.setSuccess]: (state, { index }) =>
		isolate(state, 'success', boolHandler(state.success, index, true)),
	[actors.setFailure]: (state, { index }) =>
		isolate(state, 'success', boolHandler(state.success, index, false))
};

const reducer = (state, action) => {
	try {
		return actions[action.type](state, action);
	} catch (err) {
		throw new Error(`Unkown reducer of type ${action.type}, err: ${err}`);
	}
};

export { reducer, initialState };
