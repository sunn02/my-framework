/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["miniFramework"] = factory();
	else
		root["miniFramework"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Actions: () => (/* binding */ Actions),\n/* harmony export */   AppStore: () => (/* binding */ AppStore),\n/* harmony export */   dispatch: () => (/* binding */ dispatch),\n/* harmony export */   miniFramework: () => (/* binding */ miniFramework),\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// --- Store ---\nvar AppStore = {\n  state: {\n    items: []\n  },\n  listeners: [],\n  getState: function getState() {\n    return this.state;\n  },\n  subscribe: function subscribe(listener) {\n    this.listeners.push(listener);\n  },\n  setState: function setState(newState) {\n    this.state = _objectSpread(_objectSpread({}, this.state), newState);\n    this.listeners.forEach(function (listener) {\n      return listener();\n    });\n  }\n};\n\n// --- Actions ---\nvar Actions = {\n  addItem: function addItem(item) {\n    var currentState = AppStore.getState();\n    AppStore.setState({\n      items: [].concat(_toConsumableArray(currentState.items), [item])\n    });\n  }\n};\nvar dispatch = function dispatch(action) {\n  var currentState = AppStore.getState();\n  switch (action.type) {\n    case \"ADD_ITEM\":\n      AppStore.setState({\n        items: [].concat(_toConsumableArray(currentState.items), [action.payload])\n      });\n      break;\n    default:\n      console.warn(\"Unknown action:\", action);\n  }\n};\nvar miniFramework = {\n  createElement: function createElement(type, props) {\n    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      children[_key - 2] = arguments[_key];\n    }\n    return {\n      type: type,\n      props: _objectSpread(_objectSpread({}, props), {}, {\n        children: children.length ? children : []\n      })\n    };\n  }\n};\nvar render = function render(frameworkEl, container) {\n  if (!container) return;\n  diff(container._virtualDOM, frameworkEl, container);\n  container._virtualDOM = frameworkEl; // Store the new virtual DOM for diffing later\n};\nfunction createRealDOM(node) {\n  if (typeof node === 'string' || typeof node === 'number') {\n    return document.createTextNode(node);\n  }\n  var domElement = document.createElement(node.type);\n  Object.keys(node.props).filter(function (key) {\n    return key !== 'children';\n  }).forEach(function (prop) {\n    if (prop.startsWith('on')) {\n      var event = prop.substring(2).toLowerCase();\n      domElement.addEventListener(event, node.props[prop]);\n    } else {\n      domElement[prop] = node.props[prop];\n    }\n  });\n  node.props.children.forEach(function (child) {\n    domElement.appendChild(createRealDOM(child));\n  });\n  return domElement;\n}\nfunction diff(oldNode, newNode, container) {\n  if (!oldNode && newNode) {\n    container.appendChild(createRealDOM(newNode));\n    return;\n  }\n  if (!newNode) {\n    container.removeChild(oldNode);\n    return;\n  }\n  if (_typeof(oldNode) !== _typeof(newNode) || oldNode.type !== newNode.type) {\n    container.replaceChild(createRealDOM(newNode), oldNode);\n    return;\n  }\n  if (typeof newNode === 'string' || typeof newNode === 'number') {\n    if (oldNode.nodeValue !== newNode) {\n      oldNode.nodeValue = newNode;\n    }\n    return;\n  }\n  var oldChildren = oldNode.childNodes || [];\n  var newChildren = newNode.props.children || [];\n\n  // Recursividad para los hijos\n  newChildren.forEach(function (child, i) {\n    if (oldChildren[i]) {\n      diff(oldChildren[i], child, oldNode);\n    } else {\n      container.appendChild(createRealDOM(child));\n    }\n  });\n}\n\n//# sourceURL=webpack://miniFramework/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});