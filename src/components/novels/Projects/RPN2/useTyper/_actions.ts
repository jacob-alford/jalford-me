import concat from 'lodash/concat';
import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';

import { npButt, typeForm, typeAction } from './_types';

const type = (thing: number | string): typeAction => (state: string): string =>
	concat(state.split(''), thing).join('');

const typeActions: typeForm = {
	[npButt.dot]: type('.'),
	[npButt.zero]: type(0),
	[npButt.one]: type(1),
	[npButt.two]: type(2),
	[npButt.three]: type(3),
	[npButt.four]: type(4),
	[npButt.five]: type(5),
	[npButt.six]: type(6),
	[npButt.seven]: type(7),
	[npButt.eight]: type(8),
	[npButt.nine]: type(9),
	[npButt.pm]: (state: string): string =>
		state[0] === '-'
			? drop(state.split('')).join('')
			: concat(['-'], state.split('')).join(''),
	[npButt.backspace]: (state: string): string =>
		dropRight(state.split('')).join(''),
	[npButt.clear]: (): string => ''
};

export { typeActions };
