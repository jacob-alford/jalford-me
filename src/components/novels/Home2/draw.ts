export type store = null;

export const init = (params: {
	width: number;
	height: number;
	context: CanvasRenderingContext2D;
	store: store;
}) => {
	const { context } = params;
	context.lineWidth = 10;
};

export const draw = (params: {
	width: number;
	height: number;
	context: CanvasRenderingContext2D;
	store: store;
}): void => {
	const { width, height, context } = params;
	context.fillStyle = 'black';

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

export default draw;
