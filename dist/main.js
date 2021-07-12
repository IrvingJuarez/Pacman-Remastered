/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/ */ \"./src/routes/index.js\");\n\r\n\r\nwindow.addEventListener(\"load\", _routes___WEBPACK_IMPORTED_MODULE_0__.default)\n\n//# sourceURL=webpack://pacman-remastered/./src/index.js?");

/***/ }),

/***/ "./src/pages/Error404.js":
/*!*******************************!*\
  !*** ./src/pages/Error404.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Error404 = () => {\r\n    const view = `\r\n        <section class=\"ContentError404\">\r\n            <h1>Error 404</h1>\r\n            <span class=\"NotFound\">Pacman not found</span>\r\n            <div class=\"\"></div>\r\n        </section>\r\n    `;\r\n\r\n    return view;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Error404);\n\n//# sourceURL=webpack://pacman-remastered/./src/pages/Error404.js?");

/***/ }),

/***/ "./src/pages/Loading.js":
/*!******************************!*\
  !*** ./src/pages/Loading.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Loading = () => {\r\n    const view = `\r\n        <section class=\"ContentLoading\">\r\n            <div class=\"GifContainer\">\r\n            </div>\r\n            <span class=\"Loading\">Loading...</span>\r\n        </section>\r\n    `;\r\n\r\n    return view;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);\n\n//# sourceURL=webpack://pacman-remastered/./src/pages/Loading.js?");

/***/ }),

/***/ "./src/pages/Playing.js":
/*!******************************!*\
  !*** ./src/pages/Playing.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Playing = () => {\r\n    const view = `\r\n        <section class=\"ContentPlaying\">\r\n            <div class=\"GameBoard\">\r\n            </div>\r\n            <div class=\"GameStatus\">\r\n                <div class=\"LifeContainer\">\r\n                    <img src=\"pacmanImage\">\r\n                    <img src=\"pacmanImage\">\r\n                </div>\r\n                <p class=\"LevelStatus\">Level: <span class=\"LevelQuantity\">0</span></p>\r\n            </div>\r\n        </section>\r\n    `;\r\n\r\n    return view;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playing);\n\n//# sourceURL=webpack://pacman-remastered/./src/pages/Playing.js?");

/***/ }),

/***/ "./src/pages/StartGame.js":
/*!********************************!*\
  !*** ./src/pages/StartGame.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst StartGame = () => {\r\n    const view = `\r\n        <section class=\"ContentStartGame\">\r\n            <div class=\"LogoContainer\"></div>\r\n            <span class=\"Subtitle\">REMASTERED</span>\r\n            <button class=\"PlayButton\">\r\n                Play Game!\r\n            </button>\r\n        </section>\r\n    `;\r\n\r\n    return view;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StartGame);\n\n//# sourceURL=webpack://pacman-remastered/./src/pages/StartGame.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _pages_Error404__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/Error404 */ \"./src/pages/Error404.js\");\n/* harmony import */ var _pages_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/Loading */ \"./src/pages/Loading.js\");\n/* harmony import */ var _pages_Playing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/Playing */ \"./src/pages/Playing.js\");\n/* harmony import */ var _pages_StartGame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/StartGame */ \"./src/pages/StartGame.js\");\n\r\n\r\n\r\n\r\n\r\nconst routes = {\r\n    \"loading\": _pages_Loading__WEBPACK_IMPORTED_MODULE_1__.default,\r\n    \"playing-game\": _pages_Playing__WEBPACK_IMPORTED_MODULE_2__.default,\r\n    \"start-game\": _pages_StartGame__WEBPACK_IMPORTED_MODULE_3__.default\r\n}\r\n\r\nconst router = async () => {\r\n    const content =  false || document.getElementById(\"content\");\r\n\r\n    content.innerHTML = \"I am the content\"\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://pacman-remastered/./src/routes/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;