import React, { useEffect, useRef } from 'react';

import useCanvas from 'components/bindings/hooks/useCanvas/useCanvas';
import { homeProps, House, Landscape } from './st';
import { draw, init, store } from './draw';

const Background = () => {
	const horizonPerc = useRef(0.75);
	const canvas = useCanvas<store>(
		params => {
			const { store } = params;
			store.horizonPerc = horizonPerc.current;
			draw(params);
		},
		{ horizonPerc: 0 },
		init
	);
	useEffect(() => {
		const scrollSpy = (evt: Event) => {
			horizonPerc.current = 0.75 - window.scrollY / window.innerHeight;
		};
		window.addEventListener('scroll', scrollSpy);
		return () => window.removeEventListener('scroll', scrollSpy);
	}, []);
	return (
		<Landscape>
			<House ref={canvas}></House>
		</Landscape>
	);
};

export default Background;
