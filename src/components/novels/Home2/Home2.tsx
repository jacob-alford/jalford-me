import React, { useRef, useEffect } from 'react';

import useCanvas from 'components/bindings/hooks/useCanvas/useCanvas';
import { draw, store } from './draw';
import { Splash, Orbital } from './style';

const Home = () => {
	const orbitCnv = useCanvas<store>(draw, null);
	return (
		<Splash>
			<Orbital ref={orbitCnv} />
		</Splash>
	);
};

export default Home;
