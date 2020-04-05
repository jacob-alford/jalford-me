import React, { useRef, useState, useEffect, useCallback } from 'react';

const isVisible = (location, bounds) => bounds.innerHeight - location.top >= 150;

export default function useScrollTrigger(config = {}) {
	const { tester = isVisible, active = true } = config;
	const [triggered, setTriggered] = useState(false);
	const compRef = useRef(React.createRef());
	const elementInViewport = useCallback(() => {
		if (
			!triggered &&
			compRef.current &&
			tester(compRef.current.getBoundingClientRect(), window)
		)
			setTriggered(true);
	}, [tester, triggered]);
	useEffect(() => {
		if (compRef.current && tester(compRef.current.getBoundingClientRect(), window))
			setTriggered(true);
	}, [tester]);
	useEffect(() => {
		if (!triggered && active) window.addEventListener('scroll', elementInViewport);
		return () => window.removeEventListener('scroll', elementInViewport);
	}, [elementInViewport, triggered, active]);
	return [triggered, compRef];
}
