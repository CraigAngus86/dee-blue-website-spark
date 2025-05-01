"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/next-sanity";
exports.ids = ["vendor-chunks/next-sanity"];
exports.modules = {

/***/ "(rsc)/./node_modules/next-sanity/dist/client.js":
/*!*************************************************!*\
  !*** ./node_modules/next-sanity/dist/client.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createClient: () => (/* binding */ createClient)\n/* harmony export */ });\n/* harmony import */ var _sanity_preview_kit_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/preview-kit/client */ \"(rsc)/./node_modules/@sanity/preview-kit/dist/client.js\");\n\n\nfunction createClient(config) {\n  let {\n    // eslint-disable-next-line prefer-const, no-process-env\n    studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,\n    encodeSourceMap = false\n  } = config;\n  if (encodeSourceMap === \"auto\" && process.env.NEXT_PUBLIC_VERCEL_ENV === \"preview\") {\n    encodeSourceMap = true;\n  }\n  return (0,_sanity_preview_kit_client__WEBPACK_IMPORTED_MODULE_0__.createClient)({\n    ...config,\n    studioUrl,\n    encodeSourceMap\n  });\n}\n\n//# sourceMappingURL=client.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC1zYW5pdHkvZGlzdC9jbGllbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBYTtBQUMrRDtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0VBQWM7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ3dCO0FBQ3hCIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9kZWUtYmx1ZS13ZWJzaXRlLXNwYXJrL25vZGVfbW9kdWxlcy9uZXh0LXNhbml0eS9kaXN0L2NsaWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgYXMgY3JlYXRlQ2xpZW50JDEgfSBmcm9tICdAc2FuaXR5L3ByZXZpZXcta2l0L2NsaWVudCc7XG5mdW5jdGlvbiBjcmVhdGVDbGllbnQoY29uZmlnKSB7XG4gIGxldCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdCwgbm8tcHJvY2Vzcy1lbnZcbiAgICBzdHVkaW9VcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TQU5JVFlfU1RVRElPX1VSTCxcbiAgICBlbmNvZGVTb3VyY2VNYXAgPSBmYWxzZVxuICB9ID0gY29uZmlnO1xuICBpZiAoZW5jb2RlU291cmNlTWFwID09PSBcImF1dG9cIiAmJiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19WRVJDRUxfRU5WID09PSBcInByZXZpZXdcIikge1xuICAgIGVuY29kZVNvdXJjZU1hcCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNsaWVudCQxKHtcbiAgICAuLi5jb25maWcsXG4gICAgc3R1ZGlvVXJsLFxuICAgIGVuY29kZVNvdXJjZU1hcFxuICB9KTtcbn1cbmV4cG9ydCB7IGNyZWF0ZUNsaWVudCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xpZW50LmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next-sanity/dist/client.js\n");

/***/ })

};
;