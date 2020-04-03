import React from 'react';
import { useSpring } from 'react-spring';
import useCanvas from 'components/bindings/hooks/useCanvas/useCanvas';
import { draw, store, init } from './draw';
import { Splash, Orbital } from './style';
import Title from 'components/words/BigTitle/BigTitle';

const Home = () => {
	const orbitCnv = useCanvas<store>(
		draw,
		{
			rainParticles: [],
			lightning: 0,
			apeSideLength: Math.exp(-1) - 7 / 200,
			magenta: 0,
			blue: 0,
			orange: 0
		},
		init
	);
	const [titleFade, setTitleFade] = useSpring(() => ({
		transform: `translate3d(0,-50px,0)`,
		opacity: 0,
		from: {
			transform: `translate3d(0,-50px,0)`,
			opacity: 0
		},
		config: {
			tension: 69,
			friction: 42,
			precision: 0.0001
		}
	}));
	const zoom = useSpring({
		transform: `scale3d(1,1,1)`,
		opacity: 1,
		from: {
			transform: `scale3d(0,0,0)`,
			opacity: 0
		},
		config: {
			tension: 69,
			friction: 23,
			precision: 0.0001
		},
		onRest: () =>
			setTitleFade({ transform: `translate3d(0,0px,0)`, opacity: 1 })
	});

	return (
		<Splash>
			<Title style={titleFade}>jalford</Title>
			<Orbital style={zoom} ref={orbitCnv} />
		</Splash>
	);
};

export default Home;
