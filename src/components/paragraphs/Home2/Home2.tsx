import React, { useEffect, useRef } from 'react';

import { homeProps, House } from './st';

const Home = (props: homeProps) => {
	const { setHeaderIsOpen } = props;
	const canvas = useRef<HTMLCanvasElement>(null);
	const horizonPerc = useRef(0.45);
	useEffect(() => {
		setHeaderIsOpen(false);
	}, [setHeaderIsOpen]);
	useEffect(() => {
		const scrollSpy = (evt: Event) => {
			horizonPerc.current = window.scrollY / window.innerHeight + 0.45;
		};
		window.addEventListener('scroll', scrollSpy);
		return () => window.removeEventListener('scroll', scrollSpy);
	});
	useEffect(() => {
		if (canvas.current) {
			const context = canvas.current.getContext('2d');
			canvas.current.width = canvas.current.clientWidth;
			canvas.current.height = canvas.current.clientHeight;
			const width = canvas.current.clientWidth;
			const height = canvas.current.clientHeight;
			const getHeight = (x: number): number => Math.exp(-0.25 * x - 0.25);
			const getInitWidth = (x: number): number => (x + 12) / 24;
			const getNext = (x: number): number => {
				if (x <= 1) return 1;
				else return getNext(x - 1) + getNext(x - 2);
			};
			const getWidth = (x: number): number => {
				if (x === 0) return 0.5;
				else if (x > 0) {
					const next = getNext(x);
					return next;
				} else {
					const next = -1 * getNext(Math.abs(x)) + 1;
					return next;
				}
			};
			if (context) {
				context.strokeStyle = 'rgba(174,194,224,.25)';
				context.lineWidth = 4;
				const horizLines = (skylinePos: number): number => {
					let lastHeight = 0;
					for (let i = 0; i < 15; i++) {
						context.beginPath();
						const h =
							getHeight(i) * height * skylinePos + (1 - skylinePos) * height;
						context.moveTo(0, h);
						context.lineTo(width, h);
						context.stroke();
						if (i === 14) lastHeight = h;
					}
					return lastHeight;
				};
				const diagLines = (skylineH: number) => {
					for (let i = -12; i < 13; i++) {
						context.beginPath();
						context.moveTo(getInitWidth(i) * width, skylineH);
						context.lineTo(getWidth(i) * width, height);
						context.stroke();
					}
				};
				const drawSky = (skylineH: number) => {
					const grad = context.createLinearGradient(0, 0, 0, skylineH);
					grad.addColorStop(0, '#164B6B');
					grad.addColorStop(0.75, '#C70066');
					grad.addColorStop(1, '#C74F06');
					context.fillStyle = grad;
					context.fillRect(0, 0, width, skylineH);
				};
				const drawGround = (skylineH: number) => {
					const grad = context.createLinearGradient(0, skylineH, 0, height);
					grad.addColorStop(0, '#5C002F');
					grad.addColorStop(1, '#091E2B');
					context.fillStyle = grad;
					context.fillRect(0, skylineH, width, height);
				};
				const drawGrid = (skylineH: number, skylinePos: number) => {
					context.strokeStyle = `black`;
					horizLines(skylinePos);
					diagLines(skylineH);
				};
				let request: number;
				const draw = () => {
					request = requestAnimationFrame(draw);
					const skylinePos = horizonPerc.current;
					const skylineH =
						getHeight(14) * height * skylinePos + (1 - skylinePos) * height;
					drawSky(skylineH);
					drawGround(skylineH);
					drawGrid(skylineH, skylinePos);
				};
				requestAnimationFrame(draw);
				return () => cancelAnimationFrame(request);
			}
		}
	}, []);
	return <House ref={canvas}></House>;
};

export default Home;
