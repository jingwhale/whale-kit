var that=this;function __skpm_run(e,t){that.context=t;var n=function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/whaleHomepage.js")}({"./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */function(e,t,n){var i=n(/*! ./timeout */"./node_modules/@skpm/timers/timeout.js");e.exports={setImmediate:function(e,t,n,o,r,s,a,l,u,c,d){return i.setTimeout(e,0,t,n,o,r,s,a,l,u,c,d)},clearImmediate:function(e){return i.clearTimeout(e)}}},"./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */function(e,t){e.exports=function(){return"undefined"!=typeof coscript&&coscript.createFiber}},"./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */function(e,t,n){var i,o,r=[];if(n(/*! ./test-if-fiber */"./node_modules/@skpm/timers/test-if-fiber.js")()){r=[];i=function(e,t,n,i,o,s,a,l,u,c,d,f){var m=r.length;return r.push(coscript.scheduleWithInterval_jsFunction((t||0)/1e3,function(){e(n,i,o,s,a,l,u,c,d,f)})),m},o=function(e){var t=r[e];t&&(t.cancel(),r[e]=void 0)}}else i=function(e,t,n,i,s,a,l,u,c,d,f,m){coscript.shouldKeepAround=!0;var h=r.length;return r.push(!0),coscript.scheduleWithInterval_jsFunction((t||0)/1e3,function(){r[h]&&e(n,i,s,a,l,u,c,d,f,m),o(h),r.every(function(e){return!e})&&(coscript.shouldKeepAround=!1)}),h},o=function(e){r[e]=!1};e.exports={setTimeout:i,clearTimeout:o}},"./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SuperCall=void 0,t.default=function(e){const t=e.superclass||NSObject,n=(e.className||e.classname||"ObjCClass")+NSUUID.UUID().UUIDString(),r=new Set(["className","classname","superclass"]);var s=MOClassDescription.allocateDescriptionForClassWithName_superclass_(n,t);const a=[];for(var l in e){const t=e[l];if("function"==typeof t&&"init"!==l){var u=NSSelectorFromString(l);s.addInstanceMethodWithSelector_function_(u,t)}else r.has(l)||(a.push(l),s.addInstanceVariableWithName_typeEncoding(l,"@"))}return s.addInstanceMethodWithSelector_function_(NSSelectorFromString("init"),function(){const t=o.call(this);return a.map(n=>{Object.defineProperty(t,n,{get:()=>(function(e,t){const n=MOPointer.new();return(0,i.object_getInstanceVariable)(e,t,n),n.value().retain().autorelease()})(t,n),set(e){(0,i.object_setInstanceVariable)(t,n,e)}}),t[n]=e[n]}),"function"==typeof e.init&&e.init.call(this),t}),s.registerClass()};var i=n(/*! ./runtime.js */"./node_modules/cocoascript-class/lib/runtime.js");t.SuperCall=i.SuperCall;const o=(0,i.SuperCall)(NSStringFromSelector("init"),[],{type:"@"})},"./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SuperCall=function(e,t,n){const o=r("objc_msgSendSuper",[{type:"^"+i},{type:":"},...t],n);return function(...t){const n=function(e,t){return function e(t){if("object"!=typeof t||0==Object.keys(t).length)return t;const n=Object.keys(t)[0];const i=t[n];const o=MOStruct.structureWithName_memberNames_runtime(n,Object.keys(i),Mocha.sharedRuntime());Object.keys(i).map(t=>{o[t]=e(i[t])});return o}({objc_super:{receiver:e,super_class:t}})}(this,this.superclass()),i=MOPointer.alloc().initWithValue_(n);return o(i,e,...t)}},t.CFunc=r;const i='{objc_super="receiver"@"super_class"#}';function o(e,t){const n=NSMutableDictionary.dictionary();n.o=e,Object.keys(t).map(e=>n.setValue_forKeyPath(t[e],"o."+e))}function r(e,t,n){function i(e){if(!e)return null;const t=MOBridgeSupportArgument.alloc().init();return o(t,{type64:e.type}),t}const r=MOBridgeSupportFunction.alloc().init();return o(r,{name:e,arguments:t.map(i),returnValue:i(n)}),r}t.object_getInstanceVariable=r("object_getInstanceVariable",[{type:"@"},{type:"*"},{type:"^@"}],{type:"^{objc_ivar=}"}),t.object_setInstanceVariable=r("object_setInstanceVariable",[{type:"@"},{type:"*"},{type:"@"}],{type:"^{objc_ivar=}"});!function(e,t){const n=MOBridgeSupportController.sharedController().valueForKey("symbols");if(!n)throw Error("Something has changed within bridge support so we can't add our definitions");if(null!==n[e])return;const i=MOBridgeSupportStruct.alloc().init();o(i,{name:e,type:t.type}),n[e]=i}("objc_super",{type:i})},"./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(t,n){var i=t;function o(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(e,this)}function s(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(e){return void l(t.promise,e)}a(t.promise,i)}else(1===e._state?a:l)(t.promise,e._value)})):e._deferreds.push(t)}function a(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void c(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,u(e)}catch(t){l(e,t)}}function l(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t]);e._deferreds=null}function c(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,l(t,e))})}catch(e){if(n)return;n=!0,l(t,e)}}r.prototype.catch=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var n=new this.constructor(o);return s(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},r.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},r.all=function(e){return new r(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);var o=i.length;function r(e,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){r(e,t)},n)}i[e]=s,0==--o&&t(i)}catch(e){n(e)}}for(var s=0;s<i.length;s++)r(s,i[s])})},r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,n){for(var i=0,o=e.length;i<o;i++)e[i].then(t,n)})},r._immediateFn="function"==typeof n&&function(e){n(e)}||function(e){i(e,0)},r._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},e.exports=r}).call(this,n(/*! ./node_modules/@skpm/timers/timeout.js */"./node_modules/@skpm/timers/timeout.js").setTimeout,n(/*! ./node_modules/@skpm/timers/immediate.js */"./node_modules/@skpm/timers/immediate.js").setImmediate)},"./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */function(e,t){var n=["NSColor","NSCachedWhiteColor","NSColorSpaceColor","NSDynamicSystemColor","NSCachedColorSpaceColor"];e.exports=function(e,t,i){function o(n){e.isVisible()||(n?(NSApplication.sharedApplication().activateIgnoringOtherApps(!0),t.makeKeyAndOrderFront(null)):t.orderBack(null))}e._panel=t,e._webview=i,e._destroyed=!1,e.destroy=function(){return t.close()},e.close=function(){if(t.delegate().utils.parentWindow){var n=!0;return e.emit("close",{get defaultPrevented(){return!n},preventDefault:function(){n=!1}}),void(n&&t.delegate().utils.parentWindow.endSheet(t))}e.isClosable()&&t.performClose(null)},e.focus=o.bind(this,!0),e.blur=o.bind(this,!1),e.isFocused=function(){return t.isKeyWindow()},e.isDestroyed=function(){return e._destroyed},e.show=function(){return NSApp.activateIgnoringOtherApps(!0),t.delegate().utils.parentWindow?t.delegate().utils.parentWindow.beginSheet_completionHandler(t,__mocha__.createBlock_function("v16@?0q8",function(){e.emit("closed")})):t.makeKeyAndOrderFront(null)},e.showInactive=function(){return t.orderFrontRegardless()},e.hide=function(){return t.orderOut(null)},e.isVisible=function(){return t.isVisible()},e.isModal=function(){return!1},e.maximize=function(){e.isMaximized()||t.zoom(null)},e.unmaximize=function(){e.isMaximized()&&t.zoom(null)},e.isMaximized=function(){if(0!=(t.styleMask()&NSResizableWindowMask))return t.isZoomed();var e=NSScreen.mainScreen().visibleFrame(),n=t.frame();return e.origin.x==n.origin.x&&e.origin.y==n.origin.y&&e.size.width==n.size.width&&e.size.height==n.size.height},e.minimize=function(){return t.miniaturize(null)},e.restore=function(){return t.deminiaturize(null)},e.isMinimized=function(){return t.isMiniaturized()},e.setFullScreen=function(n){n!==e.isFullscreen()&&t.toggleFullScreen(null)},e.isFullscreen=function(){return t.styleMask()&NSFullScreenWindowMask},e.setAspectRatio=function(e){e>0?t.setAspectRatio(NSMakeSize(e,1)):t.setResizeIncrements(NSMakeSize(1,1))},e.setBounds=function(n,i){if(!e.isFullscreen()){var o=n.size,r=NSMakeRect(n.origin.x,0,o.width,o.height),s=NSScreen.screens().firstObject();r.origin.y=NSHeight(s.frame())-o.height-n.origin.y,t.setFrame_display_animate(r,!0,i)}},e.getBounds=function(){return t.frame()},e.setContentBounds=function(){},e.getContentBounds=function(){},e.setSize=function(t,n,i){var o=e.getBounds();return o.size.height=n,o.size.width=t,e.setBounds(o,i)},e.getSize=function(){var t=e.getBounds();return[t.size.width,t.size.height]},e.setContentSize=function(t,n,i){var o=e.getContentBounds();return o.size.height=n,o.size.width=t,e.setContentBounds(o,i)},e.getContentSize=function(){var t=e.getContentBounds();return[t.size.width,t.size.height]},e.setMinimumSize=function(e,n){const i={width:e,height:n};t.setContentMinSize(i)},e.getMinimumSize=function(){const e=t.contentMinSize();return[e.width,e.height]},e.setMaximumSize=function(e,n){const i={width:e,height:n};t.setContentMaxSize(i)},e.getMaximumSize=function(){const e=t.contentMaxSize();return[e.width,e.height]},e.setResizable=function(t){return e._setStyleMask(t,NSResizableWindowMask)},e.isResizable=function(){return t.styleMask()&NSResizableWindowMask},e.setMovable=function(e){return t.setMovable(e)},e.isMovable=function(){return t.isMovable()},e.setMinimizable=function(t){return e._setStyleMask(t,NSMiniaturizableWindowMask)},e.isMinimizable=function(){return t.styleMask()&NSMiniaturizableWindowMask},e.setMaximizable=function(e){t.standardWindowButton(NSWindowZoomButton)&&t.standardWindowButton(NSWindowZoomButton).setEnabled(e)},e.isMaximizable=function(){return t.standardWindowButton(NSWindowZoomButton)&&t.standardWindowButton(NSWindowZoomButton).isEnabled()},e.setFullScreenable=function(t){e._setCollectionBehavior(t,NSWindowCollectionBehaviorFullScreenPrimary),e._setCollectionBehavior(!t,NSWindowCollectionBehaviorFullScreenAuxiliary)},e.isFullScreenable=function(){return t.collectionBehavior()&NSWindowCollectionBehaviorFullScreenPrimary},e.setClosable=function(t){e._setStyleMask(t,NSClosableWindowMask)},e.isClosable=function(){return t.styleMask()&NSClosableWindowMask},e.setAlwaysOnTop=function(e,n,i){var o=NSNormalWindowLevel,r=CGWindowLevelForKey(kCGMaximumWindowLevelKey),s=CGWindowLevelForKey(kCGMinimumWindowLevelKey);e&&(o="normal"===n?NSNormalWindowLevel:"torn-off-menu"===n?NSTornOffMenuWindowLevel:"modal-panel"===n?NSModalPanelWindowLevel:"main-menu"===n?NSMainMenuWindowLevel:"status"===n?NSStatusWindowLevel:"pop-up-menu"===n?NSPopUpMenuWindowLevel:"screen-saver"===n?NSScreenSaverWindowLevel:"dock"===n?NSDockWindowLevel:NSFloatingWindowLevel);var a=o+(i||0);if(!(a>=s&&a<=r))throw new Error("relativeLevel must be between "+s+" and "+r);t.setLevel(a)},e.isAlwaysOnTop=function(){return t.level()!==NSNormalWindowLevel},e.moveTop=function(){return t.orderFrontRegardless()},e.center=function(){t.center()},e.setPosition=function(t,n,i){var o=e.getBounds(),r=NSScreen.screens().firstObject().frame();return o.origin.x=t,o.origin.y=Math.round(NSHeight(r)-n),e.setBounds(o,i)},e.getPosition=function(){var t=e.getBounds(),n=NSScreen.screens().firstObject().frame();return[t.origin.x,Math.round(NSHeight(n)-t.origin.y)]},e.setTitle=function(e){t.setTitle(e)},e.getTitle=function(){return String(t.title())};var r=0;e.flashFrame=function(e){e?r=NSApp.requestUserAttention(NSInformationalRequest):(NSApp.cancelUserAttentionRequest(r),r=0)},e.getNativeWindowHandle=function(){return t},e.getNativeWebViewHandle=function(){return i},e.loadURL=function(e){if(/^(?!https?|file).*\.html?$/.test(e)&&"undefined"!=typeof __command&&__command.pluginBundle()&&(e="file://"+__command.pluginBundle().urlForResourceNamed(e).path()),/^file:\/\/.*\.html?$/.test(e))return void i.loadFileURL_allowingReadAccessToURL(NSURL.fileURLWithPath(e),NSURL.fileURLWithPath("file:///"));const t=NSURL.URLWithString(e),n=NSURLRequest.requestWithURL(t);i.loadRequest(n)},e.reload=function(){i.reload()},e.setHasShadow=function(e){return t.setHasShadow(e)},e.hasShadow=function(){return t.hasShadow()},e.setOpacity=function(e){return t.setAlphaValue(e)},e.getOpacity=function(){return t.alphaValue()},e.setVisibleOnAllWorkspaces=function(t){return e._setCollectionBehavior(t,NSWindowCollectionBehaviorCanJoinAllSpaces)},e.isVisibleOnAllWorkspaces=function(){return t.collectionBehavior()&NSWindowCollectionBehaviorCanJoinAllSpaces},e.setIgnoreMouseEvents=function(e){return t.setIgnoresMouseEvents(e)},e.setContentProtection=function(e){t.setSharingType(e?NSWindowSharingNone:NSWindowSharingReadOnly)},e.setAutoHideCursor=function(e){t.setDisableAutoHideCursor(e)},e.setVibrancy=function(n){var i=e._vibrantView;if(!n){if(null==i)return;return i.removeFromSuperview(),void t.setVibrantView(null)}if(null==i){var o=t.contentView();i=NSVisualEffectView.alloc().initWithFrame(o.bounds()),e._vibrantView=i,i.setAutoresizingMask(NSViewWidthSizable|NSViewHeightSizable),i.setBlendingMode(NSVisualEffectBlendingModeBehindWindow),i.setState(NSVisualEffectStateActive),i.setFrame(o.bounds()),o.addSubview_positioned_relativeTo(i,NSWindowBelow,null)}var r=NSVisualEffectMaterialLight;"appearance-based"===n?r=NSVisualEffectMaterialAppearanceBased:"light"===n?r=NSVisualEffectMaterialLight:"dark"===n?r=NSVisualEffectMaterialDark:"titlebar"===n?r=NSVisualEffectMaterialTitlebar:"selection"===n?r=NSVisualEffectMaterialSelection:"menu"===n?r=NSVisualEffectMaterialMenu:"popover"===n?r=NSVisualEffectMaterialPopover:"sidebar"===n?r=NSVisualEffectMaterialSidebar:"medium-light"===n?r=NSVisualEffectMaterialMediumLight:"ultra-dark"===n&&(r=NSVisualEffectMaterialUltraDark),i.setMaterial(r)},e._setBackgroundColor=function(e){var o=function(e){if(!e||"#"!==e[0]){if(e&&e.class&&-1!==n.indexOf(String(e.class())))return e;throw new Error("Incorrect color formating. It should be an hex color: #RRGGBBAA")}var t,i=e.substr(1);if(3===i.length?i+="F":6===i.length&&(i+="FF"),4===i.length)for(var o=0;o<4;o+=1)t+=i[o],t+=i[o];else{if(8!==i.length)return NSColor.whiteColor();t=i}var r=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16),l=parseInt(t.slice(6,8),16);return NSColor.colorWithSRGBRed_green_blue_alpha(r,s,a,l)}(e);i.isOpaque=!1,i.setBackgroundColor(NSColor.clearColor()),t.backgroundColor=o},e._invalidate=function(){t.flushWindow(),t.contentView().setNeedsDisplay(!0)},e._setStyleMask=function(n,i){var o=e.isMaximizable();n?t.setStyleMask(t.styleMask()|i):t.setStyleMask(t.styleMask()&~i),e.setMaximizable(o)},e._setCollectionBehavior=function(n,i){var o=e.isMaximizable();n?t.setCollectionBehavior(t.collectionBehavior()|i):t.setCollectionBehavior(t.collectionBehavior()&~i),e.setMaximizable(o)},e._showWindowButton=function(e){var n=t.standardWindowButton(e);n.superview().addSubview_positioned_relative(n,NSWindowAbove,null)}}},"./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */function(e,t){e.exports={JS_BRIDGE:"__skpm_sketchBridge"}},"./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */function(e,t){e.exports=function(e,t){var n=e.convertPoint_fromView(t.locationInWindow(),null);return"var el = document.elementFromPoint("+n.x+", "+(e.frame().size.height-n.y)+'); if (el && ["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ].indexOf(el.type) >= 0 && el.focus) {el.focus();} else if (el) {el.dispatchEvent(new Event("click", {bubbles: true}))}'}},"./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */function(e,t){function n(e,t,n,i){n.addConstraint(NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(t,e,NSLayoutRelationEqual,n,e,1,i))}e.exports=function(e,t,i){i=i||[],e.setTranslatesAutoresizingMaskIntoConstraints(!1),n(NSLayoutAttributeLeft,e,t,i[0]||0),n(NSLayoutAttributeTop,e,t,i[1]||0),n(NSLayoutAttributeRight,e,t,i[2]||0),n(NSLayoutAttributeBottom,e,t,i[3]||0)}},"./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */function(e,t,n){var i=n(/*! events */"events"),o=n(/*! ./browser-api */"./node_modules/sketch-module-web-view/lib/browser-api.js"),r=n(/*! ./webview-api */"./node_modules/sketch-module-web-view/lib/webview-api.js"),s=n(/*! ./fitSubview */"./node_modules/sketch-module-web-view/lib/fitSubview.js"),a=n(/*! ./dispatch-first-click */"./node_modules/sketch-module-web-view/lib/dispatch-first-click.js"),l=n(/*! ./inject-client-messaging */"./node_modules/sketch-module-web-view/lib/inject-client-messaging.js"),u=n(/*! ./set-delegates */"./node_modules/sketch-module-web-view/lib/set-delegates.js");function c(e){var t=(e=e||{}).identifier||NSUUID.UUID().UUIDString(),n=NSThread.mainThread().threadDictionary(),d=c.fromId(t);if(d)return d;var f=new i;if(f.id=t,e.modal&&!e.parent)throw new Error("A modal needs to have a parent.");var m=coscript.createFiber(),h=e.width||800,p=e.height||600,w=NSScreen.screens().firstObject().frame(),S=NSMakeRect(void 0!==e.x?e.x:Math.round((NSWidth(w)-h)/2),void 0!==e.y?e.y:Math.round((NSHeight(w)-p)/2),h,p);e.titleBarStyle&&"default"!==e.titleBarStyle&&(e.frame=!1);var v="textured"!==e.windowType,b=NSTitledWindowMask;!1!==e.minimizable&&(b|=NSMiniaturizableWindowMask),!1!==e.closable&&(b|=NSClosableWindowMask),!1!==e.resizable&&(b|=NSResizableWindowMask),v&&!e.transparent&&!1!==e.frame||(b|=NSTexturedBackgroundWindowMask);var g=NSPanel.alloc().initWithContentRect_styleMask_backing_defer(S,b,NSBackingStoreBuffered,!0),y=WKWebViewConfiguration.alloc().init(),_=WKWebView.alloc().initWithFrame_configuration(CGRectMake(0,0,e.width||800,e.height||600),y);if(l(_),_.setAutoresizingMask(NSViewWidthSizable|NSViewHeightSizable),o(f,g,_),r(f,g,_),u(f,g,_,e),"desktop"===e.windowType&&(g.setLevel(kCGDesktopWindowLevel-1),g.setCollectionBehavior(NSWindowCollectionBehaviorCanJoinAllSpaces|NSWindowCollectionBehaviorStationary|NSWindowCollectionBehaviorIgnoresCycle)),void 0===e.minWidth&&void 0===e.minHeight||f.setMinimumSize(e.minWidth||0,e.minHeight||0),void 0===e.maxWidth&&void 0===e.maxHeight||f.setMaximumSize(e.maxWidth||1e4,e.maxHeight||1e4),e.transparent||!1===e.frame){g.titlebarAppearsTransparent=!0,g.titleVisibility=NSWindowTitleHidden,g.setOpaque(0),g.isMovableByWindowBackground=!0;var N=NSToolbar.alloc().initWithIdentifier("titlebarStylingToolbar");N.setShowsBaselineSeparator(!1),g.setToolbar(N)}if("hiddenInset"===e.titleBarStyle){var M=NSToolbar.alloc().initWithIdentifier("titlebarStylingToolbar");M.setShowsBaselineSeparator(!1),g.setToolbar(M)}!1!==e.frame&&e.useContentSize||f.setSize(h,p),e.center&&f.center(),e.alwaysOnTop&&f.setAlwaysOnTop(!0),e.fullscreen&&f.setFullScreen(!0),f.setFullScreenable(!!e.fullscreenable);const k=e.title||("undefined"!=typeof __command&&__command.pluginBundle()?__command.pluginBundle().name():void 0);k&&f.setTitle(k);var W=e.backgroundColor;e.transparent&&(W=NSColor.clearColor()),!W&&!1===e.frame&&e.vibrancy&&(W=NSColor.clearColor()),f._setBackgroundColor(W||NSColor.windowBackgroundColor()),!1===e.hasShadow&&f.setHasShadow(!1),void 0!==e.opacity&&f.setOpacity(e.opacity),e.webPreferences=e.webPreferences||{},_.configuration().preferences().setValue_forKey(!1!==e.webPreferences.devTools,"developerExtrasEnabled"),_.configuration().preferences().setValue_forKey(!1!==e.webPreferences.devTools,"javaScriptEnabled"),_.configuration().preferences().setValue_forKey(!!e.webPreferences.plugins,"plugInsEnabled"),_.configuration().preferences().setValue_forKey(e.webPreferences.minimumFontSize||0,"minimumFontSize"),e.webPreferences.zoomFactor&&_.setMagnification(e.webPreferences.zoomFactor);var C=g.contentView();return!1!==e.frame?(_.setFrame(C.bounds()),C.addSubview(_)):(C.setAutoresizingMask(NSViewWidthSizable|NSViewHeightSizable),s(C,C.superview()),_.setFrame(C.bounds()),C.addSubview(_),g.standardWindowButton(NSWindowFullScreenButton)&&g.standardWindowButton(NSWindowFullScreenButton).setHidden(!0),e.titleBarStyle&&"default"!==e.titleBarStyle||(g.standardWindowButton(NSWindowZoomButton).setHidden(!0),g.standardWindowButton(NSWindowMiniaturizeButton).setHidden(!0),g.standardWindowButton(NSWindowCloseButton).setHidden(!0),g.standardWindowButton(NSWindowZoomButton).setEnabled(!1))),e.vibrancy&&f.setVibrancy(e.vibrancy),f.setMaximizable(!1!==e.maximizable),e.acceptsFirstMouse&&f.on("focus",function(e){e.type()===NSEventTypeLeftMouseDown&&f.webContents.executeJavaScript(a(_,e)).catch(()=>{})}),!1!==e.show&&f.show(),f.on("closed",function(){f._destroyed=!0,n.removeObjectForKey(t),m.cleanup()}),n[t]=g,m.onCleanup(function(){f._destroyed||f.destroy()}),f}c.fromId=function(e){var t=NSThread.mainThread().threadDictionary();if(t[e])return c.fromPanel(t[e],e)},c.fromPanel=function(e,t){var n=new i;if(n.id=t,!e||!e.contentView)throw new Error("needs to pass an NSPanel");var s=e.contentView().subviews()[0];if(!s)throw new Error("The NSPanel needs to have a webview");return o(n,e,s),r(n,e,s),n},e.exports=c},"./node_modules/sketch-module-web-view/lib/inject-client-messaging.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
/*! no static exports found */function(e,t,n){var i=n(/*! ./constants */"./node_modules/sketch-module-web-view/lib/constants.js");e.exports=function(e){var t="window.originalPostMessage = window.postMessage;window.postMessage = function(actionName) {if (!actionName) {throw new Error('missing action name')}window.webkit.messageHandlers."+i.JS_BRIDGE+".postMessage(JSON.stringify([].slice.call(arguments)));}",n=WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(t,0,!0);e.configuration().userContentController().addUserScript(n)}},"./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */function(e,t){e.exports=function(e){var t=null;try{t=JSON.parse(e[0])}catch(e){}return t&&t.constructor&&t.constructor===Array&&0!=t.length?t:null}},"./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */function(e,t,n){var i,o,r,s=n(/*! cocoascript-class */"./node_modules/cocoascript-class/lib/index.js").default,a=n(/*! ./parseWebArguments */"./node_modules/sketch-module-web-view/lib/parseWebArguments.js"),l=n(/*! ./constants */"./node_modules/sketch-module-web-view/lib/constants.js");e.exports=function(e,t,n,u){i||(i=s({classname:"WindowDelegateClass",utils:null,panel:null,"windowDidResize:":function(){this.utils.emit("resize")},"windowDidMiniaturize:":function(){this.utils.emit("minimize")},"windowDidDeminiaturize:":function(){this.utils.emit("restore")},"windowDidEnterFullScreen:":function(){this.utils.emit("enter-full-screen")},"windowDidExitFullScreen:":function(){this.utils.emit("leave-full-screen")},"windowDidMove:":function(){this.utils.emit("move"),this.utils.emit("moved")},"windowShouldClose:":function(){var e=!0;return this.utils.emit("close",{get defaultPrevented(){return!e},preventDefault:function(){e=!1}}),e},"windowWillClose:":function(){this.utils.emit("closed")},"windowDidBecomeKey:":function(){this.utils.emit("focus",this.panel.currentEvent())},"windowDidResignKey:":function(){this.utils.emit("blur")}})),o||(o=s({classname:"NavigationDelegateClass",state:NSMutableDictionary.dictionaryWithDictionary({wasReady:0}),utils:null,"webView:didCommitNavigation:":function(e){this.utils.emit("will-navigate",{},String(String(e.URL())))},"webView:didStartProvisionalNavigation:":function(){this.utils.emit("did-start-navigation"),this.utils.emit("did-start-loading")},"webView:didReceiveServerRedirectForProvisionalNavigation:":function(){this.utils.emit("did-get-redirect-request")},"webView:didFailProvisionalNavigation:withError:":function(e,t,n){this.utils.emit("did-fail-load",n)},"webView:didFinishNavigation:":function(){0==this.state.wasReady&&(this.utils.emitBrowserEvent("ready-to-show"),this.state.setObject_forKey(1,"wasReady")),this.utils.emit("did-navigate"),this.utils.emit("did-frame-navigate"),this.utils.emit("did-stop-loading"),this.utils.emit("did-finish-load"),this.utils.emit("did-frame-finish-load")},"webViewWebContentProcessDidTerminate:":function(){this.utils.emit("dom-ready")}})),r||(r=s({classname:"WebScriptHandlerClass",utils:null,"userContentController:didReceiveScriptMessage:":function(e,t){var n=JSON.parse(String(t.body())),i=this.utils.parseWebArguments([JSON.stringify(n)]);i&&this.utils.emit.apply(this,i)}}));var c=o.new();c.utils=NSDictionary.dictionaryWithDictionary({setTitle:e.setTitle.bind(e),emitBrowserEvent(){try{e.emit.apply(e,arguments)}catch(e){throw console.error(e),e}},emit(){try{e.webContents.emit.apply(e.webContents,arguments)}catch(e){throw console.error(e),e}}}),c.state=NSMutableDictionary.dictionaryWithDictionary({wasReady:0}),n.setNavigationDelegate(c);var d=r.new();d.utils=NSDictionary.dictionaryWithDictionary({emit(){try{e.webContents.emit.apply(e.webContents,arguments)}catch(e){throw console.error(e),e}},parseWebArguments:a}),n.configuration().userContentController().addScriptMessageHandler_name(d,l.JS_BRIDGE);var f,m=i.new(),h={emit(){try{e.emit.apply(e,arguments)}catch(e){throw console.error(e),e}}};u.modal&&((f="Document"===u.parent.type?u.parent.sketchObject:u.parent)&&"MSDocumentData"===String(f.class())&&(f=f.delegate()),h.parentWindow=f.windowForSheet());m.utils=NSDictionary.dictionaryWithDictionary(h),m.panel=t,t.setDelegate(m)}},"./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */function(e,t,n){(function(t){var i=n(/*! events */"events");e.exports=function(e,n,o){var r=new i;r.loadURL=e.loadURL,r.loadFile=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.downloadURL=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.getURL=function(){return String(o.url())},r.getTitle=function(){return String(o.title())},r.isDestroyed=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.focus=e.focus,r.isFocused=e.isFocused,r.isLoading=function(){return!!o.loading()},r.isLoadingMainFrame=function(){return!!o.loading()},r.isWaitingForResponse=function(){return!o.loading()},r.stop=function(){o.stopLoading()},r.reload=function(){o.reload()},r.reloadIgnoringCache=function(){o.reloadFromOrigin()},r.canGoBack=function(){return!!o.canGoBack()},r.canGoForward=function(){return!!o.canGoForward()},r.canGoToOffset=function(e){return!!o.backForwardList().itemAtIndex(e)},r.clearHistory=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.goBack=function(){o.goBack()},r.goForward=function(){o.goForward()},r.goToIndex=function(e){var t=o.backForwardList(),n=t.backList(),i=n.count();if(i>e)o.loadRequest(NSURLRequest.requestWithURL(n[e]));else{var r=t.forwardList();if(!(r.count()>e-i))throw new Error("Cannot go to index "+e);o.loadRequest(NSURLRequest.requestWithURL(r[e-i]))}},r.goToOffset=function(e){if(!r.canGoToOffset(e))throw new Error("Cannot go to offset "+e);o.loadRequest(NSURLRequest.requestWithURL(o.backForwardList().itemAtIndex(e)))},r.isCrashed=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.setUserAgent=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.getUserAgent=function(){const e=o.customUserAgent();return e?String(e):void 0},r.insertCSS=function(e){var t="var style = document.createElement('style'); style.innerHTML = "+e.replace(/"/,'\\"')+"; document.head.appendChild(style);",n=WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(t,0,!0);o.configuration().userContentController().addUserScript(n)},r.insertJS=function(e){var t=WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(e,0,!0);o.configuration().userContentController().addUserScript(t)},r.executeJavaScript=function(n,i,s){"function"==typeof i&&(s=i,i=!1);var a=coscript.createFiber();return 0==o.navigationDelegate().valueForKey("state").wasReady?new t(function(t){e.on("ready-to-show",function(){a.cleanup(),t()})}).then(function(){return r.executeJavaScript(n,i,s)}):new t(function(e,t){o.evaluateJavaScript_completionHandler(n,__mocha__.createBlock_function('v28@?0@8c16@"NSError"20',function(n,i){var o=i&&i.class&&("NSException"===String(i.class())||"NSError"===String(i.class()));if(s){try{s(o?i:null,n)}catch(e){}e()}else o?t(i):e(n);a.cleanup()}))})},r.setIgnoreMenuShortcuts=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.setAudioMuted=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.isAudioMuted=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.setZoomFactor=function(e){o.setMagnification_centeredAtPoint(e,CGPointMake(0,0))},r.getZoomFactor=function(e){e(Number(o.magnification()))},r.setZoomLevel=function(e){r.setZoomFactor(Math.pow(1.2,e))},r.getZoomLevel=function(e){e(Math.log(Number(o.magnification()))/Math.log(1.2))},r.setVisualZoomLevelLimits=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.setLayoutZoomLevelLimits=function(){console.warn("Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)")},r.send=function(){const e="window.postMessage({isSketchMessage: true,origin: '"+String(__command.identifier())+"',args: "+JSON.stringify([].slice.call(arguments))+'}, "*")';o.evaluateJavaScript_completionHandler(e,null)},r.getNativeWebview=function(){return o},e.webContents=r}}).call(this,n(/*! ./node_modules/promise-polyfill/lib/index.js */"./node_modules/promise-polyfill/lib/index.js"))},"./src/whaleHomepage.js":
/*!******************************!*\
  !*** ./src/whaleHomepage.js ***!
  \******************************/
/*! no exports provided */function(e,t,n){"use strict";n.r(t);var i=n(/*! sketch-module-web-view */"./node_modules/sketch-module-web-view/lib/index.js"),o=new(n.n(i).a)({width:800,height:600,title:"Efficient design spec"});o.on("closed",function(){o=null}),o.loadURL("https://www.jingwhale.cc/")},events:
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=require("events")}});"default"===e&&"function"==typeof n?n(t):n[e](t)}that.onRun=__skpm_run.bind(this,"default");