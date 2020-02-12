import { FunctionComponent } from 'react';

export enum op {
	sin = 'sin',
	cos = 'cos',
	tan = 'tan',
	asin = 'asin',
	acos = 'acos',
	atan = 'atan',
	pi = 'pi',
	speedOfLight = 'speedOfLight',
	sum = 'sum',
	product = 'product',
	mean = 'mean',
	ln = 'ln',
	log10 = 'log10',
	log2 = 'log2',
	x2 = 'x2',
	eX = 'eX',
	twoX = 'twoX',
	tenX = 'tenX',
	yX = 'yX',
	sqrt = 'sqrt',
	xRty = 'xRty',
	xInv = 'xInv',
	xFact = 'xFact',
	add = 'add',
	sub = 'sub',
	mul = 'mul',
	div = 'div',
	enter = 'enter',
	drop = 'drop',
	cancelAll = 'cancelAll',
	clear = 'clear',
	mod = 'mod',
	roll = 'roll',
	swap = 'swap'
}

export enum colorClass {
	function = 'function',
	number = 'number',
	action = 'action',
	delete = 'delete'
}

export type tapeItem = [string, string];

export interface operator {
	colorClass: colorClass;
	render: FunctionComponent;
	requiresTrigConversion?: boolean;
	type: op;
	act: (stack: number[]) => number[];
	preVerify: (stack: number[]) => boolean;
	toTape: (input: number | number[], output: number | number[]) => tapeItem;
	verify: (stack: number[]) => boolean;
}

export type operators = Record<op, operator>;
