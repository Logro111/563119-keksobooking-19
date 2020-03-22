'use strict';

(function () {

  var mainMapPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');
  var lastPin;

  var onMainMapPinMainMouseButtonPress = function (evt) {
    window.util.isMainMouseButtonEvent(evt, window.main.activate);
    window.form.setMinPrice();
  };

  var onMainMapPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, window.main.activate);
    window.form.setMinPrice();
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

  var checkLastPin = function () {
    if (lastPin) {
      lastPin.classList.remove('map__pin--active');
    }
  };

  var closeCard = function () {
    document.querySelector('.map__card').remove();
    window.card.closeButton.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', onCardEscPress);
    checkLastPin();
  };


  var openCard = function (evt) {
    var pinData;

    if (evt.target.dataset.pinIndex || evt.target.parentNode.dataset.pinIndex) {

      checkLastPin();

      var pinTarget = evt.target;
      pinData = window.pin.objectToPinMap[pinTarget.dataset.pinIndex];

      if (!pinData) {
        pinTarget = evt.target.parentNode;
        pinData = window.pin.objectToPinMap[pinTarget.dataset.pinIndex];
      }

      pinTarget.classList.add('map__pin--active');
      lastPin = pinTarget;
      window.card.render(pinData);
    }

    if (window.card.closeButton) {
      window.card.closeButton.addEventListener('click', closeCard);
      document.addEventListener('keydown', onCardEscPress);
    }
  };

  pinsContainer.addEventListener('click', openCard);
})();
