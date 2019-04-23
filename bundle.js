/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View = __webpack_require__(3);

var _View2 = _interopRequireDefault(_View);

var _Snake = __webpack_require__(2);

var _Snake2 = _interopRequireDefault(_Snake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  colors: {
    background: 'white',
    snake: 'red',
    snakeHead: 'blue',
    food: 'green'
  },
  startSpeed: 200,
  foodAmount: 3,
  snakeAmount: 1,
  cellSize: 10
};

var Game = function () {
  function Game(canvas, options) {
    var _this = this;

    _classCallCheck(this, Game);

    var opts = Object.assign({}, defaultOptions, options);
    Object.assign(opts.colors, defaultOptions.colors, options.colors);
    this.ondie = null;
    this.ontick = null;
    this.view = new _View2.default(canvas, opts.cellSize);
    this.snake = new _Snake2.default(this.view.center());
    this.speed = opts.startSpeed;
    this.startSpeed = opts.startSpeed;
    this.foods = [];
    this.foodAmount = opts.foodAmount;
    this._nextTick = null;
    this.colors = opts.colors;

    // bind to keydown
    window.onkeydown = function (_ref) {
      var keyCode = _ref.keyCode;

      var direction = void 0;
      switch (keyCode) {
        case 37:
          direction = 'left';
          break;
        case 38:
          direction = 'down';
          break;
        case 39:
          direction = 'right';
          break;
        case 40:
          direction = 'up';
          break;
        default:
      }
      if (typeof direction === 'string' && !_this.snake.dead) {
        // change direction
        _this.snake.direction = direction;
        clearTimeout(_this._nextTick);
        _this._nextTick = null;
        _this.start();
        // also tick once to make the direction change instant
        _this.tick();
      }
    };
  }

  _createClass(Game, [{
    key: 'tick',
    value: function tick() {
      if (typeof this.ontick === 'function') {
        this.ontick(this);
      }
      while (this.foods.length < this.foodAmount) {
        console.log;
        this.foods.push([generateRandom(this.view.grid.width - 1), generateRandom(this.view.grid.height - 1)]);
      }
      try {
        // internally move snake
        var newCell = this.snake.move();
        if (newCell[0] < 0 || newCell[0] > this.view.grid.width || newCell[1] < 0 || newCell[1] > this.view.grid.height) {
          this.stop();
          if (typeof this.ondie === 'function') {
            this.ondie(this);
          }
        }
      } catch (e) {
        if (this.snake.dead) {
          this.stop();
          if (typeof this.ondie === 'function') {
            this.ondie(this);
          }
        } else {
          throw e;
        }
      }
      // redraw view
      this.view.fill(this.colors.background);
      // render snake
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.snake.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;

          this.view.grid[part[0]][part[1]].color = this.colors.snake;
        }
        // recolor the head
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var head = this.snake.head();
      this.view.grid[head[0]][head[1]].color = this.colors.snakeHead;
      // check if we ate a food else render it
      for (var i = 0; i < this.foods.length; i++) {
        var food = this.foods[i];
        if (this.snake.head()[0] === food[0] && this.snake.head()[1] === food[1]) {
          this.foods.splice(i, 1);
          this.snake.grow();
          this.speed = this.startSpeed * (1 / (0.5 * Math.sqrt(this.snake.body.length)));
        } else {
          this.view.grid[food[0]][food[1]].color = this.colors.food;
        }
      }

      // render all foods
      this.view.draw();
    }
  }, {
    key: 'start',
    value: function start() {
      if (this._nextTick === null) {
        this.autoTick();
      }
    }
  }, {
    key: 'autoTick',
    value: function autoTick() {
      var _this2 = this;

      // set timeout for next tick
      this._nextTick = setTimeout(function () {
        _this2.tick();
        _this2.autoTick();
      }, this.speed);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.snake = new _Snake2.default(this.view.center());
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearTimeout(this._nextTick);
      this._nextTick = null;
      this.view.fill('white');
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearTimeout(this._nextTick);
      this.nextTick = null;
    }
  }]);

  return Game;
}();

exports.default = Game;


var generateRandom = function generateRandom(max) {
  return Math.floor(Math.random() * (max + 1));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(ctx, size, x, y) {
    _classCallCheck(this, Cell);

    this.ctx = ctx;
    this.corners = {
      topLeft: [x * size, y * size],
      topRight: [(x + 1) * size, y * size],
      bottomLeft: [x * size, (y + 1) * size],
      bottomRight: [(x + 1) * size, (y + 1) * size]
    };
    this.size = size;
    this._color = 'white';
    this.changed = false;
  }

  _createClass(Cell, [{
    key: 'draw',
    value: function draw() {
      var _ctx;

      var oldStyle = this.ctx.fillStyle;
      this.ctx.fillStyle = this.color;
      (_ctx = this.ctx).fillRect.apply(_ctx, _toConsumableArray(this.corners.topLeft).concat([this.size, this.size]));
      this.ctx.fillStyle = oldStyle;
      this.changed = false;
    }
  }, {
    key: 'color',
    get: function get() {
      return this._color;
    },
    set: function set(value) {
      this.changed = value !== this.color;
      this._color = value;
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = function () {
  function Snake(start) {
    _classCallCheck(this, Snake);

    this.body = [];
    this.body.push(start);
    this.toGrow = 0;
    this.dead = false;
    this._direction = 'left';
  }

  _createClass(Snake, [{
    key: 'rawMove',
    value: function rawMove(newCell) {
      var idx = this.indexOf(newCell);
      if (idx >= 0) {
        this.dead = true;
        var err = new Error('Moved into self');
        err.snake = true;
        throw err;
      }
      this.body.push(newCell);
      if (this.toGrow === 0) {
        this.body.shift();
      } else {
        this.toGrow--;
      }

      return newCell;
    }
  }, {
    key: 'grow',
    value: function grow() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.toGrow += n;
    }
  }, {
    key: 'head',
    value: function head() {
      return this.body[this.body.length - 1];
    }
  }, {
    key: 'nth',
    value: function nth(n) {
      // starts at 0!
      return this.body[this.body.length - 1 - n];
    }
  }, {
    key: 'tail',
    value: function tail() {
      return this.body[0];
    }
  }, {
    key: 'move',
    value: function move() {
      var newCell = [].concat(_toConsumableArray(this.head()));
      switch (this.direction) {
        case 'up':
          newCell[1]++;
          break;
        case 'down':
          newCell[1]--;
          break;
        case 'left':
          newCell[0]--;
          break;
        case 'right':
          newCell[0]++;
          break;
        default:
      }

      return this.rawMove(newCell);
    }
  }, {
    key: 'indexOf',
    value: function indexOf(cell) {
      for (var i = 0; i < this.body.length; i++) {
        var part = this.body[i];
        if (part[0] === cell[0] && part[1] === cell[1]) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: 'direction',
    get: function get() {
      return this._direction;
    },
    set: function set(value) {
      // prevent moving backwards
      switch (this._direction) {
        case 'up':
          if (value !== 'down') {
            this._direction = value;
            this.lastDirectionChange = Date.now();
          }
          break;
        case 'down':
          if (value !== 'up') {
            this._direction = value;
            this.lastDirectionChange = Date.now();
          }
          break;
        case 'left':
          if (value !== 'right') {
            this._direction = value;
            this.lastDirectionChange = Date.now();
          }
          break;
        case 'right':
          if (value !== 'left') {
            this._direction = value;
            this.lastDirectionChange = Date.now();
          }
          break;
        default:
      }
    }
  }]);

  return Snake;
}();

exports.default = Snake;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = __webpack_require__(1);

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(c, cellSize) {
    _classCallCheck(this, View);

    this.canvas = c;
    this.ctx = this.canvas.getContext('2d');
    if (this.canvas.width % cellSize !== 0) {
      throw new Error('width doesnt divide cellSize');
    }

    if (this.canvas.height % cellSize !== 0) {
      throw new Error('height doesnt divide cellSize');
    }

    this.grid = [];
    this.grid.width = this.canvas.width / cellSize;
    this.grid.height = this.canvas.height / cellSize;
    // fill grid
    for (var x = 0; x < this.grid.width; x++) {
      this.grid[x] = [];
      for (var y = 0; y < this.grid.height; y++) {
        this.grid[x][y] = new _Cell2.default(this.ctx, cellSize, x, y);
      }
    }
  }

  _createClass(View, [{
    key: 'draw',
    value: function draw() {
      var changed = 0;
      this.mapGrid(function (cell) {
        if (cell.changed) {
          changed++;
          cell.draw();
        }
      });

      return changed;
    }
  }, {
    key: 'mapGrid',
    value: function mapGrid(cb) {
      for (var x = 0; x < this.grid.width; x++) {
        for (var y = 0; y < this.grid.height; y++) {
          cb(this.grid[x][y], [x, y]);
        }
      }
    }
  }, {
    key: 'fill',
    value: function fill(color) {
      this.mapGrid(function (cell) {
        cell.color = color;
      });
    }
  }, {
    key: 'changeCell',
    value: function changeCell(x, y, color) {
      this.grid[x][y].color = color;
    }
  }, {
    key: 'center',
    value: function center() {
      var x = Math.ceil(this.grid.width / 2);
      var y = Math.ceil(this.grid.height / 2);

      return [x, y];
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(0);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('game');
canvas.height = 600;
canvas.width = 990;

var game = new _Game2.default(canvas, {
  startSpeed: 350,
  cellSize: 15,
  foodAmount: 10
});
window.game = game;
game.ondie = function () {
  var ctx = canvas.getContext('2d');
  ctx.font = '48px editundo';
  ctx.fillText('You ded', Math.floor(canvas.width / 2.3), Math.floor(canvas.height / 2.5));
  setTimeout(function () {
    location.reload();
  }, 2000);
};

var score = document.getElementById('score');
game.ontick = function () {
  score.innerHTML = game.snake.body.length;
};
game.start(100);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map