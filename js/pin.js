'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var renderPin = function (offersElement, counter) {
    var newPin = templatePin.cloneNode(true);
    if (offersElement.author && offersElement.author.avatar) {
      newPin.querySelector('img').setAttribute('src', offersElement.author.avatar);
    }

    if (offersElement.offer.title) {
      newPin.querySelector('img').setAttribute('alt', offersElement.offer.title);
    }

    if (offersElement.location) {
      if (offersElement.location.x) {
        newPin.style.left = offersElement.location.x - PIN_WIDTH / 2 + 'px';
      }
      if (offersElement.location.y) {
        newPin.style.top = offersElement.location.y - PIN_HEIGHT + 'px';
      }
    }
    var pinData = 'data-pin-index';
    newPin.setAttribute(pinData, counter);
    window.pin.objectToPinMap[counter] = offersElement;
    return newPin;
  };

  var clearMap = function () {
    if (document.querySelectorAll('.map__pin:not(.map__pin--main)')) {
      document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
        elem.remove();
      });
    }
  };

  var renderPins = function (arr) {
    clearMap();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].offer) {
        fragment.appendChild(renderPin(arr[i], i));
      }
    }
    pinsContainer.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    objectToPinMap: {
      'undefined': undefined
    },
    clearMap: clearMap
  };
})();
