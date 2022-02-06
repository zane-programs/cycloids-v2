// Matter.js (physics engine)
import {
  Bodies,
  Composite,
  Engine,
  Render,
  Resolver,
  Runner,
  World,
} from "matter-js";

// poly-decomp (decompose concave shapes into several convex shapes)
import decomp from "poly-decomp";

// Make poly-decomp available to Matter.js
window.decomp = decomp;

// > "It appears to be because the resolver considers slow collisions
// > to be 'resting' under a certain threshold. It's possible to lower
// > the threshold and it seems to fix the issue"  -liabru
// The resolver's default threshold for slow collisions is too high for
// my simulation, so I've scaled it down to 0.01. This change ensures
// that my friction settings for these simulations will work exactly as
// I expect.
// See https://github.com/liabru/matter-js/issues/394#issuecomment-289913662
Resolver._restingThresh = 0.001;

export function generate(options) {
  // Create physics engine
  const engine = Engine.create(options.engineOptions || {});

  // Create renderer
  const render = Render.create({
    canvas: document.getElementById("render"),
    engine: engine,
    options: options.renderOptions || { wireframes: false },
  });

  // Create runner
  var runner = Runner.create();

  // Draw ground at the bottom of the visualization
  _drawGround(engine);

  return { engine, render, runner };
}

export function start(engine, render, runner) {
  Render.run(render);
  Runner.run(runner, engine);
}

export function clear(engine) {
  // Had some help from https://stackoverflow.com/a/60195773
  // Clear physics engine
  Engine.clear(engine);

  // Reset time-scale
  engine.timing.timeScale = 1;

  // Clear screen
  World.clear(engine.world);

  // Redraw the ground
  _drawGround(engine);
}

function _drawGround(engine) {
  // Draw ground
  const ground = Bodies.rectangle(400, 300, 810, 25, {
    isStatic: true,
    friction: 0,
    render: {
      fillStyle: "#cccccc",
      strokeStyle: "#cccccc",
    },
  });

  Composite.add(engine.world, [ground]);
}
