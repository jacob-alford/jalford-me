import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';

import { getRandomUID } from 'functions';

import {
	makeSingleOp,
	makeDoubleOp,
	makeConstant,
	makeReducer,
	makeError
} from './_constructors';

import {
	op,
	operators as opsForm,
	calcError,
	tapeItem,
	operator,
	stackItem
} from './_types';

const toStackItem = (number: number, UID?: string): stackItem => ({
	number,
	UID: UID || getRandomUID()
});
const condCat = (
	arr: stackItem[],
	item?: number,
	UID?: string
): stackItem[] => {
	if (item === 0 || item) return concat(arr, toStackItem(item, UID));
	else return arr;
};
const factorial = (number: number): number => {
	if (number === 1 || number === 2) return number;
	else return number * factorial(number - 1);
};
const getLast = (stack: stackItem[]): stackItem => stack[stack.length - 1];
const getNextToLast = (stack: stackItem[]): stackItem =>
	stack[stack.length - 2];

const enter: operator = {
	type: op.enter,
	act: (stack: stackItem[], payload?: number, UID?: string): stackItem[] =>
		condCat(stack, payload, UID),
	preVerify: (stack: stackItem[]): boolean => true,
	toTape: (stack: stackItem[], payload?: number): tapeItem => [
		`ENTER ${payload}`,
		``
	],
	error: (): calcError => null
};
const enterLast: operator = {
	type: op.enterLast,
	act: (stack: stackItem[], payload?: number, UID?: string): stackItem[] =>
		condCat(stack, stack[stack.length - 1].number, UID),
	preVerify: (stack: stackItem[]): boolean => stack.length > 0,
	toTape: (stack: stackItem[], payload?: number): tapeItem => [
		`ENTER ${stack[stack.length - 1]}`,
		``
	],
	error: (): calcError => null
};
const drop: operator = {
	type: op.drop,
	act: (stack: stackItem[]): stackItem[] => dropRight(stack),
	preVerify: (stack: stackItem[]): boolean => stack.length > 0,
	toTape: (stack: stackItem[]): tapeItem => [
		`DROP ${getLast(stack).number}`,
		``
	],
	error: (): calcError => null
};
const clearAll: operator = {
	type: op.clearAll,
	act: (stack: stackItem[]): stackItem[] => [],
	preVerify: (stack: stackItem[]): boolean => true,
	toTape: (stack: stackItem[]): tapeItem => [`CLEAR ALL`, ``],
	error: (): calcError => null
};
const roll: operator = {
	type: op.roll,
	act: (stack: stackItem[]): stackItem[] =>
		concat(stack[stack.length - 1], dropRight(stack)),
	preVerify: (stack: stackItem[]): boolean => stack.length > 1,
	toTape: (stack: stackItem[]): tapeItem => [`ROLL`, ``],
	error: (): calcError => null
};
const swap: operator = {
	type: op.swap,
	act: (stack: stackItem[]): stackItem[] =>
		concat(dropRight(stack, 2), getLast(stack), getNextToLast(stack)),
	preVerify: (stack: stackItem[]): boolean => stack.length >= 2,
	toTape: (stack: stackItem[]): tapeItem => [
		`SWAP ${getNextToLast(stack).number}, ${getLast(stack).number}`,
		``
	],
	error: (): calcError => null
};

const operators: opsForm = {
	[op.enter]: enter,
	[op.enterLast]: enterLast,
	[op.drop]: drop,
	[op.clearAll]: clearAll,
	[op.roll]: roll,
	[op.swap]: swap,
	[op.mod]: makeDoubleOp({
		type: op.mod,
		fn: (x: number, y: number): number => y % x
	}),
	[op.add]: makeDoubleOp({
		type: op.add,
		fn: (x: number, y: number): number => x + y,
		toTape: (stack: stackItem[]): tapeItem => [
			`${getNextToLast(stack).number} + ${getLast(stack).number}`,
			`${getLast(stack).number + getNextToLast(stack).number}`
		]
	}),
	[op.sub]: makeDoubleOp({
		type: op.sub,
		fn: (x: number, y: number): number => y - x,
		toTape: (stack: stackItem[]): tapeItem => [
			`${getNextToLast(stack).number} - ${getLast(stack).number}`,
			`${getNextToLast(stack).number - getLast(stack).number}`
		]
	}),
	[op.mul]: makeDoubleOp({
		type: op.mul,
		fn: (x: number, y: number): number => x * y,
		toTape: (stack: stackItem[]): tapeItem => [
			`${getNextToLast(stack).number} * ${getLast(stack).number}`,
			`${getLast(stack).number * getNextToLast(stack).number}`
		]
	}),
	[op.div]: makeDoubleOp({
		type: op.div,
		fn: (x: number, y: number): number => y / x,
		toTape: (stack: stackItem[]): tapeItem => [
			`${getNextToLast(stack).number}/${getLast(stack).number}`,
			`${getNextToLast(stack).number / getLast(stack).number}`
		],
		error: (stack: stackItem[]): calcError =>
			makeError(getLast(stack).number !== 0, 'Unable to divide by zero!')
	}),
	[op.sin]: makeSingleOp({
		type: op.sin,
		fn: Math.sin,
		requiresTrigConversion: true
	}),
	[op.cos]: makeSingleOp({
		type: op.cos,
		fn: Math.cos,
		requiresTrigConversion: true
	}),
	[op.tan]: makeSingleOp({
		type: op.tan,
		fn: Math.tan,
		requiresTrigConversion: true
	}),
	[op.asin]: makeSingleOp({
		type: op.asin,
		fn: Math.asin,
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number >= 0 && getLast(stack).number <= 1,
				'Inverse sine only defined for values between zero and one!'
			)
	}),
	[op.acos]: makeSingleOp({
		type: op.acos,
		fn: Math.acos,
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number >= 0 && getLast(stack).number <= 1,
				'Inverse cosine only defined for values between zero and one!'
			)
	}),
	[op.atan]: makeSingleOp({
		type: op.atan,
		fn: Math.atan,
		requiresTrigConversion: true
	}),
	[op.pi]: makeConstant({
		constant: Math.PI,
		type: op.pi
	}),
	[op.speedOfLight]: makeConstant({
		constant: 299792458,
		type: op.speedOfLight
	}),
	[op.sum]: makeReducer({
		type: op.sum,
		fn: (stack: number[]): number[] => [
			reduce(stack, (sum: number, next: number): number => sum + next, 0)
		]
	}),
	[op.product]: makeReducer({
		type: op.product,
		fn: (stack: number[]): number[] => [
			reduce(
				stack,
				(product: number, next: number): number => product * next,
				1
			)
		]
	}),
	[op.mean]: makeReducer({
		type: op.mean,
		fn: (stack: number[]): number[] => [
			(1 / stack.length) *
				reduce(stack, (sum: number, next: number): number => sum + next, 0)
		]
	}),
	[op.ln]: makeSingleOp({
		type: op.ln,
		fn: Math.log,
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number > 0,
				'Real-Valued Natural log only defined for positive numbers!'
			)
	}),
	[op.log10]: makeSingleOp({
		type: op.log10,
		fn: Math.log10,
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number > 0,
				'Real-Valued Log-base-10 only defined for positive numbers!'
			)
	}),
	[op.log2]: makeSingleOp({
		type: op.log2,
		fn: Math.log2,
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number > 0,
				'Real-Valued Log-base-2 only defined for positive numbers!'
			)
	}),
	[op.x2]: makeSingleOp({
		type: op.x2,
		fn: (num: number): number => Math.pow(num, 2)
	}),
	[op.eX]: makeSingleOp({
		type: op.eX,
		fn: Math.exp
	}),
	[op.twoX]: makeSingleOp({
		type: op.twoX,
		fn: (num: number): number => Math.pow(2, num)
	}),
	[op.tenX]: makeSingleOp({
		type: op.tenX,
		fn: (num: number): number => Math.pow(10, num)
	}),
	[op.yX]: makeDoubleOp({
		type: op.yX,
		fn: (x: number, y: number): number => Math.pow(y, x)
	}),
	[op.sqrt]: makeSingleOp({
		type: op.sqrt,
		fn: (num: number): number => Math.pow(10, num),
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number > 0,
				'Real-Valued Square-root only defined for non-negative numbers!'
			)
	}),
	[op.xRty]: makeDoubleOp({
		type: op.xRty,
		fn: (x: number, y: number): number => Math.pow(y, x),
		error: (stack: stackItem[]): calcError =>
			makeError(
				getNextToLast(stack).number >= 0 && getLast(stack).number !== 0,
				'Real-Valued xth-root-of-y only defined for non-negative radicands, and non-zero indecies!'
			)
	}),
	[op.xInv]: makeSingleOp({
		type: op.xInv,
		fn: (num: number): number => 1 / num,
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number !== 0,
				`Calculator cannot represent infinity in a sufficient fashion! (at least I'm afraid)`
			)
	}),
	[op.xFact]: makeSingleOp({
		type: op.xFact,
		fn: (num: number): number => factorial(num),
		error: (stack: stackItem[]): calcError =>
			makeError(
				getLast(stack).number <= 170 &&
					Number.isInteger(getLast(stack).number) &&
					getLast(stack).number >= 2,
				'Cannot calculate factorial of integers greater than 170 with 10^53 significant digits!'
			),
		toTape: (stack: stackItem[]): tapeItem => [
			`${getLast(stack).number}!`,
			`${factorial(getLast(stack).number)}`
		]
	})
};

export default operators;
