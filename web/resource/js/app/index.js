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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dateformat/lib/dateformat.js":
/*!***************************************************!*\
  !*** ./node_modules/dateformat/lib/dateformat.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*\n * Date Format 1.2.3\n * (c) 2007-2009 Steven Levithan <stevenlevithan.com>\n * MIT license\n *\n * Includes enhancements by Scott Trenda <scott.trenda.net>\n * and Kris Kowal <cixar.com/~kris.kowal/>\n *\n * Accepts a date, a mask, or a date and a mask.\n * Returns a formatted version of the given date.\n * The date defaults to the current date/time.\n * The mask defaults to dateFormat.masks.default.\n */\n\n(function(global) {\n  'use strict';\n\n  var dateFormat = (function() {\n      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\\1?|[LloSZWN]|\"[^\"]*\"|'[^']*'/g;\n      var timezone = /\\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\\d{4})?)\\b/g;\n      var timezoneClip = /[^-+\\dA-Z]/g;\n  \n      // Regexes and supporting functions are cached through closure\n      return function (date, mask, utc, gmt) {\n  \n        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)\n        if (arguments.length === 1 && kindOf(date) === 'string' && !/\\d/.test(date)) {\n          mask = date;\n          date = undefined;\n        }\n  \n        date = date || new Date;\n  \n        if(!(date instanceof Date)) {\n          date = new Date(date);\n        }\n  \n        if (isNaN(date)) {\n          throw TypeError('Invalid date');\n        }\n  \n        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);\n  \n        // Allow setting the utc/gmt argument via the mask\n        var maskSlice = mask.slice(0, 4);\n        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {\n          mask = mask.slice(4);\n          utc = true;\n          if (maskSlice === 'GMT:') {\n            gmt = true;\n          }\n        }\n  \n        var _ = utc ? 'getUTC' : 'get';\n        var d = date[_ + 'Date']();\n        var D = date[_ + 'Day']();\n        var m = date[_ + 'Month']();\n        var y = date[_ + 'FullYear']();\n        var H = date[_ + 'Hours']();\n        var M = date[_ + 'Minutes']();\n        var s = date[_ + 'Seconds']();\n        var L = date[_ + 'Milliseconds']();\n        var o = utc ? 0 : date.getTimezoneOffset();\n        var W = getWeek(date);\n        var N = getDayOfWeek(date);\n        var flags = {\n          d:    d,\n          dd:   pad(d),\n          ddd:  dateFormat.i18n.dayNames[D],\n          dddd: dateFormat.i18n.dayNames[D + 7],\n          m:    m + 1,\n          mm:   pad(m + 1),\n          mmm:  dateFormat.i18n.monthNames[m],\n          mmmm: dateFormat.i18n.monthNames[m + 12],\n          yy:   String(y).slice(2),\n          yyyy: y,\n          h:    H % 12 || 12,\n          hh:   pad(H % 12 || 12),\n          H:    H,\n          HH:   pad(H),\n          M:    M,\n          MM:   pad(M),\n          s:    s,\n          ss:   pad(s),\n          l:    pad(L, 3),\n          L:    pad(Math.round(L / 10)),\n          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],\n          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],\n          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],\n          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],\n          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),\n          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),\n          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],\n          W:    W,\n          N:    N\n        };\n  \n        return mask.replace(token, function (match) {\n          if (match in flags) {\n            return flags[match];\n          }\n          return match.slice(1, match.length - 1);\n        });\n      };\n    })();\n\n  dateFormat.masks = {\n    'default':               'ddd mmm dd yyyy HH:MM:ss',\n    'shortDate':             'm/d/yy',\n    'mediumDate':            'mmm d, yyyy',\n    'longDate':              'mmmm d, yyyy',\n    'fullDate':              'dddd, mmmm d, yyyy',\n    'shortTime':             'h:MM TT',\n    'mediumTime':            'h:MM:ss TT',\n    'longTime':              'h:MM:ss TT Z',\n    'isoDate':               'yyyy-mm-dd',\n    'isoTime':               'HH:MM:ss',\n    'isoDateTime':           'yyyy-mm-dd\\'T\\'HH:MM:sso',\n    'isoUtcDateTime':        'UTC:yyyy-mm-dd\\'T\\'HH:MM:ss\\'Z\\'',\n    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'\n  };\n\n  // Internationalization strings\n  dateFormat.i18n = {\n    dayNames: [\n      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',\n      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'\n    ],\n    monthNames: [\n      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'\n    ],\n    timeNames: [\n      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'\n    ]\n  };\n\nfunction pad(val, len) {\n  val = String(val);\n  len = len || 2;\n  while (val.length < len) {\n    val = '0' + val;\n  }\n  return val;\n}\n\n/**\n * Get the ISO 8601 week number\n * Based on comments from\n * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html\n *\n * @param  {Object} `date`\n * @return {Number}\n */\nfunction getWeek(date) {\n  // Remove time components of date\n  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());\n\n  // Change date to Thursday same week\n  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);\n\n  // Take January 4th as it is always in week 1 (see ISO 8601)\n  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);\n\n  // Change date to Thursday same week\n  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);\n\n  // Check if daylight-saving-time-switch occurred and correct for it\n  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();\n  targetThursday.setHours(targetThursday.getHours() - ds);\n\n  // Number of weeks between target Thursday and first Thursday\n  var weekDiff = (targetThursday - firstThursday) / (86400000*7);\n  return 1 + Math.floor(weekDiff);\n}\n\n/**\n * Get ISO-8601 numeric representation of the day of the week\n * 1 (for Monday) through 7 (for Sunday)\n * \n * @param  {Object} `date`\n * @return {Number}\n */\nfunction getDayOfWeek(date) {\n  var dow = date.getDay();\n  if(dow === 0) {\n    dow = 7;\n  }\n  return dow;\n}\n\n/**\n * kind-of shortcut\n * @param  {*} val\n * @return {String}\n */\nfunction kindOf(val) {\n  if (val === null) {\n    return 'null';\n  }\n\n  if (val === undefined) {\n    return 'undefined';\n  }\n\n  if (typeof val !== 'object') {\n    return typeof val;\n  }\n\n  if (Array.isArray(val)) {\n    return 'array';\n  }\n\n  return {}.toString.call(val)\n    .slice(8, -1).toLowerCase();\n};\n\n\n\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n      return dateFormat;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(this);\n\n\n//# sourceURL=webpack:///./node_modules/dateformat/lib/dateformat.js?");

/***/ }),

/***/ "./source/js/index.js":
/*!****************************!*\
  !*** ./source/js/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _dateformat = __webpack_require__(/*! dateformat */ \"./node_modules/dateformat/lib/dateformat.js\");\n\nvar _dateformat2 = _interopRequireDefault(_dateformat);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nwindow.onload = function () {\n  var giftrade = JSON.parse(document.querySelector('#giftrade').getAttribute('data'));\n  var amaten = JSON.parse(document.querySelector('#amaten').getAttribute('data'));\n\n  var chart = new CanvasJS.Chart('chart', {\n    title: {\n      text: 'Rate'\n    },\n    data: [{\n      type: 'area',\n      dataPoints: giftrade.map(function (row) {\n        return {\n          x: new Date(row.date),\n          y: row.rate\n        };\n      })\n    }, {\n      type: 'area',\n      dataPoints: amaten.map(function (row) {\n        return {\n          x: new Date(row.date),\n          y: row.rate\n        };\n      })\n    }],\n    axisX: {\n      labelFormatter: function labelFormatter(e) {\n        return (0, _dateformat2.default)(new Date(e.value), 'mm-dd HH:MM');\n      },\n      valueFormatString: 'MM-DD HH:mm'\n    },\n    axisY: {\n      minimum: 80\n    }\n  });\n  chart.render();\n};\n\ndocument.querySelectorAll('[data-config-toggle]').forEach(function (toggle) {\n  var key = toggle.dataset.key;\n  if (!key) {\n    return;\n  }\n  toggle.addEventListener('click', function (event) {\n    var currentValue = event.target.dataset.currentValue;\n    if (currentValue === undefined) {\n      return;\n    }\n    var nextValue = currentValue !== 'true';\n    fetch('/config', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(_defineProperty({}, key, nextValue))\n    }).then(function () {\n      location.reload();\n    });\n  });\n});\n\n//# sourceURL=webpack:///./source/js/index.js?");

/***/ })

/******/ });