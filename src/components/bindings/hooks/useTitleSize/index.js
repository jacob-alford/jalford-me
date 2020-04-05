import { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const breakpoints = [746, 636, 520];

const h1MaxMin = [6, 5, 4, 3.5];
const maxValues = [6, 3.75, 3, 2.125, 1.5, 1.25];

const getMappedValue = (oldValue, oldMin, oldMax, newMin, newMax) =>
	newMin + ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin);

const getSizes = breakpoint => {
	return maxValues.map(value =>
		getMappedValue(value, 1.25, 6, 1.25, h1MaxMin[breakpoint])
	);
};

const interpTitleSizes = breakpoint => {
	const sizes = getSizes(breakpoint);
	return sizes.reduce((acc, current, index) => {
		acc[`h${index + 1}`] = `${current}rem`;
		return acc;
	}, {});
};

const getBreakpoint = breakpoints => {
	return breakpoints.indexOf(true) !== -1 ? breakpoints.indexOf(true) : 3;
};

const defaultTitleSizes = interpTitleSizes(1);

const totallyDefinedArray = (...items) => {
	return items.reduce(
		(acc, current) => acc && (current !== undefined || current !== null),
		true
	);
};

const pipe = (...funcArr) => {
	return funcArr.reduce(
		(aggregate, next) => {
			return (...funcs) => aggregate(next(...funcs));
		},
		val => val
	);
};

export default function useTitleSize() {
	const [titleStyles, setTitleStyles] = useState(defaultTitleSizes);
	const bkpt0 = useMediaQuery(`(min-width:${breakpoints[0]}px)`);
	const bkpt1 = useMediaQuery(`(min-width:${breakpoints[1]}px)`);
	const bkpt2 = useMediaQuery(`(min-width:${breakpoints[2]}px)`);
	useEffect(() => {
		if (totallyDefinedArray(bkpt0, bkpt1, bkpt2))
			setTitleStyles(pipe(interpTitleSizes, getBreakpoint)([bkpt0, bkpt1, bkpt2]));
	}, [bkpt0, bkpt1, bkpt2]);

	return titleStyles;
}
