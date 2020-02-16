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
	clearAll = 'clearAll',
	mod = 'mod',
	roll = 'roll',
	swap = 'swap'
}

export enum colorClass {
	stackOp = 'stackOp',
	type = 'type',
	singleOp = 'singleOp',
	doubleOp = 'doubleOp',
	multiOp = 'multiOp',
	danger = 'danger'
}

export type tapeItem = [string, string];
export type calcError = null | string;

export interface historyItem {
	type: op;
	payload?: number;
	UID: string;
}

export interface operator {
	colorClass: colorClass;
	render: FunctionComponent;
	requiresTrigConversion?: boolean;
	type: op;
	act: (stack: number[], payload?: number) => number[];
	preVerify: (stack: number[]) => boolean;
	toTape: (stack: number[], payload?: number) => tapeItem;
	error: (stack: number[]) => calcError;
}

export type operators = Record<op, operator>;
