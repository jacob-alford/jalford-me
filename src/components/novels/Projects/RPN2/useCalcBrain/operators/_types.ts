import { drEnum } from '../../RPN2';

export enum op {
	sin = 'sin',
	cos = 'cos',
	tan = 'tan',
	asin = 'asin',
	acos = 'acos',
	atan = 'atan',
	pi = 'pi',
	speedOfLight = 'speedOfLight',
	sqrt2 = 'sqrt2',
	gldnRatio = 'gldnRatio',
	sum = 'sum',
	product = 'product',
	mean = 'mean',
	var = 'var',
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
	enterLast = 'enterLast',
	drop = 'drop',
	clearAll = 'clearAll',
	mod = 'mod',
	roll = 'roll',
	swap = 'swap'
}

export type tapeItem = [string, string, string];
export type calcError = null | string;

export interface stackItem {
	UID: string;
	number: number;
}

export type stackHistoryItem = stackItem[];
export type tapeHistoryItem = tapeItem[];

export type stackHistory = stackHistoryItem[];
export type tapeHistory = tapeHistoryItem[];

export interface operator {
	requiresTrigConversion?: boolean;
	requiresInverseTrigConversion?: boolean;
	type: op;
	act: (
		stack: stackItem[],
		payload?: number,
		UID?: string,
		degOrRad?: drEnum
	) => stackItem[];
	preVerify: (stack: stackItem[]) => boolean;
	toTape: (stack: stackItem[], payload?: number, degOrRad?: drEnum) => tapeItem;
	error: (stack: stackItem[]) => calcError;
}

export type operators = Record<op, operator>;
