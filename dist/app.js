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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!*****************************!*\
  !*** ./global/menuState.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! ./../constants */ 4);

function goToPlayState() {
    this.game.state.start(_constants.STATES.PLAY);
}

function goToVideoState() {
    this.game.state.start(_constants.STATES.VIDEO);
}

exports.default = {
    preload: function preload() {
        var game = this.game;
        game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        this.game.load.image('background', 'assets/images/background.png');
    },

    create: function create() {
        var game = this.game;
        var background = game.add.sprite(0, 0, 'background');
        background.name = 'background';

        //  Standard button (also used as our pointer tracker)
        var button1 = game.add.button(100, 100, 'button', goToPlayState.bind(this), this, 2, 1, 0);
        button1.name = 'Play';
        button1.anchor.setTo(0.5, 0.5);

        //  Rotated button
        var button2 = game.add.button(330, 200, 'button', goToVideoState.bind(this), this, 2, 1, 0);
        button2.name = 'Video';
        button2.angle = 24;
        button2.anchor.setTo(0.5, 0.5);
    }
};


function examples() {
    //  Width scaled button
    button3 = game.add.button(100, 300, 'button', changeSky, this, 2, 1, 0);
    button3.name = 'sky3';
    button3.width = 300;
    button3.anchor.setTo(0, 0.5);
    // button3.angle = 0.1;

    //  Scaled button
    button4 = game.add.button(300, 450, 'button', changeSky, this, 2, 1, 0);
    button4.name = 'sky4';
    button4.scale.setTo(2, 2);

    //  Shrunk button
    button5 = game.add.button(100, 450, 'button', changeSky, this, 2, 1, 0);
    button5.name = 'sky5';
    button5.scale.setTo(0.5, 0.5);

    //  Scaled and Rotated button
    button6 = game.add.button(570, 200, 'button', changeSky, this, 2, 1, 0); // anchor 0.5
    button6.name = 'sky6';
    button6.angle = 32;
    button6.scale.setTo(2, 2);
    button6.anchor.setTo(0.5, 0.5);

    //  works regardless of world angle, parent angle or camera position
    // game.world.setBounds(0, 0, 2000, 2000);
    // game.world.angle = 10;
    // game.camera.x = 300;
}

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!*****************************!*\
  !*** ./global/playState.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colony = __webpack_require__(/*! classes/colony */ 3);

var _colony2 = _interopRequireDefault(_colony);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  preload: function preload() {
    // background
    this.game.load.image('background', 'assets/images/background.png');

    // levels
    this.game.load.json('level:1', 'data/level00.json');

    // colonies
    this.game.load.image('colony:neutral', 'assets/images/colony_neutral.png');
    this.game.load.image('colony:enemy', 'assets/images/colony_enemy.png');
    this.game.load.image('colony:ally', 'assets/images/colony_ally.png');
  },

  create: function create() {
    this.game.add.image(0, 0, 'background');

    this._loadLevel(this.game.cache.getJSON('level:1'));
  },

  _loadLevel: function _loadLevel(data) {
    // spawn colonies
    this.colonies = this.game.add.group();
    this._spawnColonies({ colonies: data.colonies });
  },

  _spawnColonies: function _spawnColonies(data) {
    data.colonies.forEach(this._spawnColony, this);
  },

  _spawnColony: function _spawnColony(colony) {
    var sprite = new _colony2.default(this.game, colony.x, colony.y, colony.image, colony.type);
    this.colonies.add(sprite);
  }
};

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./global/videoDemoState.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var video1;
var video2;
exports.default = {
  preload: function preload() {
    this.game.add.text(100, 100, "Loading videos ...", { font: "65px Arial", fill: "#ff0044" });

    this.game.load.video('liquid', 'assets/video/skull.mp4');
    this.game.load.video('space', 'assets/video/wormhole.mp4');
  },

  create: function create() {
    video1 = this.game.add.video('space');
    video2 = this.game.add.video('liquid');

    video1.play(true);
    video2.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video1.addToWorld(400, 300, 0.5, 0.5);

    video2.addToWorld(780, 580, 1, 1, 0.5, 0.5);
  }
};

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./classes/colony.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(/*! ../constants */ 4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INITIAL_POWER = 10;
var ATTACK_MODIFICATOR = 0.65;
var MIN_ATTACK_REQUIREMENT = 25;
var SPAWN_INTERVAL = Math.round(1000 / _constants.GLOBAL_SPEED);
var SPAWN_AMOUNT = 1;
var TYPES = {
  ally: 'ally',
  neutral: 'neutral',
  enemy: 'enemy'
};

var Colony = function (_Phaser$Sprite) {
  _inherits(Colony, _Phaser$Sprite);

  function Colony(game, x, y, imageName, type) {
    _classCallCheck(this, Colony);

    var _this = _possibleConstructorReturn(this, (Colony.__proto__ || Object.getPrototypeOf(Colony)).call(this, game, x, y, imageName));

    _this._spawn = function () {
      _this._changePower(SPAWN_AMOUNT);
    };

    _this.power = INITIAL_POWER;
    _this.type = type;

    _this._createCounter();

    // start spawning bacteria
    if (_this._colonyIsActive()) {
      _this._startSpawn();
    }
    return _this;
  }

  _createClass(Colony, [{
    key: 'update',
    value: function update() {
      this.text.x = Math.floor(this.x + this.width / 2);
      this.text.y = Math.floor(this.y + this.height / 2);
      this.text.setText(this.power);
    }
  }, {
    key: '_createCounter',
    value: function _createCounter() {
      var style = {
        font: "14px Arial",
        fill: "#000",
        wordWrap: true,
        wordWrapWidth: this.width,
        align: "center"
      };

      this.text = this.game.add.text(0, 0, this.power, style);
      this.text.anchor.set(0.5);
    }
  }, {
    key: '_startSpawn',
    value: function _startSpawn() {
      this.spawnInterval = setInterval(this._spawn, SPAWN_INTERVAL);
    }
  }, {
    key: '_stopSpawn',
    value: function _stopSpawn() {
      clearInterval(this.spawnInterval);
      this.spawnInterval = null;
    }
  }, {
    key: '_attack',


    // @TODO: consume from colony power 60%
    // do not allow to _attack if colony power is not enough (25 poins min)
    value: function _attack() {
      if (this._canAttack()) {
        var attackPower = MATH.round(this.power * ATTACK_MODIFICATOR);

        var attacked = this._changePower(attackPower);
        console.log('attacked with [' + attacked + '] bacteria');
      }
    }
  }, {
    key: '_canAttack',
    value: function _canAttack() {
      return this.power >= MIN_ATTACK_REQUIREMENT;
    }
  }, {
    key: '_colonyIsActive',
    value: function _colonyIsActive() {
      return this.type === TYPES.ally || this.type === TYPES.enemy;
    }

    // @TODO: add num to current colony power

  }, {
    key: 'reinforce',
    value: function reinforce(num) {
      var reinforced = this._changePower(num);

      console.log('reinforced with [' + reinforced + '] bacteria');
    }
  }, {
    key: '_changePower',
    value: function _changePower(num) {
      if (Number.isInteger(num)) {
        this.power += num;
      } else {
        console.warn('reinforce: [' + num + '] should be an integer');
      }

      return this.power;
    }
  }]);

  return Colony;
}(Phaser.Sprite);

exports.default = Colony;

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var STATES = exports.STATES = {
    PLAY: 'play',
    VIDEO: 'video'
};

var GLOBAL_SPEED = exports.GLOBAL_SPEED = 1;

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _playState = __webpack_require__(/*! ./global/playState */ 1);

var _playState2 = _interopRequireDefault(_playState);

var _videoDemoState = __webpack_require__(/*! ./global/videoDemoState */ 2);

var _videoDemoState2 = _interopRequireDefault(_videoDemoState);

var _menuState = __webpack_require__(/*! ./global/menuState */ 0);

var _menuState2 = _interopRequireDefault(_menuState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WORLD_SIZE = {
  height: 414,
  width: 736
};

window.onload = function () {
  var game = new Phaser.Game(WORLD_SIZE.width, WORLD_SIZE.height, Phaser.AUTO, 'game');

  game.state.add('play', _playState2.default);
  game.state.add('video', _videoDemoState2.default);
  game.state.add('menuState', _menuState2.default);
  game.state.start('menuState');
};

/***/ })
/******/ ]);
});