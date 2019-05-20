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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/generateWritingFormat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generateWritingFormat.js":
/*!**************************************!*\
  !*** ./src/generateWritingFormat.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return onRun; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/config */ "./src/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_1__);


var Text = __webpack_require__(/*! sketch/dom */ "sketch/dom").Text;

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;


var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var selection = document.selectedLayers;
var page = document.selectedPage;
var artboard = "";
selection.forEach(function (layer) {
  return artboard = layer;
});
var artboardFrame = artboard.frame;
var titleFontSize = 26;
var proverbColor = "#999999";
function onRun(context) {
  if (artboard && artboard.type == "Artboard") {
    choseElement();
  } else {
    //选择一个ArtBord
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select an ArtBord!");
  }
}

var choseElement = function choseElement() {
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.getInputFromUser("Please select the text item you want to generate:", {
    type: sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.INPUT_TYPE.selection,
    possibleValues: _lib_config__WEBPACK_IMPORTED_MODULE_1__["ElementNameList"]
  }, function (err, value) {
    generateWritingFormat(value);

    if (err) {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(err);
      return;
    }
  });
};

var generateWritingFormat = function generateWritingFormat(value) {
  switch (value) {
    case "项目描述":
      generateElementTtile(value);
      break;

    case "交互约定":
      generateElementPromise(value);
      break;

    case "设计要素":
      generateElementPoint(value);
      break;

    case "致谢":
      generateElementThanks(value);
      break;

    case "版本记录":
      generateElementTtile(value);
      break;

    case "修订记录":
      generateElementTtile(value);
      break;

    default:
      generateElementTtile(value);
  }

  artboard.name = value;
};

var parentGroupFrame = {
  x: 46,
  y: 46,
  width: 200,
  height: 15
}; //生成标题

var generateElementTtile = function generateElementTtile(value, frame) {
  var titleFrame = frame ? frame : parentGroupFrame;
  var titleGroup = new Group({
    name: value + "标题",
    parent: artboard,
    frame: titleFrame
  });
  var titleText = new Text({
    text: value,
    alignment: Text.Alignment.center,
    frame: {
      x: 0,
      y: 0,
      width: 200,
      height: 26
    },
    parent: titleGroup,
    name: "title"
  });
  titleText.style.fontSize = titleFontSize;
}; //交互约定


var generateElementPromise = function generateElementPromise(value, frame) {
  var promiseFrame = frame ? frame : parentGroupFrame; //交互约定

  var parentGroup = new Group({
    name: '交互约定',
    parent: artboard,
    frame: promiseFrame
  });
  var globalText = new Text({
    text: "全局约定",
    alignment: Text.Alignment.center,
    frame: {
      x: 0,
      y: 0,
      width: 200,
      height: 26
    },
    parent: parentGroup,
    name: "global"
  });
  globalText.style.fontSize = titleFontSize;
  var linkText = new Text({
    text: "https://whale-design.gitbook.io/whale-global-explanation/",
    frame: {
      x: globalText.frame.x,
      y: globalText.frame.y + 50,
      width: 200,
      height: 20
    },
    parent: parentGroup,
    name: "urllink"
  });
  linkText.style.fontSize = 20;
  var jhText = new Text({
    text: "交互约定",
    frame: {
      x: globalText.frame.x,
      y: globalText.frame.y + 130,
      width: 200,
      height: 26
    },
    parent: parentGroup,
    name: "interaction"
  });
  jhText.style.fontSize = titleFontSize;
  var jhTextCnt = new Text({
    text: "• 组件交互均与现有组件交互一致。未说明交互，均为组件默认。 \n" + "\n" + "• 页面交互异常在未说明情况下，均按照以下： \n" + "404：跳转到公用404页面。 \n" + "无网络：提示无网络或网速慢。 \n" + "无权限：跳转到公用无权限页面。 \n" + "\n" + "• 其他交互未尽事宜，请及时与设计师沟通。 ",
    frame: {
      x: globalText.frame.x,
      y: globalText.frame.y + 130 + 50,
      width: 960,
      height: 600
    },
    parent: parentGroup,
    name: "jhTextCnt"
  });
  jhTextCnt.style.fontSize = 20;
  jhTextCnt.style.lineHeight = 32; // jhTextCnt.style.alignment = "left";

  var nameDefinitionText = new Text({
    text: "名词定义",
    frame: {
      x: 0,
      y: globalText.frame.y + 130 + 50 + 310,
      width: 200,
      height: 26
    },
    parent: parentGroup,
    name: "nameDefinition"
  });
  nameDefinitionText.style.fontSize = titleFontSize; // nameDefinitionText.style.alignment = "left";

  var nameDefinitionTextCnt = new Text({
    text: "• 分销\n" + "在西方经济学中，分销的含义是建立销售渠道的意思。\n" + "\n" + "• WC\n" + "WC是whale code的简写，中文名称为鲸鱼编程。",
    frame: {
      x: globalText.frame.x,
      y: globalText.frame.y + 130 + 50 + 310 + 50,
      width: 200,
      height: 20
    },
    parent: parentGroup,
    name: "nameDefinitionCnt"
  });
  nameDefinitionTextCnt.style.fontSize = 20;
  nameDefinitionTextCnt.style.lineHeight = 32; // nameDefinitionTextCnt.style.alignment = "left";
}; //设计要素


var generateElementPoint = function generateElementPoint(value) {
  var parentGroup = new Group({
    name: '设计要素标题',
    parent: artboard,
    frame: parentGroupFrame
  });
  var globalText = new Text({
    text: "设计要素",
    alignment: Text.Alignment.center,
    frame: {
      x: 0,
      y: 0,
      width: 200,
      height: 26
    },
    parent: parentGroup,
    name: "title"
  });
  globalText.style.fontSize = titleFontSize;
  var linkText = new Text({
    text: "https://github.com/jingwhale/whale-design-book",
    frame: {
      x: globalText.frame.x + 120,
      y: globalText.frame.y + 10,
      width: 200,
      height: 20
    },
    parent: parentGroup,
    name: "urllink"
  });
  linkText.style.fontSize = 18;
}; //致谢


var generateElementThanks = function generateElementThanks(value) {
  var parentGroupFrame = {
    x: (artboardFrame.width - 200) / 2,
    y: 200,
    width: 200,
    height: 38
  };
  var parentGroup = new Group({
    name: '致谢标题',
    parent: artboard,
    frame: parentGroupFrame
  });
  var globalText = new Text({
    text: "致谢",
    alignment: Text.Alignment.center,
    frame: {
      x: 0,
      y: 0,
      width: 200,
      height: 38
    },
    parent: parentGroup,
    name: "title"
  });
  globalText.style.fontSize = 38;
  globalText.style.fontWeight = "700";
  var parentGroup1 = new Group({
    name: '致谢内容',
    parent: artboard,
    frame: {
      x: (artboardFrame.width - 600) / 2,
      y: parentGroup.frame.height + 150,
      width: 600,
      height: 200
    }
  });
  var global1Text = new Text({
    text: "首先，感谢设计团队专业的帮助。\n其次，感谢开发、视觉、运营团队的帮助与支持。\n希望我们可以做的更好！",
    alignment: Text.Alignment.center,
    frame: {
      x: 0,
      y: 100,
      width: 600,
      height: 200
    },
    parent: parentGroup1,
    name: "thanksCnt"
  });
  global1Text.style.fontSize = titleFontSize;
  global1Text.style.alignment = "center";
  global1Text.style.lineHeight = 50;
  var parentGroup2 = new Group({
    name: '谚语',
    parent: artboard,
    frame: {
      x: artboardFrame.width - 600,
      y: artboardFrame.height - 120,
      width: 600,
      height: 200
    }
  });
  var global2Text = new Text({
    text: "凝聚产生力量；团结诞生希望。——席勒",
    alignment: Text.Alignment.center,
    frame: {
      x: 0,
      y: 0,
      width: 600,
      height: 200
    },
    parent: parentGroup2,
    name: "proverb"
  });
  global2Text.style.fontSize = 20;
  global2Text.style.alignment = "center";
  global2Text.style.textColor = proverbColor;
};

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

module.exports.TAG_INDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; //generate Element 常量

module.exports.ElementNameList = ["项目描述", "交互约定", "设计要素", "致谢", "版本记录", "修订记录"];

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

//# sourceMappingURL=generateWritingFormat.js.map