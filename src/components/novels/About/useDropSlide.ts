import { useSpring } from 'react-spring';

const useDropSlide = (
	delay: number,
	shouldBeStraight: boolean,
	onStopCallback?: () => void
) =>
	useSpring({
		to: async (next: (config: { transform: string }) => void) => {
			await next({
				transform: `translate3d(0px, 0vh, 0)`
			});
			await next({
				transform: `translate3d(${
					shouldBeStraight ? 0 : Math.random() * 18 - 9
				}px, 0vh, 0)`
			});
		},
		from: {
			transform: `translate3d(0px, -200vh, 0)`
		},
		config: {
			tension: 69,
			friction: 23,
			precision: 0.001
		},
		delay: shouldBeStraight ? 0 : delay,
		onRest: onStopCallback || (() => null)
	});

export default useDropSlide;
