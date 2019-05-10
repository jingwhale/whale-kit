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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/generateTags.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generateTags.js":
/*!*****************************!*\
  !*** ./src/generateTags.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return onRun; });
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/config */ "./src/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_0__);


var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

var Text = __webpack_require__(/*! sketch/dom */ "sketch/dom").Text;

var Style = __webpack_require__(/*! sketch/dom */ "sketch/dom").Style;

var ShapePath = __webpack_require__(/*! sketch/dom */ "sketch/dom").ShapePath;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var tagIndex = "";

var createOval = function createOval(currentLayer, indexTag) {
  var group = new Group({
    name: 'Tags',
    parent: currentLayer
  });
  var Oval = new ShapePath({
    name: 'tag',
    shapeType: ShapePath.ShapeType.Oval,
    frame: {
      x: currentLayer.frame.width + 10,
      y: 0,
      width: 30,
      height: 30
    },
    parent: group
  });
  Oval.style.fills = [{
    fill: Style.FillType.Color,
    color: '#d8d8d8ff'
  }];
  var textTag = tagIndex ? tagIndex : ++index;
  var text = new Text({
    text: "" + textTag,
    alignment: Text.Alignment.center,
    frame: Oval.frame,
    parent: group,
    name: "text"
  });
  text.style.verticalAlignment = "center";
  text.style.fontSize = 14;
  text.style.lineHeight = Oval.frame.height;
  text.style.width = Oval.frame.width;
  text.style.height = Oval.frame.height;
};

function onRun(context) {
  var document = Document.getSelectedDocument();
  var selection = document.selectedLayers;

  if (selection.length > 0) {
    if (selection.length == 1) {
      UI.getInputFromUser("Please select the index of the tag:", {
        type: UI.INPUT_TYPE.selection,
        possibleValues: _lib_config__WEBPACK_IMPORTED_MODULE_0__["TAG_INDEX"]
      }, function (err, value) {
        tagIndex = value;
        selection.forEach(function (value, index) {
          createOval(value, index);
        });

        if (err) {
          // most likely the user canceled the input
          return;
        }
      });
    } else {
      selection.forEach(function (value, index) {
        createOval(value, index);
      });
    }
  } else {
    UI.message("Please select a layer or layers!");
  }
}

/***/ }),

/***/ "./src/lib/config.js":
/*!***************************!*\
  !*** ./src/lib/config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.identifier = 'identifier_whale_kit'; //change color state 颜色组

module.exports.stateColor = {
  active: "#767272",
  noamal: "#D8D8D8",
  disabled: "#857D7D"
}; //change color state 颜色组

module.exports.StateColorAmt = 20; //change color state 常量

module.exports.STATE_ACTIVE = "active";
module.exports.STATE_DISABLED = "disabled"; //convert to grayscaleCommand type 常量

module.exports.AllType = "all";
module.exports.PartType = "part";
module.exports.SymbolsType = "symbols";
module.exports.PageType = "page"; //generate tags 常量

module.exports.TAG_INDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=generateTags.js.map