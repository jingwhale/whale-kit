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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/convertToGrayscaleCommand.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
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
module.exports.PageType = "page";

/***/ }),

/***/ "./src/convertToGrayscaleCommand.js":
/*!******************************************!*\
  !*** ./src/convertToGrayscaleCommand.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return onRun; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);




var Document = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Document;
var Shape = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Shape;
var document = Document.getSelectedDocument();
var shapeLayers = [];
var imageLayers = [];
var textLayers = [];
var graySymbolType = _config__WEBPACK_IMPORTED_MODULE_3__["PartType"];
function onRun() {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var page = doc.selectedPage;
  var selection = doc.selectedLayers;

  if (selection.length == 0) {
    //无选中图层
    if (page.layers.length > 0) {
      //有选中的页面
      graySymbolType = _config__WEBPACK_IMPORTED_MODULE_3__["PageType"];
    } else {
      //无选中的页面
      if (doc.pages.length > 0) {
        graySymbolType = _config__WEBPACK_IMPORTED_MODULE_3__["AllType"];
      } else {
        sketch_ui__WEBPACK_IMPORTED_MODULE_2___default.a.message('Try openning a document!');
      }
    }
  }

  grayTypeSymbol();
}
;

function grayTypeSymbol() {
  if (graySymbolType == _config__WEBPACK_IMPORTED_MODULE_3__["PageType"]) {
    //选中页面的layers
    grayPage();
  } else if (graySymbolType == _config__WEBPACK_IMPORTED_MODULE_3__["PartType"]) {
    //选中的所有图层
    grayPart();
  } else if (graySymbolType == _config__WEBPACK_IMPORTED_MODULE_3__["AllType"]) {
    //所有文档页面的layers
    grayAll();
  }
}

function grayPart() {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selection = doc.selectedLayers;

  if (selection) {
    classifier(selection);
    grayScale(selection);
  }
}

function grayAll() {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  document.pages.forEach(function (page) {
    grayPageLayes(page);
  });
}

function grayPage() {
  var page = document.selectedPage;

  if (page.layers.length > 0) {
    grayPageLayes(page);
  } else {
    sketch_ui__WEBPACK_IMPORTED_MODULE_2___default.a.message('Try selecting a page!');
  }
}

function grayPageLayes(page) {
  var symbols = page.layers;
  symbols.forEach(function (symbol) {
    if (symbol.type === "ArtBoard") {
      //页面包含ArtBoard
      classifier(symbol.layers || []);
    } else {
      classifierLogic(symbol);
    }
  });
  grayScale(symbols);
} //灰度设置


function grayScale(selection) {
  if (selection) {
    // Grayscale "Shape" layers
    shapeLayers.forEach(function (layer) {
      // *** ALL THE FILL / GRADIENT COLORS  *** //
      if (layer.style.fills) {
        layer.style.fills.forEach(function (fill) {
          if (fill.fill === "Gradient") {
            fill.gradient.stops.forEach(function (stop) {
              stop.color = convertHexToGrayscaleRGBAString(stop.color);
            });
          } else {
            fill.color = convertHexToGrayscaleRGBAString(fill.color);
          }
        });
      } // *** 1st STROKE COLOR *** //


      if (layer.style.borders) {
        layer.style.borders.forEach(function (border) {
          if (border.fillType === "Gradient") {
            border.gradient.stops.forEach(function (stop) {
              stop.color = convertHexToGrayscaleRGBAString(stop.color);
            });
          } else {
            border.color = convertHexToGrayscaleRGBAString(border.color);
          }
        });
      }
    }); // Grayscale "Text" layers

    textLayers.forEach(function (layer) {
      var color = convertHexToGrayscaleRGBAString(layer.style.textColor);
      layer.style.textColor = color;
    }); // Grayscale "Image" layers

    imageLayers.forEach(function (layer) {
      sketch_ui__WEBPACK_IMPORTED_MODULE_2___default.a.message('This plugin doesnt work for image layers.');
    });
    sketch_ui__WEBPACK_IMPORTED_MODULE_2___default.a.message('Converted to Grayscale successfully！');
  } else {
    sketch_ui__WEBPACK_IMPORTED_MODULE_2___default.a.message('Try selecting some shapes');
  }
} //获取symbolMaster


function getSymbolMaster(layer) {
  if (layer.symbolId) {
    var symbolMaster = document.getSymbolMasterWithID(layer.symbolId);

    if (symbolMaster.type == "SymbolInstance") {
      getSymbolMaster(symbolMaster);
    } else if (symbolMaster.type == "SymbolMaster") {
      return symbolMaster;
    }
  }
} //分类器


function classifier(selection) {
  selection.forEach(function iterate(layer) {
    classifierLogic(layer);
  });
} //分类器逻辑判断


function classifierLogic(layer) {
  layer.type === 'Shape' && shapeLayers.push(layer);
  layer.type === 'ShapePath' && shapeLayers.push(layer);
  layer.type === 'Image' && imageLayers.push(layer);
  layer.type === 'Text' && textLayers.push(layer);

  if (layer.type === 'SymbolInstance') {
    layer = getSymbolMaster(layer);
  }

  classifier(layer.layers || []);
} // HELPERS


function convertHexToGrayscaleRGBAString(hex) {
  // Calculate the opacity
  var opacity = parseInt(hex.substring(hex.length - 2, hex.length), 16) / 255; // Chop off the opacity and convert to RGB

  hex = hex.substring(0, hex.length - 2);
  var rgb = hexToRGB(hex); // Calculate & set gray value based on "Luma"
  // Source: http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/

  var gray = rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722;
  return 'rgba(' + gray + ',' + gray + ',' + gray + ',' + opacity + ')';
}

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

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

//# sourceMappingURL=convertToGrayscaleCommand.js.map