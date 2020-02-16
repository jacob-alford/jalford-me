import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import _drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';

import {
	makeSingleOp,
	makeDoubleOp,
	makeConstant,
	makeReducer,
	text,
	makeError,
	symText
} from './_constructors';

import {
	op,
	colorClass as colorClasses,
	operators as opsForm,
	calcError,
	tapeItem,
	operator
} from './_types';

const condCat = (arr: number[], item?: number): number[] =>
	(item && concat(arr, item)) || arr;
const factorial = (number: number): number => {
	if (number === 1) return number;
	else return number * factorial(number - 1);
};

const enter: operator = {
	colorClass: colorClasses.stackOp,
	render: text('enter'),
	type: op.enter,
	act: (stack: number[], payload?: number): number[] => condCat(stack, payload),
	preVerify: (stack: number[]): boolean => true,
	toTape: (stack: number[], payload?: number): tapeItem => [
		`ENTER ${payload}`,
		``
	],
	error: (): calcError => null
};
const drop: operator = {
	colorClass: colorClasses.danger,
	render: text('delete'),
	type: op.drop,
	act: (stack: number[]): number[] => dropRight(stack),
	preVerify: (stack: number[]): boolean => stack.length > 0,
	toTape: (stack: number[]): tapeItem => [`DROP ${stack[0]}`, ``],
	error: (): calcError => null
};
const clearAll: operator = {
	colorClass: colorClasses.danger,
	render: text('AC'),
	type: op.clearAll,
	act: (stack: number[]): number[] => [],
	preVerify: (stack: number[]): boolean => true,
	toTape: (stack: number[]): tapeItem => [`CLEAR ALL`, ``],
	error: (): calcError => null
};
const roll: operator = {
	colorClass: colorClasses.stackOp,
	render: text('AC'),
	type: op.roll,
	act: (stack: number[]): number[] =>
		concat(stack[stack.length - 1], dropRight(stack)),
	preVerify: (stack: number[]): boolean => stack.length > 1,
	toTape: (stack: number[]): tapeItem => [`ROLL`, ``],
	error: (): calcError => null
};
const swap: operator = {
	colorClass: colorClasses.stackOp,
	render: text('swap'),
	type: op.swap,
	act: (stack: number[]): number[] =>
		concat([stack[1]], stack[0], _drop(stack, 2)),
	preVerify: (stack: number[]): boolean => stack.length >= 2,
	toTape: (stack: number[]): tapeItem => [`SWAP ${stack[0]}, ${stack[1]}`, ``],
	error: (): calcError => null
};

const operators: opsForm = {
	[op.enter]: enter,
	[op.drop]: drop,
	[op.clearAll]: clearAll,
	[op.roll]: roll,
	[op.swap]: swap,
	[op.mod]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.mod,
		fn: (x: number, y: number): number => x % y,
		render: text('x % y')
	}),
	[op.add]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.add,
		fn: (x: number, y: number): number => x + y,
		toTape: (stack: number[]): tapeItem => [
			`${stack[0]} + ${stack[1]}`,
			`${stack[0] + stack[1]}`
		],
		render: text('+')
	}),
	[op.sub]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.sub,
		fn: (x: number, y: number): number => x - y,
		toTape: (stack: number[]): tapeItem => [
			`${stack[0]} - ${stack[1]}`,
			`${stack[0] - stack[1]}`
		],
		render: text('-')
	}),
	[op.mul]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.mul,
		fn: (x: number, y: number): number => x * y,
		toTape: (stack: number[]): tapeItem => [
			`${stack[0]} * ${stack[1]}`,
			`${stack[0] * stack[1]}`
		],
		render: symText('&times;')
	}),
	[op.div]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.div,
		fn: (x: number, y: number): number => x / y,
		toTape: (stack: number[]): tapeItem => [
			`${stack[0]}/${stack[1]}`,
			`${stack[0] / stack[1]}`
		],
		error: (stack: number[]): calcError =>
			makeError(stack[1] !== 0, 'Unable to divide by zero!'),
		render: symText('<sup>x</sup>/<sub>y</sub>')
	}),
	[op.sin]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.sin,
		fn: Math.sin
	}),
	[op.cos]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.cos,
		fn: Math.cos
	}),
	[op.tan]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.tan,
		fn: Math.tan
	}),
	[op.asin]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.asin,
		fn: Math.asin,
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] >= 0 && stack[0] <= 1,
				'Inverse sine only defined for values between zero and one!'
			)
	}),
	[op.acos]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.acos,
		fn: Math.acos,
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] >= 0 && stack[0] <= 1,
				'Inverse cosine only defined for values between zero and one!'
			)
	}),
	[op.atan]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.atan,
		fn: Math.atan
	}),
	[op.pi]: makeConstant({
		colorClass: colorClasses.type,
		constant: Math.PI,
		type: op.pi,
		render: symText('&pi;')
	}),
	[op.speedOfLight]: makeConstant({
		colorClass: colorClasses.type,
		constant: 299792458,
		type: op.speedOfLight,
		render: text('c')
	}),
	[op.sum]: makeReducer({
		colorClass: colorClasses.multiOp,
		type: op.sum,
		render: symText('&Sigma;'),
		fn: (stack: number[]): number[] => [
			reduce(stack, (sum: number, next: number): number => sum + next, 0)
		]
	}),
	[op.product]: makeReducer({
		colorClass: colorClasses.multiOp,
		type: op.product,
		render: symText('&Pi;'),
		fn: (stack: number[]): number[] => [
			reduce(
				stack,
				(product: number, next: number): number => product * next,
				1
			)
		]
	}),
	[op.mean]: makeReducer({
		colorClass: colorClasses.multiOp,
		type: op.mean,
		render: symText('&mu;'),
		fn: (stack: number[]): number[] => [
			(1 / stack.length) *
				reduce(stack, (sum: number, next: number): number => sum + next, 0)
		]
	}),
	[op.ln]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.ln,
		fn: Math.log,
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] > 0,
				'Real-Valued Natural log only defined for positive numbers!'
			)
	}),
	[op.log10]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.log10,
		fn: Math.log10,
		render: symText('log<sub>10</sub>'),
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] > 0,
				'Real-Valued Log-base-10 only defined for positive numbers!'
			)
	}),
	[op.log2]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.log2,
		fn: Math.log2,
		render: symText('log<sub>2</sub>'),
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] > 0,
				'Real-Valued Log-base-2 only defined for positive numbers!'
			)
	}),
	[op.x2]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.x2,
		fn: (num: number): number => Math.pow(num, 2),
		render: symText('x<sup>2</sup>')
	}),
	[op.eX]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.eX,
		fn: Math.exp,
		render: symText('e<sup>x</sup>')
	}),
	[op.twoX]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.twoX,
		fn: (num: number): number => Math.pow(2, num),
		render: symText('2<sup>x</sup>')
	}),
	[op.tenX]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.tenX,
		fn: (num: number): number => Math.pow(10, num),
		render: symText('10<sup>x</sup>')
	}),
	[op.yX]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.yX,
		fn: (x: number, y: number): number => Math.pow(y, x),
		render: symText('y<sup>x</sup>')
	}),
	[op.sqrt]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.sqrt,
		fn: (num: number): number => Math.pow(10, num),
		render: symText('x<sup>½</sup>'),
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] > 0,
				'Real-Valued Square-root only defined for non-negative numbers!'
			)
	}),
	[op.xRty]: makeDoubleOp({
		colorClass: colorClasses.doubleOp,
		type: op.xRty,
		fn: (x: number, y: number): number => Math.pow(y, x),
		render: symText('y<sup>1/x</sup>'),
		error: (stack: number[]): calcError =>
			makeError(
				stack[1] >= 0 && stack[0] !== 0,
				'Real-Valued xth-root-of-y only defined for non-negative radicands, and non-zero indecies!'
			)
	}),
	[op.xInv]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.xInv,
		fn: (num: number): number => 1 / num,
		render: text('<sup>1</sup>/<sub>x</sub>'),
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] !== 0,
				`Calculator cannot represent infinity in a sufficient fashion! (at least I'm afraid)`
			)
	}),
	[op.xFact]: makeSingleOp({
		colorClass: colorClasses.singleOp,
		type: op.xFact,
		fn: (num: number): number => factorial(num),
		render: text('x!'),
		error: (stack: number[]): calcError =>
			makeError(
				stack[0] <= 170 && Number.isInteger(stack[0]),
				'Cannot calculate factorial of integers greater than 170 with 10^53 significant digits!'
			),
		toTape: (stack: number[]): tapeItem => [
			`${stack[0]}!`,
			`${factorial(stack[0])}`
		]
	})
};

export default operators;
