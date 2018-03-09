# Phaser Starter
This project is a Candy Crush clone made with the [Phaser HTML5 Game Framework](http://phaser.io/), Using assets and tutorials from _The Complete Mobile Game Development Course with Phaser_ by _Pablo Farias Navarro_ ([LINK](https://www.udemy.com/phaser-game-development/)). It uses a Node/Express server to serve static assets, and Mocha./Chai for unit testing.

## Requirements
You will need to have Node.js and npm installed in order to install additional dependencies. This project requires:

- "express": "^4.16.2" (Node.js Web Application Framework)
- "nodemon": "^1.17.1" (Monitors code changes and restarts Node.js server)
- "phaser": "^2.6.2" (HTML5 Game Framwork)
- "mocha": "^4.0.1" (Unit Testing Framework)
- "chai": "^4.1.2" (Testing Library)

## Installation
To install dependencies, run the following script in the terminal: `npm install`.

## Usage
When working on this project, run the following command from the root directory: `npm run dev-start` to start Nodemon. Nodemon will monitor your application for changes and then restart the server.

This repo saves the Phaser game as part of the `MyGame` object. If you want to change the `MyGame` object to a different name, go into `scripts/createGame.js`, `scripts/startGame.js`, `scripts/state/BootState.js`, `scripts/state/PreloadState.js`,  `scripts/state/HomeState.js`, and `scripts/state/GameState.js`, and change `MyGame` to whatever name you would like.

## Run tests
This application is setup for unit testing with Mocha/Chai. Tests can be stored in the `test/` directory.

**NOTE:** Your browser will likely throw an `Uncaught ReferenceError`. This is due to using `module.exports` in certain files for testing purposes. It is okay if this happens.

To run tests run either of the following command in the terminal:
`npm run test`
`mocha`
