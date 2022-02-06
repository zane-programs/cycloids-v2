import { Composite } from "matter-js";
import {
  createBall,
  drawParametric,
  parametricCycloid,
  parametricLCurve,
  parametricLine,
} from "../utils/graphing";
import { createSensor } from "../utils/sensor";

export const name = "Brachistochrone";

const GRAPH_THICKNESS = 5;
const GRAPH_LOWER_BOUND_X = 0;
const GRAPH_UPPER_BOUND_X = Math.PI;

export function run({ engine, messageConsole }) {
  // Set time-scale (should be slow for this visualization)
  engine.timing.timeScale = 0.1;

  messageConsole.log(
    "NOTE: The timeScale for the brachistochrone simulation is 0.1, meaning 10% speed. Thank you!"
  );

  // create balls
  const ball1 = createBall(106, 65, 10, "#f00");
  const ball2 = createBall(345, 55, 10, "#ff0");
  const ball3 = createBall(563, 45, 10, "#0f0");

  // draw cycloid from 0 to π
  // (see src/utils/graphing.js for the formula)
  const cycloid = drawParametric(parametricCycloid, {
    from: GRAPH_LOWER_BOUND_X,
    to: GRAPH_UPPER_BOUND_X,
    step: 200,
    scaleFactor: 50,
    shift: { x: 250, y: 60 },
    thickness: GRAPH_THICKNESS,
  });

  // draw L-shaped curve from 0 to π
  // (see src/utils/graphing.js for the formula)
  const lCurve = _drawLCurve();

  // draw (negative-slope) line from 0 to π
  // (see src/utils/graphing.js for the formula)
  const line = drawParametric(parametricLine, {
    from: GRAPH_LOWER_BOUND_X,
    to: GRAPH_UPPER_BOUND_X,
    step: 100,
    scaleFactor: 50,
    shift: { x: 550, y: 150 },
    thickness: GRAPH_THICKNESS,
  });

  const cycloidSensor = createSensor({
    engine,
    x: 260,
    y: 160,
    width: 20,
    height: 50,
    onCollision: () => messageConsole.log("Cycloid"),
  });

  const lCurveSensor = createSensor({
    engine,
    x: 499,
    y: 160,
    width: 20,
    height: 50,
    onCollision: () => messageConsole.log("L-Curve"),
  });

  const lineSensor = createSensor({
    engine,
    x: 720,
    y: 160,
    width: 20,
    height: 50,
    onCollision: () => messageConsole.log("Line"),
  });

  Composite.add(engine.world, [
    ball1,
    ball2,
    ball3,
    ...cycloid,
    ...lCurve,
    ...line,
    cycloidSensor,
    lCurveSensor,
    lineSensor,
  ]);
}

// I draw the L-curve in two parts because the first
// part (0 ≤ t ≤ 0.15) necessitates much more detail
// than the rest, as it's an exponential function.
// If I didn't do it this way, you'd see a lot of
// separate squares disconnected from each other,
// and the ball wouldn't travel well.
function _drawLCurve() {
  const lCurveP1 = drawParametric(parametricLCurve, {
    from: GRAPH_LOWER_BOUND_X,
    to: 0.15,
    step: 500, // more dense than the other curves to mitigate gaps at low t-values
    scaleFactor: 50,
    shift: { x: 330, y: 150 },
    thickness: GRAPH_THICKNESS,
  });

  const lCurveP2 = drawParametric(parametricLCurve, {
    from: 0.15,
    to: GRAPH_UPPER_BOUND_X,
    step: 100,
    scaleFactor: 50,
    shift: { x: 330, y: 150 },
    thickness: GRAPH_THICKNESS,
  });

  // Combine the two parts into one array
  return [...lCurveP1, ...lCurveP2];
}
