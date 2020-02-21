import forEach from 'lodash/forEach';

import { tapeItem, historyItem, stackItem } from './operators/_types';
import operators from './operators/operators';

const getDerivedStackAndTape = (
	history: historyItem[],
	alertCache: { [key: string]: boolean },
	notify: (config: any) => void
): [stackItem[], tapeItem[]] => {
	let stack: stackItem[] = [];
	const tape: tapeItem[] = [];
	forEach(history, (operation: historyItem): void => {
		const { type, payload, UID } = operation;
		const { act, error: isError, preVerify, toTape } = operators[type];
		if (alertCache[UID]) return;
		const preCheck = preVerify(stack);
		if (!preCheck) {
			alertCache[UID] = true;
			notify({
				body: `Unable to perform ${type} on stack with length of ${stack.length}!`
			});
			return;
		}
		const error = isError(stack);
		if (error) {
			alertCache[UID] = true;
			notify({ body: error });
			return;
		}
		tape.push(toTape(stack, payload));
		stack = act(stack, payload, UID);
	});
	return [stack, tape];
};

export default getDerivedStackAndTape;
