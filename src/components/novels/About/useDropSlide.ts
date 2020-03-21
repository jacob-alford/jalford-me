import { useSpring } from 'react-spring';

const useDropSlide = (delay: number, shouldBeStraight: boolean) =>
	useSpring({
		to: async (next: (config: { transform: string }) => void) => {
			await next({
				transform: `translate3d(0px, 0vh, 0)`
			});
			await next({
				transform: `translate3d(${
					shouldBeStraight ? 0 : Math.random() * 30 - 15
				}px, 0vh, 0)`
			});
		},
		from: {
			transform: `translate3d(0px, -200vh, 0)`
		},
		delay: shouldBeStraight ? 0 : delay
	});

export default useDropSlide;
