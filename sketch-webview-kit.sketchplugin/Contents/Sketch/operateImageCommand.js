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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/operateImageCommand.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/operateImageCommand.js":
/*!************************************!*\
  !*** ./src/operateImageCommand.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_1__);


var Group = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Group;
var Text = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Text;
var Image = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Image;
var Rectangle = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Rectangle;
var Shape = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Shape;
var Document = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Document;
var document = Document.getSelectedDocument();
var page = document.selectedPage;
var selection = document.selectedLayers;
var buttonRect = "";
selection.forEach(function (layer) {
  return buttonRect = layer;
});
var data = {
  image: {
    width: 64,
    height: 52,
    rate: 0.2
  },
  avatar: {
    width: 65,
    height: 78,
    rate: 0.6
  },
  carousel: {
    width: 62,
    height: 42,
    rate: 0.3
  }
};

if (!buttonRect) {
  //选择一个矩形
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select a Rectangle！");
} else {
  var doImageFrame = function doImageFrame(type) {
    var configData = data[type];
    var rate = data[type].rate;
    var size = {};
    size.width = buttonRect.frame.width * rate;
    size.height = size.width * configData.height / configData.width;

    if (buttonRect.frame.height <= size.height) {
      size.height = buttonRect.frame.height * rate;
      size.width = size.height * configData.width / configData.height;
    }

    size.x = (buttonRect.frame.width - size.width) / 2;
    size.y = (buttonRect.frame.height - size.height) / 2;
    return size;
  };

  var doImage = function doImage(type) {
    //Create Group
    var imageFrame = doImageFrame(type);
    var url = type + ".png";
    var imageURL = context.plugin.urlForResourceNamed(url);
    var layoutgroup = new Group({
      name: 'image',
      parent: buttonRect.parent || page,
      frame: buttonRect.frame
    });
    buttonRect.parent = layoutgroup;
    var frame = {
      x: 0,
      y: 0,
      width: buttonRect.frame.width,
      height: buttonRect.frame.height
    };
    buttonRect.frame = frame;
    var imageLayer = new Image({
      image: imageURL,
      frame: {
        x: imageFrame.x,
        y: imageFrame.y,
        width: imageFrame.width,
        height: imageFrame.height
      }
    });
    imageLayer.parent = layoutgroup;
  };

  var type = "image";

  switch (buttonRect.shapeType) {
    case "Rectangle":
      if (buttonRect.points[0].cornerRadius != 0) {
        type = "carousel";
      }

      break;

    case "Oval":
      type = "avatar";
      break;
  }

  doImage(type);
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

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=operateImageCommand.js.map