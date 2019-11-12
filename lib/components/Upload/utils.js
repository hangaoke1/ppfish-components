"use strict";

exports.__esModule = true;
exports.T = T;
exports.fileToObject = fileToObject;
exports.genPercentAdd = genPercentAdd;
exports.getFileItem = getFileItem;
exports.removeFileItem = removeFileItem;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.assign");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function T() {
  return true;
} // Fix IE file.status problem
// via coping a new Object


function fileToObject(file) {
  return __assign(__assign({}, file), {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}
/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */


function genPercentAdd() {
  var k = 0.1;
  var i = 0.01;
  var end = 0.98;
  return function (s) {
    var start = s;

    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;

    if (k < 0.001) {
      k = 0.001;
    }

    return start;
  };
}

function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}

function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });

  if (removed.length === fileList.length) {
    return null;
  }

  return removed;
}