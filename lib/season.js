"use strict";

// NBA tips off in late October (9 in 0-index).
var NBA_START_MONTH = 9;

// TODO figure out what this really is.
var START_YEAR = 1900;

var END_YEAR = new Date().getFullYear();

function validateYear (year) {
  var num = Number(year);
  if (isNaN(num)) {
    throw new TypeError("Cannot convert " + year + "to number");
  }
  if (num < START_YEAR || num > END_YEAR) {
    throw new Error("Data unavailable for " + year);
  }
  return true;
}

function Season (startYear) {
  validateYear(startYear);
  var start = Number(startYear);
  var end = start + 1;
  var instance = {
    prev: function () {
      return Season(start - 1);
    },
    next: function () {
      return Season(end);
    },
    toString: function () {
      return start + "0" + String(end).slice(2);
    },
    toArray: function () {
      return [start, end];
    }
  };
  return instance;
}

Season.current = function () {
  var now = new Date();
  var year = now.getMonth() >= NBA_START_MONTH ?
    now.getFullYear() :
    now.getFullYear() - 1;
  return Season(year);
};

module.exports = Season;
