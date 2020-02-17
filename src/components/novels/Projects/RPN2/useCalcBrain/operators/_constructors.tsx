import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import slice from 'lodash/slice';

import { getRandomUID } from 'functions';

import { operator, op, tapeItem, calcError, stackItem } from './_types';

const toNumbers = (stack: stackItem[]): number[] =>
	stack.map(({ number }) => number);
const toStackItem = (number: number, UID: string): stackItem => ({
	number,
	UID
});
const toStack = (numbers: number[], UID: string): stackItem[] =>
	numbers.map(number => toStackItem(number, UID));
export const getLast = (stack: stackItem[]): number =>
	stack[stack.length - 1].number;
export const getNextToLast = (stack: stackItem[]): number =>
	stack[stack.length - 2].number;
const getLastUID = (stack: stackItem[]): string =>
	(stack[stack.length - 1] || { UID: getRandomUID() }).UID;

export const formatList = (arr: number[]): string => {
	return `${slice(arr, 0, 3).join(',')}${(arr.length > 3 && ', ...') || ''}`;
};

export const makeError = (bool: boolean, str: string): calcError =>
	(!bool && str) || null;

export const makeReducer = (config: {
	type: op;
	toTape?: (stack: stackItem[]) => tapeItem;
	fn: (input: number[]) => number[];
	error?: (stack: stackItem[]) => calcError;
}): operator => {
	const {
		type,
		fn,
		error = (): calcError => null,
		toTape = (stack: stackItem[]): tapeItem => [
			`${type}(${formatList(toNumbers(stack))})`,
			`${fn(toNumbers(stack))}`
		]
	} = config;
	const preVerify = (stack: stackItem[]): boolean => stack.length > 0;
	const act = (stack: stackItem[]): stackItem[] =>
		toStack(fn(toNumbers(stack)), getLastUID(stack));
	return {
		type,
		act,
		preVerify,
		toTape,
		error
	};
};

export const makeSingleOp = (config: {
	type: op;
	toTape?: (stack: stackItem[]) => tapeItem;
	fn: (input: number) => number;
	error?: (stack: stackItem[]) => calcError;
	requiresTrigConversion?: boolean;
}): operator => {
	const {
		type,
		fn,
		requiresTrigConversion,
		error = (): calcError => null,
		toTape = (stack: stackItem[]): tapeItem => [
			`${type}(${getLast(stack)})`,
			`${fn(getLast(stack))}`
		]
	} = config;
	const preVerify = (stack: stackItem[]): boolean => stack.length > 0;
	const act = (stack: stackItem[]): stackItem[] =>
		concat(
			dropRight(stack),
			toStackItem(fn(getLast(stack)), getLastUID(stack))
		);
	return {
		type,
		act,
		preVerify,
		toTape,
		error,
		requiresTrigConversion
	};
};

export const makeDoubleOp = (config: {
	type: op;
	toTape?: (stack: stackItem[]) => tapeItem;
	fn: (input1: number, input2: number) => number;
	error?: (stack: stackItem[]) => calcError;
	requiresTrigConversion?: boolean;
}): operator => {
	const {
		type,
		fn,
		requiresTrigConversion,
		error = (): calcError => null,
		toTape = (stack: stackItem[]): tapeItem => [
			`${type}(${getLast(stack)}, ${getNextToLast(stack)})`,
			`${fn(getLast(stack), getNextToLast(stack))}`
		]
	} = config;
	const preVerify = (stack: stackItem[]): boolean => stack.length >= 2;
	const act = (stack: stackItem[]): stackItem[] =>
		concat(
			dropRight(stack, 2),
			toStackItem(fn(getLast(stack), getNextToLast(stack)), getLastUID(stack))
		);
	return {
		type,
		act,
		preVerify,
		toTape,
		error,
		requiresTrigConversion
	};
};

export const makeConstant = (config: {
	type: op;
	constant: number;
}): operator => {
	const { type, constant } = config;
	const toTape = (): tapeItem => [`${type}`, `${constant}`];
	const error = (): calcError => null;
	const preVerify = (): boolean => true;
	const act = (stack: stackItem[]): stackItem[] =>
		concat(toStackItem(constant, getLastUID(stack)), stack);
	return {
		type,
		act,
		preVerify,
		toTape,
		error
	};
};
