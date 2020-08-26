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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */



// 创建 InPageEdit 变量
var InPageEdit = window.InPageEdit || {};
// 防止多次运行
if (typeof InPageEdit.version !== 'undefined') {
  throw '[InPageEdit] InPageEdit 已经在运行了';
}

InPageEdit.version = '14.0.0';

// 导入全部模块
// const { quickEdit } = require('./module/quickEdit');
const test = __webpack_require__(/*! ./module/test */ "./module/test.js");
const { _msg } = __webpack_require__(/*! ./module/_msg */ "./module/_msg.js");

// 写入模块
InPageEdit = $.extend({}, InPageEdit, {
  // quickEdit,
  test,
});

// 写入全局变量 window.InPageEdit
window.InPageEdit = InPageEdit;

// 触发钩子
mw.hook('InPageEdit')
  // 传入上下文
  .fire({
    _msg
  });

// 花里胡哨的加载提示
console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');

/***/ }),

/***/ "./module/_msg.js":
/*!************************!*\
  !*** ./module/_msg.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _msg(i) {
  return `(i18njs-${i})`
}

module.exports = {
  _msg
}

/***/ }),

/***/ "./module/test.js":
/*!************************!*\
  !*** ./module/test.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function test() {
  console.log('InPageEdit is runing version', window.InPageEdit.version);
}

/***/ })

/******/ });
//# sourceMappingURL=InPageEdit.js.map