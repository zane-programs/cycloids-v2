import { Bodies } from "matter-js";

export function drawParametric(fn, from, to, config) {
  const vertices = generateVerticesFromParametric(fn, from, to, config);

  const thickness = config.thickness || 1;

  return vertices.map((vertex) =>
    Bodies.rectangle(vertex.x, vertex.y, thickness, thickness, {
      isStatic: true,
      friction: 0,
      render: {
        fillStyle: "#fff",
        strokeStyle: "#fff",
      },
    })
  );
}

export function generateVerticesFromParametric(fn, from, to, config) {
  const { step, scaleFactor, shift } = config;
  const shiftX = shift ? shift.x : 0;
  const shiftY = shift ? shift.y : 0;

  const vertices = _generateRange(from, to, step).map((t) =>
    _shift(_scale(fn(t), scaleFactor || 1), shiftX, shiftY)
  );

  return vertices;
}

export function parametricCycloid(t) {
  return { x: -Math.sin(t) - t, y: Math.cos(t) + 1 };
}

export function parametricLine(t) {
  return { x: t, y: -((-2 / Math.PI) * t + 2) };
}

export function parametricLCurve(t) {
  // return { x: t, y: -Math.pow(t + Math.pow(0.5, 1 / 30), -30) };
  return { x: t, y: -2 * Math.pow(Math.E, -(4 * t)) };
}

function _scale({ x, y }, factor) {
  return { x: x * factor, y: y * factor };
}

function _shift({ x, y }, xShift, yShift) {
  return { x: x + xShift, y: y + yShift };
}
function _generateRange(from, to, step = 1) {
  let incrementSize = (to - from) / step;

  return Array(step + 1)
    .fill()
    .map((_item, index) => from + incrementSize * index);
}
