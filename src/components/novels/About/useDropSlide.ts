import { useRef } from 'react';
import { useSpring } from 'react-spring';

const useDropSlide = (
	delay: number,
	shouldBeStraight: boolean,
	onStopCallback?: () => void
) => {
	const randomOffset = useRef(Math.random() * 24 - 12);
	const hasInited = useRef(false);
	return useSpring({
		to: async (next: (config: { transform: string; opacity: number }) => void) => {
			if (!hasInited.current)
				await next({
					transform: `translate3d(0px, 0vh, 0)`,
					opacity: 1
				});
			await next({
				transform: `translate3d(${shouldBeStraight ? 0 : randomOffset.current}px, 0vh, 0)`,
				opacity: 1
			});
			if (!hasInited.current) hasInited.current = true;
		},
		from: {
			transform: `translate3d(0px, -37px, 0)`,
			opacity: 0
		},
		config: {
			tension: 69,
			friction: 23,
			precision: 0.001
		},
		delay: shouldBeStraight ? 0 : delay,
		onRest: onStopCallback || (() => null)
	});
};
export default useDropSlide;
