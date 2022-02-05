# Changelog

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
