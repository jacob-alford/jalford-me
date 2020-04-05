const increment = (state, index) => {
	const copy = [...state];
	if (copy[index] + 1 <= 9) copy[index] += 1;
	else copy[index] = 0;
	return copy;
};
const decrement = (state, index) => {
	const copy = [...state];
	if (copy[index] - 1 >= 0) copy[index] -= 1;
	else copy[index] = 9;
	return copy;
};

const actors = {
	increment: 'increment',
	decrement: 'decrement'
};
const actions = {
	[actors.increment]: (state, { index }) => increment(state, index),
	[actors.decrement]: (state, { index }) => decrement(state, index)
};

const reducer = (state, action) => {
	try {
		return actions[action.type](state, action);
	} catch (error) {
		throw new Error(`Unable to perform reduction, unknown action type: ${action.type}`);
	}
};

const initialState = [0, 0, 0, 0];

export { reducer, initialState };
