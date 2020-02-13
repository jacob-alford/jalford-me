import forEach from 'lodash/forEach';

import { op, tapeItem } from './operators/_types';
import { operators } from './operators/operators';

const getDerivedStackAndTape = (
	history: op[],
	notify: (config: any) => void
): [number[], tapeItem[]] => {
	let stack: number[] = [];
	const tape: tapeItem[] = [];
	forEach(history, (operation: op): void => {
		const { act, error: isError, preVerify, toTape } = operators[operation];
		const preCheck = preVerify(stack);
		if (!preCheck) {
			notify({
				body: `Unable to perform ${operation} on stack with length of ${stack.length}!`
			});
			return;
		}
		const error = isError(stack);
		if (error) {
			notify({ body: error });
			return;
		}
		tape.push(toTape(stack));
		stack = act(stack);
	});
	return [stack, tape];
};

export default getDerivedStackAndTape;
