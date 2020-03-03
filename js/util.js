'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAIN_MOUSE_BUTTON = 0;

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
    }
  };
})();
