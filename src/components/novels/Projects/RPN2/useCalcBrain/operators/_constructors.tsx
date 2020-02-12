import React, { FunctionComponent } from 'react';
import concat from 'lodash/concat';
import drop from 'lodash/drop';

import { operator, op, colorClass as colorClasses, tapeItem } from './_types';

const text = (str: string): FunctionComponent => () => <span>{str} </span>;

const makeSingleOp = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (input: number | number[], output: number | number[]) => tapeItem;
	fn: (input: number) => number;
	verify?: (stack: number[]) => boolean;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		verify = (): boolean => true,
		toTape = (
			input: number | number[],
			output: number | number[]
		): tapeItem => [`${type}(${input})`, `${output}`]
	} = config;
	const preVerify = (stack: number[]): boolean => stack.length > 0;
	const act = (stack: number[]): number[] => concat(fn(stack[0]), drop(stack));
	return {
		colorClass,
		render,
		type,
		act,
		preVerify,
		toTape,
		verify
	};
};

const makeDoubleOp = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (input: number | number[], output: number | number[]) => tapeItem;
	fn: (input1: number, input2: number) => number;
	index1?: number;
	index2?: number;
	verify?: (stack: number[]) => boolean;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		index1 = 0,
		index2 = 1,
		verify = (): boolean => true,
		toTape = (
			input: number | number[],
			output: number | number[]
		): tapeItem => [`${type}(${input})`, `${output}`]
	} = config;
	const preVerify = (stack: number[]): boolean =>
		stack.length > Math.max(index1, index2);
	const act = (stack: number[]): number[] =>
		concat(fn(stack[index1], stack[index2]), drop(drop(stack)));
	return {
		colorClass,
		render,
		type,
		act,
		preVerify,
		toTape,
		verify
	};
};

const makeConstant = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	constant: number;
}): operator => {
	const { colorClass, render = text(config.type), type, constant } = config;
	const toTape = (): tapeItem => [`${type}`, `${constant}`];
	const verify = (): boolean => true;
	const preVerify = (): boolean => true;
	const act = (stack: number[]): number[] => concat(constant, stack);
	return {
		colorClass,
		render,
		type,
		act,
		preVerify,
		toTape,
		verify
	};
};

export { makeSingleOp, makeDoubleOp, makeConstant, text };
