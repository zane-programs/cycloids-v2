import { Bodies } from "matter-js";

export function createBall(x, y, radius, color) {
  // Because Matter.js circles are actually just
  // many-sided polygons (13-sided if I'm not
  // mistaken), I instead create my *own* polygons
  // with enough sides that problems with bouncing
  // are mostly mitigated. This "ball" works much
  // more smoothly than an actual circle in Matter.js.

  return Bodies.polygon(x, y, 8 * radius, radius, {
    isStatic: false,
    render: {
      fillStyle: color,
      strokeStyle: color,
    },
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    restitution: 0,
  });
}

export function drawParametric(fn, config) {
  const vertices = generateVerticesFromParametric(fn, config);

  const thickness = config.thickness || 1;
  const color = config.color || "#fff";

  return vertices.map((vertex) =>
    Bodies.rectangle(vertex.x, vertex.y, thickness, thickness, {
      isStatic: true,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      restitution: 0,
      render: {
        fillStyle: color,
        strokeStyle: color,
      },
    })
  );
}

export function generateVerticesFromParametric(fn, config) {
  const { from, to, step, scaleFactor, shift } = config;
  const shiftX = shift ? shift.x : 0;
  const shiftY = shift ? shift.y : 0;

  const vertices = generateRange(from, to, step).map((t) =>
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
  return { x: t, y: -2 * Math.pow(Math.E, -(12 * t)) };
}

export function generateRange(from, to, step = 1) {
  let incrementSize = (to - from) / step;

  return Array(step + 1)
    .fill()
    .map((_item, index) => from + incrementSize * index);
}

function _scale({ x, y }, factor) {
  return { x: x * factor, y: y * factor };
}

function _shift({ x, y }, xShift, yShift) {
  return { x: x + xShift, y: y + yShift };
}
