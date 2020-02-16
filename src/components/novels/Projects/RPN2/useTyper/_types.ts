export enum npButt {
	zero = '0',
	one = '1',
	two = '2',
	three = '3',
	four = '4',
	five = '5',
	six = '6',
	seven = '7',
	eight = '8',
	nine = '9',
	dot = '.',
	pm = '±',
	backspace = '<-',
	clear = 'C'
}

export enum funcButt {
	degRad = 'degRad',
	constant = 'constant',
	stat = 'stat'
}

export type typeAction = (state: string) => string;
export type typeForm = Record<npButt, typeAction>;
