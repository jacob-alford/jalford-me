import concat from 'lodash/concat';
import dropRight from 'lodash/dropRight';
import slice from 'lodash/slice';

import { getRandomUID } from 'functions';

import { operator, op, tapeItem, calcError, stackItem } from './_types';

import { drEnum } from '../../RPN';

const shouldExp = (num: number): boolean => {
  const str = num.toString();
  const isTenOne = (str.split('.')[0] || '').length === 1;
  if ((!isTenOne && str.length > 12) || str.includes('e')) return true;
  else return false;
};

export const shortNum = (num: number): string => {
  if (shouldExp(num)) return num.toExponential();
  else return num.toLocaleString();
};

const toNumbers = (stack: stackItem[]): number[] => stack.map(({ number }) => number);

const toStackItem = (number: number, UID: string): stackItem => ({
  number,
  UID
});

const toStack = (numbers: number[], UID: string): stackItem[] =>
  numbers.map(number => toStackItem(number, UID));

export const getLast = (stack: stackItem[]): number => stack[stack.length - 1].number;

export const getNextToLast = (stack: stackItem[]): number =>
  stack[stack.length - 2].number;

const getLastUID = (stack: stackItem[]): string =>
  (stack[stack.length - 1] || { UID: getRandomUID() }).UID;

export const formatList = (arr: number[]): string => {
  return `${slice(arr, 0, 3)
    .map(num => shortNum(num))
    .join(',')}${(arr.length > 3 && ', ...') || ''}`;
};

export const makeError = (bool: boolean, str: string): calcError =>
  (!bool && str) || null;

const condConvertTrig = (
  requiresTrigConversion: boolean,
  degOrRad: drEnum,
  value: number
): number =>
  requiresTrigConversion
    ? degOrRad === drEnum.deg
      ? (Math.PI / 180) * value
      : value
    : value;
const condConvertBack = (
  requiresTrigConversion: boolean,
  degOrRad: drEnum,
  value: number
): number =>
  requiresTrigConversion
    ? degOrRad === drEnum.deg
      ? (180 / Math.PI) * value
      : value
    : value;

export const makeReducer = (config: {
  type: op;
  toTape?: (stack: stackItem[]) => tapeItem;
  fn: (input: number[]) => number[];
  error?: (stack: stackItem[]) => calcError;
}): operator => {
  const {
    type,
    fn,
    error = (): calcError => null,
    toTape = (stack: stackItem[]): tapeItem => [
      `${type}(${formatList(toNumbers(stack))})`,
      `${shortNum(fn(toNumbers(stack))[0])}`,
      getRandomUID()
    ]
  } = config;
  const preVerify = (stack: stackItem[]): boolean => stack.length > 0;
  const act = (stack: stackItem[]): stackItem[] =>
    toStack(fn(toNumbers(stack)), getLastUID(stack));
  return {
    type,
    act,
    preVerify,
    toTape,
    error
  };
};

export const makeSingleOp = (config: {
  type: op;
  toTape?: (stack: stackItem[]) => tapeItem;
  fn: (input: number) => number;
  error?: (stack: stackItem[]) => calcError;
  requiresTrigConversion?: boolean;
  requiresInverseTrigConversion?: boolean;
}): operator => {
  const {
    type,
    fn,
    requiresTrigConversion,
    requiresInverseTrigConversion,
    error = (): calcError => null,
    toTape = (stack: stackItem[], payload?: number, degOrRad?: drEnum): tapeItem => [
      `${type}(${shortNum(getLast(stack))})`,
      `${shortNum(
        condConvertBack(
          Boolean(requiresInverseTrigConversion),
          degOrRad || drEnum.rad,
          fn(
            condConvertTrig(
              Boolean(requiresTrigConversion),
              degOrRad || drEnum.rad,
              getLast(stack)
            )
          )
        )
      )}`,
      getRandomUID()
    ]
  } = config;
  const preVerify = (stack: stackItem[]): boolean => stack.length > 0;
  const act = (
    stack: stackItem[],
    payload?: number,
    UID?: string,
    degOrRad?: drEnum
  ): stackItem[] =>
    concat(
      dropRight(stack),
      toStackItem(
        condConvertBack(
          Boolean(requiresInverseTrigConversion),
          degOrRad || drEnum.rad,
          fn(
            condConvertTrig(
              Boolean(requiresTrigConversion),
              degOrRad || drEnum.rad,
              getLast(stack)
            )
          )
        ),
        getLastUID(stack)
      )
    );
  return {
    type,
    act,
    preVerify,
    toTape,
    error,
    requiresTrigConversion
  };
};

export const makeDoubleOp = (config: {
  type: op;
  toTape?: (stack: stackItem[]) => tapeItem;
  fn: (input1: number, input2: number) => number;
  error?: (stack: stackItem[]) => calcError;
  requiresTrigConversion?: boolean;
}): operator => {
  const {
    type,
    fn,
    requiresTrigConversion,
    error = (): calcError => null,
    toTape = (stack: stackItem[]): tapeItem => [
      `${type}(${shortNum(getLast(stack))}, ${shortNum(getNextToLast(stack))})`,
      `${shortNum(fn(getLast(stack), getNextToLast(stack)))}`,
      getRandomUID()
    ]
  } = config;
  const preVerify = (stack: stackItem[]): boolean => stack.length >= 2;
  const act = (stack: stackItem[]): stackItem[] =>
    concat(
      dropRight(stack, 2),
      toStackItem(fn(getLast(stack), getNextToLast(stack)), getLastUID(stack))
    );
  return {
    type,
    act,
    preVerify,
    toTape,
    error,
    requiresTrigConversion
  };
};

export const makeConstant = (config: { type: op; constant: number }): operator => {
  const { type, constant } = config;
  const toTape = (): tapeItem => [`${type}`, `${shortNum(constant)}`, getRandomUID()];
  const error = (): calcError => null;
  const preVerify = (): boolean => true;
  const act = (stack: stackItem[]): stackItem[] =>
    concat(stack, toStackItem(constant, getRandomUID()));
  return {
    type,
    act,
    preVerify,
    toTape,
    error
  };
};
