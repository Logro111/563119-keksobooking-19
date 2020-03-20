'use strict';

(function () {
  var debounce = function (action, interval) {
    var lastTimeout;

    return function (arg) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, interval, arg);
    };
  };
  window.debounce = debounce;
})();
