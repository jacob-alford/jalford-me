import forEach from 'lodash/forEach';

import { op, tapeItem, historyItem } from './operators/_types';
import operators from './operators/operators';

const getDerivedStackAndTape = (
	history: historyItem[],
	notify: (config: any) => void
): [number[], tapeItem[]] => {
	let stack: number[] = [];
	const tape: tapeItem[] = [];
	forEach(history, (operation: historyItem): void => {
		const { type, payload } = operation;
		const { act, error: isError, preVerify, toTape } = operators[type];
		const preCheck = preVerify(stack);
		if (!preCheck) {
			notify({
				body: `Unable to perform ${type} on stack with length of ${stack.length}!`
			});
			return;
		}
		const error = isError(stack);
		if (error) {
			notify({ body: error });
			return;
		}
		tape.push(toTape(stack, payload));
		stack = act(stack, payload);
	});
	return [stack, tape];
};

export default getDerivedStackAndTape;
