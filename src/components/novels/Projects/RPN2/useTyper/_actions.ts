import concat from 'lodash/concat';
import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';

import { npButt, typeForm, typeAction } from './_types';

const quickIncludes = (str: string, char: string): boolean => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) return true;
  }
  return false;
};

const type = (thing: number | string): typeAction => (state: string): string =>
  state + thing;
const typeDot = (state: string): string =>
  !quickIncludes(state, '.') ? state + '.' : state;

const typeActions: typeForm = {
  [npButt.dot]: typeDot,
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
  [npButt.backspace]: (state: string): string => dropRight(state.split('')).join(''),
  [npButt.clear]: (): string => ''
};

export { typeActions };
