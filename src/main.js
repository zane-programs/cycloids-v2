import State from "./utils/State";
import * as visualizations from "./visualizations";

(function main(window) {
  let currentVisualization = new State(window.location.hash.substring(1));

  showVisualization(currentVisualization.currentState);

  window.addEventListener(
    "hashchange",
    (event) => {
      currentVisualization.setState(new URL(event.newURL).hash.substring(1));
    },
    false
  );

  currentVisualization.addChangeListener(showVisualization);

  function showVisualization(visualizationName) {
    const visualization = visualizations[visualizationName];
    visualization && visualization.run();
  }
})(window);
