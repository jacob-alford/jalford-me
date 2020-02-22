import concat from 'lodash/concat';

import { tapeHistoryItem, stackHistoryItem } from '../operators/_types';
import operators from '../operators/operators';
import { reducerOperation } from './reducer';

const getNextStackAndTape = (
	operation: reducerOperation,
	stack: stackHistoryItem,
	tape: tapeHistoryItem
): [stackHistoryItem, tapeHistoryItem] => {
	const { type, number: payload, UID, notify } = operation.payload;
	const { act, error: isError, preVerify, toTape } = operators[type];
	const preCheck = preVerify(stack);
	if (!preCheck) {
		notify({
			body: `Unable to perform ${type} on stack with length of ${stack.length}!`
		});
		return [stack, tape];
	}
	const error = isError(stack);
	if (error) {
		notify({ body: error });
		return [stack, tape];
	}
	return [act(stack, payload, UID), concat(tape, toTape(stack, payload))];
};

export default getNextStackAndTape;
