'use strict';

(function () {

  var mainMapPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');

  var onMainMapPinMainMouseButtonPress = function (evt) {
    window.util.isMainMouseButtonEvent(evt, window.main.activate);
  };

  var onMainMapPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, window.main.activate);
  };

  mainMapPin.addEventListener('mousedown', function (evt) {
    window.main.checkPageStatus('disabled', onMainMapPinMainMouseButtonPress, evt);
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    window.main.checkPageStatus('disabled', onMainMapPinMainEnterPress, evt);
  });

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var closeCard = function () {
    document.querySelector('.map__card').remove();
    window.card.closeButton.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', onCardEscPress);
  };

  var openCard = function (evt) {
    var pinData;
    if (evt.target.getAttribute('data-pin-index')) {
      pinData = window.pin.objectToPinMap[evt.target.dataset.pinIndex];
      window.card.render(pinData);
    } else if (evt.target.parentNode.getAttribute('data-pin-index')) {
      pinData = window.pin.objectToPinMap[evt.target.parentNode.dataset.pinIndex];
      window.card.render(pinData);
    }
    if (window.card.closeButton) {
      window.card.closeButton.addEventListener('click', closeCard);
      document.addEventListener('keydown', onCardEscPress);
    }
  };

  pinsContainer.addEventListener('click', openCard);
})();
