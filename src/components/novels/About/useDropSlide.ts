import { useRef } from 'react';
import { useSpring } from 'react-spring';
import { detectMobile } from 'functions';

const useDropSlide = (
	delay: number,
	shouldBeStraight: boolean,
	onStopCallback?: () => void
) => {
	return useSpring({
		to: async (
			next: (config: { transform: string; opacity: number }) => void
		) => {
			await next({
				transform: `translate3d(0px, 0vh, 0)`,
				opacity: 1
			});
			await next({
				transform: `translate3d(${
					shouldBeStraight ? 0 : Math.random() * 18 - 9
				}px, 0vh, 0)`,
				opacity: 1
			});
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
