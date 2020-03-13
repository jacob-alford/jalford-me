export type store = null;

export const draw = (params: {
	width: number;
	height: number;
	context: CanvasRenderingContext2D;
	store: store;
}): void => {
	const { width, height, context } = params;
	const grad = context.createLinearGradient(0, 0, 0, height);
	grad.addColorStop(0, '#164B6B');
	grad.addColorStop(0.75, '#C70066');
	grad.addColorStop(1, '#C74F06');
	context.fillStyle = grad;

	context.beginPath();
	context.ellipse(
		width / 2,
		height / 2,
		width / 2,
		height / 2,
		0,
		0,
		Math.PI * 2
	);
	context.fill();
};

export default draw;
