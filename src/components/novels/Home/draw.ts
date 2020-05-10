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

type coordVector = [number, number];
const getLetters = (
  magenta: number,
  blue: number,
  orange: number
): [
  [coordVector, coordVector, coordVector, coordVector, coordVector, coordVector],
  [coordVector, coordVector, coordVector, coordVector, coordVector, coordVector]
] => {
  const a: coordVector = [0.5, magenta];
  const b: coordVector = [1 - blue, orange];
  const c: coordVector = [1 - blue, 1 - orange];
  const d: coordVector = [0.5, 1 - magenta];
  const e: coordVector = [blue, 1 - orange];
  const f: coordVector = [blue, orange];
  const A: coordVector = [0.5 - magenta / Math.tan(toRad(30)), 0];
  const B: coordVector = [0.5 + magenta / Math.tan(toRad(30)), 0];
  const C: coordVector = [1, 1 - orange - Math.tan(toRad(30)) * blue];
  const D: coordVector = [0.5 + magenta / Math.tan(toRad(30)), 1];
  const E: coordVector = [0.5 - magenta / Math.tan(toRad(30)), 1];
  const F: coordVector = [0, orange + Math.tan(toRad(30)) * blue];
  return [
    [e, d, c, b, a, f],
    [D, C, B, A, F, E]
  ];
};

const drawWindowFrame = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: store
): void => {
  const drawLine = (x0: number, y0: number, x1: number, y1: number): void => {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
  };
  const { magenta, blue, orange } = store;
  const [initalPoints, finalPoints] = getLetters(magenta, blue, orange);
  initalPoints.forEach(([x, y], index) => {
    drawLine(
      x * width,
      y * height,
      finalPoints[index][0] * width,
      finalPoints[index][1] * height
    );
  });
};

const drawCircle = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: store
): void => {
  if (store.lightning > 0) {
    const testValue2 = Math.random();
    if (testValue2 < 0.01) store.lightning = 1;
    const interpVal = store.lightning - Math.exp(-1.9 - store.lightning);
    if (interpVal > 0) store.lightning = interpVal;
    else store.lightning = 0;
    context.fillStyle = `rgba(225,225,255,${store.lightning * 0.85})`;
  } else context.fillStyle = 'rgba(0,0,0,0)';

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
  context.stroke();
};

export type store = {
  rainParticles: rainParticle[];
  lightning: number;
  apeSideLength: number;
  magenta: number;
  blue: number;
  orange: number;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

export const init = (params: {
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  store: store;
}) => {
  const { context, store, width, height } = params;
  const { apeSideLength: alpha } = store;
  store.magenta = 0.5 - alpha / 2 - alpha * Math.cos(toRad(60));
  store.blue = 0.5 - alpha * Math.sin(toRad(60));
  store.orange = 0.5 - alpha / 2;

  context.lineWidth = 10;
  store.rainParticles = new Array(8).fill(null).map(() => rainParticle(width, height));
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
  context.strokeStyle = '#c70066';
  if (Math.random() <= 0.00069) store.lightning = 1;
  drawCircle(context, width, height, store);
  drawWindowFrame(context, width, height, store);
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
