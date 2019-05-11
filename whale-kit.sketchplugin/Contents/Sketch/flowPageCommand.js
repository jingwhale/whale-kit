var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/flowPageCommand.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/flowPageCommand.js":
/*!********************************!*\
  !*** ./src/flowPageCommand.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Shape = __webpack_require__(/*! sketch/dom */ "sketch/dom").Shape;

var Artboard = __webpack_require__(/*! sketch/dom */ "sketch/dom").Artboard;

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

var Page = __webpack_require__(/*! sketch/dom */ "sketch/dom").Page;

var Rectangle = __webpack_require__(/*! sketch/dom */ "sketch/dom").Rectangle;

var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

var Text = __webpack_require__(/*! sketch/dom */ "sketch/dom").Text;

var Sketch = __webpack_require__(/*! sketch/dom */ "sketch/dom");

var index = 0;
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var document = Document.getSelectedDocument();
  var page = document.selectedPage;
  page.name = "page flow";
  console.log(index++); //Create Artboard

  var rect = new Rectangle(0, 0, 180, 178);
  var artboard = new Artboard({
    name: 'Page name',
    flowStartPoint: true,
    frame: rect,
    parent: page
  }); //Create Tile(Shape)

  var rect2 = new Rectangle(0, 0, 180, 10);
  var shapeTtile = new Shape({
    parent: artboard,
    name: "title",
    frame: rect2,
    style: {
      borders: [{
        color: '#000'
      }]
    }
  }); //add title color

  var colors = ["#304FFE", "#651FFF", '#CDDC39', '#EB2F96', "#D9D9D9", "#00BFA5"];
  var colorIndex = Math.floor(Math.random() * 10);

  if (colorIndex > 5) {
    colorIndex = 0;
  }

  shapeTtile.style.fills = [{
    color: colors[colorIndex]
  }]; //Create Body(Group)

  var group = new Group({
    name: 'body',
    parent: artboard
  }); //Create Body(Group)-Item

  var rect1 = new Rectangle(22, 30, 136, 26);
  var shape = new Shape({
    parent: group,
    name: "item",
    frame: rect1,
    style: {
      borders: [{
        color: '#000'
      }]
    }
  }); //Create Body(Group)-Text

  var text = new Text({
    text: 'text text text text',
    alignment: Text.Alignment.center,
    frame: rect1,
    parent: group,
    name: "text"
  });
  text.style.verticalAlignment = "center";
  text.style.fontSize = 12;
  text.style.lineHeight = 26;
  shape.adjustToFit();
  group.adjustToFit();
});

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=flowPageCommand.js.map