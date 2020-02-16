import concat from 'lodash/concat';
import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';
import slice from 'lodash/slice';
import last from 'lodash/last';

import { getRandomUID } from 'functions';

import { operator, op, tapeItem, calcError, stackItem } from './_types';

const toNumbers = (stack: stackItem[]): number[] =>
	stack.map(({ number }) => number);
const toStackItem = (number: number): stackItem => ({
	number,
	UID: getRandomUID()
});
const toStack = (numbers: number[]): stackItem[] =>
	numbers.map(number => toStackItem(number));
export const getLast = (stack: stackItem[]): number =>
	stack[stack.length - 1].number;
export const getNextToLast = (stack: stackItem[]): number =>
	stack[stack.length - 2].number;

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
		toStack(fn(toNumbers(stack)));
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
		concat(dropRight(stack), toStackItem(fn(getLast(stack))));
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
			toStackItem(fn(getLast(stack), getNextToLast(stack)))
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
		concat(toStackItem(constant), stack);
	return {
		type,
		act,
		preVerify,
		toTape,
		error
	};
};
