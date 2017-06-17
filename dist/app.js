(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JAM"] = factory();
	else
		root["JAM"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* exports provided: default */
/* exports used: default */
/*!*********************************!*\
  !*** ./src/global/playState.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  preload: function () {
    // background
    this.game.load.image('background', 'assets/images/background.png');

    // levels
    this.game.load.json('level:1', 'data/level00.json');

    // colonies
    this.game.load.image('colony:neutral', 'assets/images/colony_neutral.png');
    this.game.load.image('colony:enemy', 'assets/images/colony_enemy.png');
    this.game.load.image('colony:ally', 'assets/images/colony_ally.png');
  },

  create: function () {
    this.game.add.image(0, 0, 'background');

    this._loadLevel(this.game.cache.getJSON('level:1'));
  },

  _loadLevel: function (data) {
    data.colonies.forEach(this._spawnColony, this);
  },

  _spawnColony: function (colony) {
    this.game.add.sprite(colony.x, colony.y, colony.image);
  }
});

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_playState__ = __webpack_require__(/*! ./global/playState */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_videoDemoState__ = __webpack_require__(/*! ./global/videoDemoState */ 2);



const WORLD_SIZE = {
  height: 414,
  width: 736
};

window.onload = () => {
  const game = new Phaser.Game(WORLD_SIZE.width, WORLD_SIZE.height, Phaser.AUTO, 'game');

  game.state.add('play', __WEBPACK_IMPORTED_MODULE_0__global_playState__["a" /* default */]);
  game.state.add('video', __WEBPACK_IMPORTED_MODULE_1__global_videoDemoState__["a" /* default */]);
  game.state.start('play');
};

/***/ }),
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!**************************************!*\
  !*** ./src/global/videoDemoState.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var video1;
var video2;
/* harmony default export */ __webpack_exports__["a"] = ({
  preload: function () {
    this.game.add.text(100, 100, "Loading videos ...", { font: "65px Arial", fill: "#ff0044" });

    this.game.load.video('liquid', 'assets/video/skull.mp4');
    this.game.load.video('space', 'assets/video/wormhole.mp4');
  },

  create: function () {
    video1 = this.game.add.video('space');
    video2 = this.game.add.video('liquid');

    video1.play(true);
    video2.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video1.addToWorld(400, 300, 0.5, 0.5);

    video2.addToWorld(780, 580, 1, 1, 0.5, 0.5);
  }
});

/***/ })
/******/ ]);
});