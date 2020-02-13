import React, { FunctionComponent } from 'react';
import concat from 'lodash/concat';
import drop from 'lodash/drop';
import slice from 'lodash/slice';

import {
	operator,
	op,
	colorClass as colorClasses,
	tapeItem,
	calcError
} from './_types';

export const formatList = (arr: number[]): string => {
	return `[${slice(arr, 0, 3).join(', ')}${(arr.length > 3 && ', ...') || ''}]`;
};
export const text = (str: string): FunctionComponent => () => (
	<span>{str}</span>
);
export const symText = (str: string): FunctionComponent => () => (
	<span dangerouslySetInnerHTML={{ __html: str }} />
);
export const makeError = (bool: boolean, str: string): calcError =>
	(bool && str) || null;

export const makeReducer = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (stack: number[]) => tapeItem;
	fn: (input: number[]) => number[];
	error?: (stack: number[]) => calcError;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		error = (): calcError => null,
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
		error
	};
};

export const makeSingleOp = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (stack: number[]) => tapeItem;
	fn: (input: number) => number;
	error?: (stack: number[]) => calcError;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		error = (): calcError => null,
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
		error
	};
};

export const makeDoubleOp = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	toTape?: (stack: number[]) => tapeItem;
	fn: (input1: number, input2: number) => number;
	index1?: number;
	index2?: number;
	error?: (stack: number[]) => calcError;
}): operator => {
	const {
		colorClass,
		render = text(config.type),
		type,
		fn,
		index1 = 0,
		index2 = 1,
		error = (): calcError => null,
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
		error
	};
};

export const makeConstant = (config: {
	colorClass: colorClasses;
	render?: FunctionComponent;
	type: op;
	constant: number;
}): operator => {
	const { colorClass, render = text(config.type), type, constant } = config;
	const toTape = (): tapeItem => [`${type}`, `${constant}`];
	const error = (): calcError => null;
	const preVerify = (): boolean => true;
	const act = (stack: number[]): number[] => concat(constant, stack);
	return {
		colorClass,
		render,
		type,
		act,
		preVerify,
		toTape,
		error
	};
};
