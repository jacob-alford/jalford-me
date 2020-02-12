import React, { FunctionComponent } from 'react';
import concat from 'lodash/concat';
import drop from 'lodash/drop';

import {
	operator,
	op,
	colorClass as colorClasses,
	tapeItem,
	operators as opsForm
} from './_types';

const text = (str: string): FunctionComponent => () => <span>{str}</span>;

const makeSingleOp = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (input: number | number[], output: number | number[]) => tapeItem;
	fn: (input: number) => number;
	verify?: (stack: number[]) => boolean;
}): operator => {
	const { colorClass, render, type, fn, verify, toTape } = config;
	const optVerify = verify || ((): boolean => true);
	const optRender = render || text(type);
	const optToTape =
		toTape ||
		((input: number | number[], output: number | number[]): tapeItem => [
			`${type}(${input})`,
			`${output}`
		]);
	const preVerify = (stack: number[]): boolean => stack.length > 0;
	const act = (stack: number[]): number[] => concat(fn(stack[0]), drop(stack));
	return {
		colorClass,
		render: optRender,
		type,
		act,
		preVerify,
		toTape: optToTape,
		verify: optVerify
	};
};

let operators: opsForm;
operators = {
	[op.sin]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.sin,
		fn: Math.sin
	}),
	[op.cos]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.cos,
		fn: Math.cos
	})
};

export { operators };
