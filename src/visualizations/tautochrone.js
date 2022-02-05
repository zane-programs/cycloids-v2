import { Composite, Bodies } from "matter-js";

import {
  generateVerticesFromParametric,
  parametricCycloid,
} from "../utils/graphing";

export const name = "Tautochrone";

export function run({ engine, render, runner }) {
  console.log("Hello from the Tautochrone!");

  /* BEGIN CODE BARF */

  // create balls
  var ball1 = Bodies.polygon(23, 100, 80, 10, {
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    restitution: 0,
    // zIndex: 5,
    render: {
      fillStyle: "red",
      strokeStyle: "red",
    },
  });
  var ball2 = Bodies.polygon(73 + 300, 220, 80, 10, {
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    restitution: 0,
    // zIndex: 5,
    render: {
      fillStyle: "#00ff00",
      strokeStyle: "#00ff00",
    },
  });
  var ball3 = Bodies.polygon(73 + 600, 252, 80, 10, {
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    restitution: 0,
    // zIndex: 5,
    render: {
      fillStyle: "blue",
      strokeStyle: "blue",
    },
  });

  const cycloidVertices = generateVerticesFromParametric(
    parametricCycloid,
    0,
    Math.PI,
    {
      step: 1000,
      scaleFactor: 120,
    }
  );
  cycloidVertices.push(
    ...cycloidVertices
      .slice()
      .map((vertex) => ({ x: vertex.x, y: vertex.y + 5 }))
      .reverse()
  );

  const cycloid = Bodies.fromVertices(200 - 50, 200, cycloidVertices, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "white",
    },
  });

  const cycloid2 = Bodies.fromVertices(400 - 50, 200, cycloidVertices, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "white",
    },
  });

  const cycloid3 = Bodies.fromVertices(600 - 50, 200, cycloidVertices, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "white",
    },
  });

  var ground = Bodies.rectangle(400, 610, 810, 60, {
    isStatic: true,
    friction: 0,
    // chamfer: { radius: 20 },
    render: {
      fillStyle: "#cccccc",
      strokeStyle: "#cccccc",
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
    ground,
  ]);
}
