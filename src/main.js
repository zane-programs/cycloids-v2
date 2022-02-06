// Utils
import {
  generate as generateMatter,
  start as startMatter,
  clear as clearMatter,
} from "./utils/matter";
import { Console } from "./utils/console";

// Visualizations
import * as visualizations from "./visualizations";

// Default page title
const DEFAULT_TITLE = "Cycloid Simulations";

const messageConsole = new Console(document.getElementById("console"));

// Generate Matter.js engine, renderer, and runnner
const { engine, render, runner } = generateMatter({
  engineOptions: { timing: { timeScale: 1 } },
  renderOptions: { wireframes: false, width: 800, height: 300 },
});

// Run the program
main();

function main() {
  startMatter(engine, render, runner);

  // Observable State object holding current visualization
  let currentVisualization = window.location.hash.substring(1);

  // Show correct visualization on state change

  // Show current visualization
  showVisualization(currentVisualization);

  // When hash changes, set current visualiation accordingly
  window.addEventListener(
    "hashchange",
    (event) => {
      currentVisualization = new URL(event.newURL).hash.substring(1);
      showVisualization(currentVisualization);
    },
    false
  );
}

////// HELPER FUNCTIONS //////

function showVisualization(visualizationName) {
  // Find visualization by name
  const visualization = visualizations[visualizationName];

  // Ensure that the visualization exists
  if (!visualization) {
    console.log(`Visualization "${visualizationName}" does not exist`);
    return;
  }

  // Clear Matter.js engine
  clearMatter(engine, runner);

  // Clear message console
  messageConsole.clear();

  // Set document.title based on visualiztion name (if available)
  document.title = visualization.name || DEFAULT_TITLE;

  // Run visualization
  visualization.run({ engine, render, runner, messageConsole });
}
