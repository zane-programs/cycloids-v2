import { Composite, Bodies } from "matter-js";

import {
  createBall,
  generateVerticesFromParametric,
  parametricCycloid,
} from "../utils/graphing";

export const name = "Tautochrone";

export function run({ engine, messageConsole }) {
  // set timescale for this demo - slow, but not as slow as brachistochrone
  engine.timing.timeScale = 0.2;

  messageConsole.log(
    "NOTE: The timeScale for the tautochrone simulation is 0.2, meaning 20% speed. Thank you!"
  );

  // create balls
  const ball1 = createBall(23, 60, 10, "#f00");
  const ball2 = createBall(373, 180, 10, "#ff0");
  const ball3 = createBall(673, 212, 10, "#0f0");

  const cycloidVertices = generateVerticesFromParametric(parametricCycloid, {
    from: 0,
    to: Math.PI,
    step: 1000,
    scaleFactor: 120,
  });
  cycloidVertices.push(
    ...cycloidVertices
      .slice()
      .map((vertex) => ({ x: vertex.x, y: vertex.y + 5 }))
      .reverse()
  );

  const cycloid = Bodies.fromVertices(200 - 50, 160, cycloidVertices, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "white",
    },
  });

  const cycloid2 = Bodies.fromVertices(400 - 50, 160, cycloidVertices, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "white",
    },
  });

  const cycloid3 = Bodies.fromVertices(600 - 50, 160, cycloidVertices, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "white",
    },
  });

  // add all of the bodies to the world
  Composite.add(engine.world, [
    cycloid,
    cycloid2,
    cycloid3,
    ball1,
    ball2,
    ball3,
  ]);
}
