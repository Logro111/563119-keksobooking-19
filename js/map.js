'use strict';

(function () {

  var mainMapPin = document.querySelector('.map__pin--main');

  mainMapPin.addEventListener('mousedown', function (evt) {
    window.util.isMainMouseButtonEvent(evt, window.main.activate);
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.main.activate);
  });
})();
