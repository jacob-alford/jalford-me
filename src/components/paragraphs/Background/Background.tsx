import React, { useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';
import useCanvas from 'components/bindings/hooks/useCanvas/useCanvas';
import { House, Landscape } from './st';
import { draw, init, store } from './draw';

const Background = (props: { children: any }) => {
	const { children } = props;
	const horizonPerc = useRef(0.613);
	const canvas = useCanvas<store>(
		params => {
			const { store } = params;
			store.horizonPerc = horizonPerc.current;
			draw(params);
		},
		{ horizonPerc: 0 },
		init
	);
	const fade = useSpring({
		opacity: 1,
		from: {
			opacity: 0
		},
		config: {
			tension: 69,
			friction: 42,
			precision: 0.0001
		}
	});
	useEffect(() => {
		const scrollSpy = (evt: Event) => {
			horizonPerc.current = 0.613 - window.scrollY / window.innerHeight;
		};
		window.addEventListener('scroll', scrollSpy);
		return () => window.removeEventListener('scroll', scrollSpy);
	}, []);
	return (
		<Landscape style={fade}>
			{children}
			<House ref={canvas}></House>
		</Landscape>
	);
};

export default Background;
