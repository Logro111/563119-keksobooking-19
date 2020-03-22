'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAIN_MOUSE_BUTTON = 0;

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
    debounce: debounce,
    getNoun: getNoun
  };
})();
