'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = document.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var renderPin = function (offersElement) {
    var newPin = templatePin.cloneNode(true);
    newPin.querySelector('img').setAttribute('src', offersElement.author.avatar);
    newPin.querySelector('img').setAttribute('alt', offersElement.offer.title);
    newPin.style.left = offersElement.location.x - pin.offsetWidth / 2 + 'px';
    newPin.style.top = offersElement.location.y - pin.offsetHeight + 'px';

    return newPin;
  };

  var renderPins = function (arr) {
    for (var i = 0; i < window.data.offersNumber; i++) {
      fragment.appendChild(renderPin(arr[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
