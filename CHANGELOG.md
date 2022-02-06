# Changelog

## 2.3.1

### Changed

Clear the `public` folder upon build.

## 2.3.0

### Added

- Created full brachistochrone simulation
- Created sensors for brachistochrone simulation
- Created "console" for displaying messages on simulation page

### Changed

- Remove dependency on `State.js` (a state management class I made a while ago that's now unnecessary)

### Notes

**This is the final version!**

## 2.2.0

### Added

- Install [Matter.js](https://brm.io/matter-js) (physics engine)
- Install [poly-decomp](https://www.npmjs.com/package/poly-decomp) (decomposes concave polygons into several convex shapes)
  - This dependency is necessary for Matter.js to draw concave shapes
- Create wrapper for Matter.js to allow plug-and-play between visualization scripts and the main view
- Transfer and refactor code from my original tautochrone visualization (as well as some helper functions I created)
- Begin initial work on tautochrone visualization
- Create basic (temporary) menu for switching between animations

### Changed

- Remove "Hello, World!" heading on main page
- Change title in `./src/index.html` to Cycloid Simulations

### Notes

Parcel's dev server doesn't generate a fresh hash on content change, leading the browser to use a cached copy rather than the latest version. I'm investigating!

## 2.1.2

### Added

- Add `name` field to visualizations (backward-compatible)
- Change page title to `name` field of visualization when called
- Ensure that visualizations exist before setting page title and running

### Changed

- Removed unnecessary wrapper function in `./src/main.js`

## 2.1.1

### Added

- Add `/public` (new build directory) to gitignore

### Changed

- Add `--dist-dir public` to build command

## 2.1.0

### Added

- Install [Parcel](https://parceljs.org/) build tool
- Create gitignore
- Create main HTML page
- Initialize basic JavaScript boilerplate (using `window.location.hash` to switch visualizations)
- Add `start` and `build` scripts (`npm start` and `npm run build`)
- Add `"source"` field to `package.json`

### Changed

- Remove `"main"` field from `package.json`

## 2.0.1

### Added

- Changelog

## 2.0.0

**Initial commit**
