/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    this.color = 'white';
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
      return this.color;
    },
    set: function set(value) {
      this.changed = value !== this.color;
      this.color = value;
    }
  }]);

  return Cell;
}();

var Snake = function () {
  function Snake(c, cellSize) {
    _classCallCheck(this, Snake);

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
        this.grid[x][y] = new Cell(this.ctx, cellSize, x, y);
      }
    }
  }

  _createClass(Snake, [{
    key: 'draw',
    value: function draw() {
      this.mapGrid(function (cell) {
        if (cell.changed) {
          cell.draw();
        }
      });
    }
  }, {
    key: 'mapGrid',
    value: function mapGrid(cb) {
      for (var x = 0; x < this.grid.length; x++) {
        for (var y = 0; y < this.grid[x].length; y++) {
          cb(this.grid[x][y], [x, y]);
        }
      }
    }
  }]);

  return Snake;
}();

/***/ })
/******/ ]);