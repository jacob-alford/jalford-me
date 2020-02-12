import React, { FunctionComponent } from 'react';

import {
	makeSingleOp,
	makeDoubleOp,
	makeConstant,
	text,
	symText
} from './_constructors';

import { op, colorClass as colorClasses, operators as opsForm } from './_types';

const operators: opsForm = {
	[op.sin]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.sin,
		fn: Math.sin
	}),
	[op.cos]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.cos,
		fn: Math.cos
	}),
	[op.tan]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.tan,
		fn: Math.tan
	}),
	[op.asin]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.asin,
		fn: Math.asin
	}),
	[op.acos]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.acos,
		fn: Math.acos
	}),
	[op.atan]: makeSingleOp({
		colorClass: colorClasses.function,
		type: op.atan,
		fn: Math.atan
	}),
	[op.pi]: makeConstant({
		colorClass: colorClasses.function,
		constant: Math.PI,
		type: op.atan,
		render: symText('&pi;')
	}),
	[op.speedOfLight]: makeConstant({
		colorClass: colorClasses.function,
		constant: 299792458,
		type: op.speedOfLight,
		render: text('c')
	})
};

export { operators };
