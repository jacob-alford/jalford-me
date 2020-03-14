import React, { useRef, useEffect } from 'react';

import useCanvas from 'components/bindings/hooks/useCanvas/useCanvas';
import { draw, store, init } from './draw';
import { Splash, Orbital } from './style';

const Home = () => {
	const orbitCnv = useCanvas<store>(draw, null, init);
	return (
		<Splash>
			<Orbital ref={orbitCnv} />
		</Splash>
	);
};

export default Home;
