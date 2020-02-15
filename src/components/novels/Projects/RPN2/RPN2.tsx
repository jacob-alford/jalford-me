import React from 'react';
import Button from '@material-ui/core/Button';

import Stack from './words/stack/Stack';
import StackGroup from './words/stack/StackItem';

import useCalcBrain from './useCalcBrain/useCalcBrain';
import { enter, drop } from './top-level-ops/topLevelOps';

export default function RPN2() {
	const [stack, tape, operate] = useCalcBrain();
	return (
		<>
			<Stack>
				<StackGroup stack={stack} />
			</Stack>
			<Button onClick={() => operate(enter(5))}>Enter 5</Button>
			<Button onClick={() => operate(enter(2))}>Enter 2</Button>
			<Button onClick={() => operate(drop())}>Drop</Button>
		</>
	);
}
