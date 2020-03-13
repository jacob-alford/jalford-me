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
const getInitWidth = (x: number): number => (x + 12) / 24;
const getHeight = (x: number): number => Math.exp(-0.25 * x - 0.25);
const getNext = (x: number): number => {
	if (x <= 1) return 1;
	else return getNext(x - 1) + getNext(x - 2);
};

export type store = {
	drawSky?: (skylineH: number) => void;
	drawGrid?: (skylineH: number, skylinePos: number) => void;
	drawGround?: (skylineH: number) => void;
};

export const init = (params: {
	height: number;
	width: number;
	context: CanvasRenderingContext2D;
	store: store;
}): void => {
	const { store, context, height, width } = params;
	const horizLines = (skylinePos: number): number => {
		let lastHeight = 0;
		for (let i = 0; i < 15; i++) {
			context.beginPath();
			const h = getHeight(i) * height * skylinePos + (1 - skylinePos) * height;
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
	store.drawSky = (skylineH: number) => {
		const grad = context.createLinearGradient(0, 0, 0, skylineH);
		grad.addColorStop(0, '#164B6B');
		grad.addColorStop(0.75, '#C70066');
		grad.addColorStop(1, '#C74F06');
		context.fillStyle = grad;
		context.fillRect(0, 0, width, skylineH);
	};
	store.drawGround = (skylineH: number) => {
		const grad = context.createLinearGradient(0, skylineH, 0, height);
		grad.addColorStop(0, '#5C002F');
		grad.addColorStop(1, '#091E2B');
		context.fillStyle = grad;
		context.fillRect(0, skylineH, width, height);
	};
	store.drawGrid = (skylineH: number, skylinePos: number) => {
		context.strokeStyle = `black`;
		horizLines(skylinePos);
		diagLines(skylineH);
	};
};

export const draw = (horizonPerc: number) => (params: {
	height: number;
	width: number;
	context: CanvasRenderingContext2D;
	store: store;
}): void => {
	const { height, store } = params;
	const { drawSky, drawGround, drawGrid } = store || {};
	const skylinePos = horizonPerc;
	const skylineH =
		getHeight(14) * height * skylinePos + (1 - skylinePos) * height;
	if (drawSky) drawSky(skylineH);
	if (drawGround) drawGround(skylineH);
	if (drawGrid) drawGrid(skylineH, skylinePos);
};
