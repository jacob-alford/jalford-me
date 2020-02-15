import { op, colorClass } from './useCalcBrain/operators/_types';
import { npButt, funcButt } from './useTyper/_types';

import {
	StackOp,
	Operation1,
	Operation2,
	Entry,
	Danger
} from './words/controls';

export const entryRows: (op | npButt)[][] = [
	[op.drop, op.roll, op.swap],
	[npButt.seven, npButt.eight, npButt.nine],
	[npButt.four, npButt.five, npButt.six],
	[npButt.one, npButt.two, npButt.three],
	[npButt.dot, npButt.zero, npButt.pm]
];

export const operationRows: (op | funcButt)[][] = [
	[funcButt.degRad, funcButt.constant, funcButt.stat, op.xInv],
	[op.add, op.sub, op.div, op.mul],
	[op.sin, op.cos, op.tan, op.sqrt],
	[op.asin, op.acos, op.atan, op.xRty],
	[op.log10, op.log2, op.ln, op.yX],
	[op.tenX, op.twoX, op.eX, op.x2]
];

export const mapTypeToComponent = {
	[colorClass.stackOp]: StackOp,
	[colorClass.singleOp]: Operation1,
	[colorClass.doubleOp]: Operation2,
	[colorClass.danger]: Danger,
	[colorClass.type]: Entry
};
