'use strict';

(function () {
  var MAIN_MAP_PIN_HEIGHT_WITH_MARKER = 84;
  var MAIN_MAP_PIN_MIN_Y_COORDINATE = 130 - MAIN_MAP_PIN_HEIGHT_WITH_MARKER;
  var MAIN_MAP_PIN_MAX_Y_COORDINATE = 630 - MAIN_MAP_PIN_HEIGHT_WITH_MARKER;
  var mainMapPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var addressField = form.querySelector('[name="address"]');
  var mainMapPinHalfWidth = Math.floor(mainMapPin.offsetWidth / 2);
  var mainMapPinMinXCoordinate = 0 - mainMapPinHalfWidth;
  var mainMapPinMaxXCoordinate = pinsContainer.offsetWidth - mainMapPinHalfWidth;

  var setAddress = function (yCoord) {
    addressField.value = (mainMapPin.offsetLeft + mainMapPinHalfWidth) + ', ' + (yCoord);
  };

  var onMainMapPinMousedown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinShiftX = mainMapPin.offsetLeft + shift.x;
      var pinShiftY = mainMapPin.offsetTop + shift.y;

      if (pinShiftX >= mainMapPinMinXCoordinate && pinShiftX <= mainMapPinMaxXCoordinate) {
        mainMapPin.style.left = pinShiftX + 'px';
      }

      if (pinShiftY >= MAIN_MAP_PIN_MIN_Y_COORDINATE && pinShiftY <= MAIN_MAP_PIN_MAX_Y_COORDINATE) {
        mainMapPin.style.top = pinShiftY + 'px';
      }

      setAddress(mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT_WITH_MARKER);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  mainMapPin.addEventListener('mousedown', onMainMapPinMousedown);

  window.mainMapPinMove = {
    setAddress: setAddress
  };
})();

