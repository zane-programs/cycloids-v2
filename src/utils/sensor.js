import { Bodies, Events } from "matter-js";

export function createSensor({ engine, x, y, width, height, onCollision }) {
  const sensor = Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    isSensor: true,
    render: {
      fillStyle: "transparent",
      strokeStyle: "transparent",
    },
  });

  // Referenced https://github.com/liabru/matter-js/blob/master/examples/sensors.js
  Events.on(engine, "collisionStart", function (event) {
    const pairs = event.pairs;

    for (let i = 0, j = pairs.length; i != j; ++i) {
      const pair = pairs[i];

      // If there is a collision with this sensor, run callback
      if (pair.bodyA === sensor || pair.bodyB === sensor) {
        onCollision();
      }
    }
  });

  return sensor;
}
