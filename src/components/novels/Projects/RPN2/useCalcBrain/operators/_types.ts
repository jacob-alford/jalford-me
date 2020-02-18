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
	enterLast = 'enterLast',
	drop = 'drop',
	clearAll = 'clearAll',
	mod = 'mod',
	roll = 'roll',
	swap = 'swap'
}

export type tapeItem = [string, string];
export type calcError = null | string;

export interface stackItem {
	UID: string;
	number: number;
}

export interface historyItem {
	type: op;
	payload?: number;
	UID: string;
}

export interface operator {
	requiresTrigConversion?: boolean;
	type: op;
	act: (stack: stackItem[], payload?: number, UID?: string) => stackItem[];
	preVerify: (stack: stackItem[]) => boolean;
	toTape: (stack: stackItem[], payload?: number) => tapeItem;
	error: (stack: stackItem[]) => calcError;
}

export type operators = Record<op, operator>;
