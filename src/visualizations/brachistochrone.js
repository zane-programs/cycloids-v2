import { Bodies, Composite } from "matter-js";
import {
  drawParametric,
  parametricCycloid,
  parametricLCurve,
  parametricLine,
} from "../utils/graphing";

export const name = "Brachistochrone";

export function run({ engine, render, runner }) {
  console.log("Hello from the Brachistochrone! Lol");

  const ball = Bodies.polygon(150, 100, 80, 10, {
    isStatic: false,
    render: {
      fillStyle: "blue",
      strokeStyle: "blue",
    },
    restitution: 0,
  });

  const cycloid = drawParametric(parametricCycloid, 0, Math.PI, {
    step: 200,
    scaleFactor: 50,
    shift: { x: 250, y: 60 },
    thickness: 3,
  });

  const line = drawParametric(parametricLine, 0, Math.PI, {
    step: 200,
    scaleFactor: 50,
    shift: { x: 300, y: 150 },
    thickness: 3,
  });

  const lCurve = drawParametric(parametricLCurve, 0, Math.PI, {
    step: 300,
    scaleFactor: 50,
    shift: { x: 530, y: 150 },
    thickness: 3,
  });

  Composite.add(engine.world, [ball, ...cycloid, ...line, ...lCurve]);
}
