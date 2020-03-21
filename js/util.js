'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAIN_MOUSE_BUTTON = 0;

  var randomizeNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var randomizeArrElevent = function (arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
  };

  var sortArr = function (arr) {
    var newArr = arr.slice();
    var randomIndex;
    var sortedElement;
    for (var i = newArr.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      sortedElement = newArr[randomIndex];
      newArr[randomIndex] = newArr[i];
      newArr[i] = sortedElement;
    }
    return newArr;
  };

  var randomizeArrLength = function (arr) {
    arr.slice(0, randomizeNumber(1, arr.length + 2));
  };

  var debounce = function (action, interval) {
    var lastTimeout;

    return function (arg) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, interval, arg);
    };
  };

  var getNoun = function (number, one, two, five) {
    var n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  };

  window.util = {
    esc: ESC_KEY,
    isMainMouseButtonEvent: function (evt, action) {
      if (evt.button === MAIN_MOUSE_BUTTON) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    randomizeNumber: randomizeNumber,
    randomizeArrElevent: randomizeArrElevent,
    sortArr: sortArr,
    randomizeArrLength: randomizeArrLength,
    debounce: debounce,
    getNoun: getNoun
  };
})();
