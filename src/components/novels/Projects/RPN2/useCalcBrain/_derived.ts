import forEach from 'lodash/forEach';

import { tapeItem, historyItem } from './operators/_types';
import operators from './operators/operators';

const getDerivedStackAndTape = (
	history: historyItem[],
	alertCache: string[],
	notify: (config: any) => void
): [number[], tapeItem[]] => {
	let stack: number[] = [];
	const tape: tapeItem[] = [];
	forEach(history, (operation: historyItem): void => {
		const { type, payload, UID } = operation;
		const { act, error: isError, preVerify, toTape } = operators[type];
		if (alertCache.includes(UID)) return;
		const preCheck = preVerify(stack);
		if (!preCheck) {
			alertCache.push(UID);
			notify({
				body: `Unable to perform ${type} on stack with length of ${stack.length}!`
			});
			return;
		}
		const error = isError(stack);
		if (error) {
			alertCache.push(UID);
			notify({ body: error });
			return;
		}
		tape.push(toTape(stack, payload));
		stack = act(stack, payload);
	});
	return [stack, tape];
};

export default getDerivedStackAndTape;
