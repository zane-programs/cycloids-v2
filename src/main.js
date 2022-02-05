import State from "./utils/State";
import * as visualizations from "./visualizations";

const DEFAULT_TITLE = "Cycloid Simulations";

// Observable State object holding current visualization
let currentVisualization = new State(window.location.hash.substring(1));

// Show correct visualization on state change
currentVisualization.addChangeListener(showVisualization);

// Show current visualization
showVisualization(currentVisualization.currentState);

// When hash changes, set current visualiation accordingly
window.addEventListener(
  "hashchange",
  (event) => {
    currentVisualization.setState(new URL(event.newURL).hash.substring(1));
  },
  false
);

////// HELPER FUNCTIONS //////

function showVisualization(visualizationName) {
  // Find visualization by name
  const visualization = visualizations[visualizationName];

  // Ensure that the visualization exists
  if (!visualization)
    throw new Error(`Visualization ${visualizationName} does not exist`);

  // Set document.title based on visualiztion name (if available)
  document.title = visualization.name || DEFAULT_TITLE;

  // Run visualization
  visualization.run();
}
