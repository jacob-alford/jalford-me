interface rainParticle {
	x: number;
	y: number;
	dx: number;
	dy: number;
	length: number;
	opacity: number;
}
const rainParticle = (width: number, height: number): rainParticle => ({
	x: Math.random() * width,
	y: Math.random() * height,
	dx: Math.random() * 0.4 - 0.05,
	dy: Math.random() * 20 + 4,
	length: Math.random() * (height / 420) + 5,
	opacity: Math.random() * 0.25 + 0.025
});
const fall = (
	particle: rainParticle,
	width: number,
	height: number
): [number, number] => {
	particle.x += particle.dx;
	particle.y += particle.dy;
	if (particle.x > width || particle.y > height) {
		particle.x = Math.random() * width;
		particle.y = -20;
	}
	return [particle.x, particle.y];
};

const drawWindowFrame = (
	context: CanvasRenderingContext2D,
	width: number,
	height: number
): void => {
	context.beginPath();
	context.moveTo(0, height / 2);
	context.lineTo(width, height / 2);
	context.stroke();
	context.beginPath();
	context.moveTo(width / 2, 0);
	context.lineTo(width / 2, height);
	context.stroke();
};

const drawCircle = (
	context: CanvasRenderingContext2D,
	width: number,
	height: number
): void => {
	const grad = context.createLinearGradient(width / 2, 0, width / 2, height);
	grad.addColorStop(0, '#0f0c29');
	grad.addColorStop(0.5, '#302b63');
	grad.addColorStop(1, '#24243e');
	context.fillStyle = grad;

	context.beginPath();
	context.ellipse(
		width / 2,
		height / 2,
		width / 2 - 10,
		height / 2 - 10,
		0,
		0,
		Math.PI * 2
	);
	context.fill();
	context.strokeStyle = 'white';
	context.stroke();
};

export type store = { rainParticles: rainParticle[] };

export const init = (params: {
	width: number;
	height: number;
	context: CanvasRenderingContext2D;
	store: store;
}) => {
	const { context, store, width, height } = params;
	context.lineWidth = 10;
	store.rainParticles = new Array(5)
		.fill(null)
		.map(() => rainParticle(width, height));
	context.beginPath();
	context.ellipse(
		width / 2,
		height / 2,
		width / 2 - 10,
		height / 2 - 10,
		0,
		0,
		Math.PI * 2
	);
	context.clip();
	context.fill();
	context.strokeStyle = 'white';
	context.stroke();
	context.beginPath();
	context.moveTo(0, height / 2);
	context.lineTo(width, height / 2);
	context.stroke();
	context.beginPath();
	context.moveTo(width / 2, 0);
	context.lineTo(width / 2, height);
	context.stroke();
	context.lineWidth = 4;
};

export const draw = (params: {
	width: number;
	height: number;
	context: CanvasRenderingContext2D;
	store: store;
}): void => {
	const { width, height, context, store } = params;
	context.clearRect(0, 0, width, height);
	drawCircle(context, width, height);
	drawWindowFrame(context, width, height);
	context.strokeStyle = 'white';
	store.rainParticles.forEach(particle => {
		const { x, y, dx, dy, length } = particle;
		context.strokeStyle = `rgba(174,194,224,${particle.opacity})`;
		context.beginPath();
		context.moveTo(particle.x, particle.y);
		context.lineTo(x + length * dx, y + length * dy);
		context.stroke();
		fall(particle, width, height);
	});
};

export default draw;
