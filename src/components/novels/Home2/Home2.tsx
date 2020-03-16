import React from 'react';

import useCanvas from 'components/bindings/hooks/useCanvas/useCanvas';
import { draw, store, init } from './draw';
import { Splash, Orbital, Title } from './style';

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
	return (
		<Splash>
			<Title />
			<Orbital ref={orbitCnv} />
		</Splash>
	);
};

export default Home;
