var that=this;function __skpm_run(e,t){that.context=t;var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/generateButtonCommand.js")}({"./src/generateButtonCommand.js":
/*!**************************************!*\
  !*** ./src/generateButtonCommand.js ***!
  \**************************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);var r=n(/*! sketch */"sketch"),o=n.n(r),u=n(/*! sketch/dom */"sketch/dom"),a=n.n(u),i=a.a.Group,c=a.a.Text,f=a.a.Document.getSelectedDocument(),l=f.selectedPage,s="";f.selectedLayers.forEach(function(e){return s=e}),t.default=function(e){if(s){var t=new i({name:"button group",parent:s.parent||l});s.parent=t;var n=new c({text:"button",alignment:c.Alignment.center,frame:s.frame,parent:t,name:"text"});n.style.verticalAlignment="center",n.style.fontSize=.4*s.frame.height,n.style.lineHeight=s.frame.height,n.style.width=s.frame.width,n.style.height=s.frame.height}else o.a.UI.message("Please select a Rectangle!")}},sketch:
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=require("sketch")},"sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/dom")}});"default"===e&&"function"==typeof n?n(t):n[e](t)}that.onRun=__skpm_run.bind(this,"default");