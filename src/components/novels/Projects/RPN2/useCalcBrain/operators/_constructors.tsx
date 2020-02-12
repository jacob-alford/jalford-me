import React, { FunctionComponent } from 'react';
import concat from 'lodash/concat';
import drop from 'lodash/drop';
import slice from 'lodash/slice';

import { operator, op, colorClass as colorClasses, tapeItem } from './_types';

const formatList = (arr: number[]): string => {
	return `[${slice(arr, 0, 3).join(', ')}]`;
};
const text = (str: string): FunctionComponent => () => <span>{str}</span>;
const symText = (str: string): FunctionComponent => () => (
	<span dangerouslySetInnerHTML={{ __html: str }} />
);

const makeReducer = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (stack: number[]) => tapeItem;
	fn: (input: number[]) => number[];
	verify?: (stack: number[]) => boolean;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		verify = (): boolean => true,
		toTape = (stack: number[]): tapeItem => [
			`${type}(${formatList(stack)})`,
			`${fn(stack)}`
		]
	} = config;
	const preVerify = (stack: number[]): boolean => stack.length > 0;
	const act = (stack: number[]): number[] => fn(stack);
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

const makeSingleOp = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (stack: number[]) => tapeItem;
	fn: (input: number) => number;
	verify?: (stack: number[]) => boolean;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		verify = (): boolean => true,
		toTape = (stack: number[]): tapeItem => [
			`${type}(${stack[0]})`,
			`${fn(stack[0])}`
		]
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
	toTape?: (stack: number[]) => tapeItem;
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
		toTape = (stack: number[]): tapeItem => [
			`${type}(${stack[index1]}, ${stack[index2]})`,
			`${fn(stack[index1], stack[index2])}`
		]
	} = config;
	const preVerify = (stack: number[]): boolean =>
		stack.length > Math.max(index1, index2);
	const act = (stack: number[]): number[] =>
		concat(fn(stack[index1], stack[index2]), drop(stack, 2));
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

export { makeSingleOp, makeDoubleOp, makeConstant, makeReducer, text, symText };
