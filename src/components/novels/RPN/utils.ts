import toNumber from 'lodash/toNumber';
import { op, stackItem } from './useCalcBrain/operators/_types';
import { enter, drop, press, perform, almostOp } from './top-level-ops/topLevelOps';
import { npButt } from './useTyper/_types';

export enum drEnum {
  deg = 'deg',
  rad = 'rad'
}

export const toggleDegRad = (degRad: drEnum, setDegRad: (val: any) => void): void =>
  degRad === drEnum.deg ? setDegRad(drEnum.rad) : setDegRad(drEnum.deg);

export const getIndex = (index: number, length: number): string | number =>
  index === length - 1 ? 'x' : index === length - 2 ? 'y' : length - index - 2;

export const getEntry = (entry: string, stack: stackItem[]): number => {
  const number = toNumber(entry);
  if (number === 0 || number) return number;
  else {
    const lastItem = stack[stack.length - 1];
    if (lastItem) return lastItem.number;
    else return 0;
  }
};

type typinHandler = {
  [key: string]: (
    operate: (op: almostOp) => void,
    ammendEntry: (config: { type: npButt }) => void,
    entry: string,
    stack: stackItem[]
  ) => void;
};

export const typeHandlers: typinHandler = {
  '1': (_, amendEntry) => amendEntry(press(npButt.one)),
  '2': (_, amendEntry) => amendEntry(press(npButt.two)),
  '3': (_, amendEntry) => amendEntry(press(npButt.three)),
  '4': (_, amendEntry) => amendEntry(press(npButt.four)),
  '5': (_, amendEntry) => amendEntry(press(npButt.five)),
  '6': (_, amendEntry) => amendEntry(press(npButt.six)),
  '7': (_, amendEntry) => amendEntry(press(npButt.seven)),
  '8': (_, amendEntry) => amendEntry(press(npButt.eight)),
  '9': (_, amendEntry) => amendEntry(press(npButt.nine)),
  '0': (_, amendEntry) => amendEntry(press(npButt.zero)),
  '.': (_, amendEntry) => amendEntry(press(npButt.dot)),
  Enter: (operate, amendEntry, entry, stack) => {
    operate(enter(getEntry(entry, stack)));
    amendEntry(press(npButt.clear));
  },
  Backspace: (_, amendEntry) => amendEntry(press(npButt.backspace)),
  Delete: operate => operate(drop()),
  '+': operate => operate(perform(op.add)),
  '=': operate => operate(perform(op.add)),
  '-': operate => operate(perform(op.sub)),
  '*': operate => operate(perform(op.mul)),
  '/': operate => operate(perform(op.div)),
  PageUp: operate => operate(perform(op.roll)),
  PageDown: operate => operate(perform(op.roll)),
  ArrowUp: operate => operate(perform(op.roll)),
  ArrowDown: operate => operate(perform(op.roll)),
  End: operate => operate(perform(op.swap)),
  ArrowRight: operate => operate(perform(op.swap)),
  ArrowLeft: operate => operate(perform(op.swap))
};

export const trimFrontZeros = (num: string): string => {
  let outStr = '';
  let hasEncounteredNonZero = false;
  num.split('').forEach(char => {
    if (char !== '0' && !hasEncounteredNonZero) hasEncounteredNonZero = true;
    if (char === '.' && outStr.length === 0) {
      outStr += '0.';
      return;
    }
    if (hasEncounteredNonZero) outStr += char;
  });
  return outStr;
};
