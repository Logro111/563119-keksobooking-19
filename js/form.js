'use strict';

(function () {
  var MAXIMUM_ROOMS = 100;
  var NOT_FOR_GUESTS_CAPACITY = 0;

  var form = document.querySelector('.ad-form');
  var roomsField = form.querySelector('[name="rooms"]');
  var capacityField = form.querySelector('[name="capacity"]');
  var houseTypeField = form.querySelector('[name="type"]');
  var priceField = form.querySelector('[name="price"]');
  var checkInField = form.querySelector('[name="timein"]');
  var checkOutField = form.querySelector('[name="timeout"]');
  var formReset = form.querySelector('.ad-form__reset');
  var mainMapPin = document.querySelector('.map__pin--main');
  var addressField = form.querySelector('[name="address"]');
  var filterForm = document.querySelector('.map__filters');

  var houseTypeToMinPice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var capacityValidation = function () {
    var capacityFieldValue = Number(capacityField.value);
    var roomsFieldValue = Number(roomsField.value);
    if (capacityFieldValue > roomsFieldValue) {
      capacityField.setCustomValidity('Гостей должно быть не больше количества комнат');
    } else if (roomsFieldValue < MAXIMUM_ROOMS && capacityFieldValue === NOT_FOR_GUESTS_CAPACITY) {
      capacityField.setCustomValidity('Необходимо указать количество гостей');
    } else if (roomsFieldValue === MAXIMUM_ROOMS && capacityFieldValue > NOT_FOR_GUESTS_CAPACITY) {
      capacityField.setCustomValidity('Жилье от 100 комнат сдается только не для гостей');
    } else {
      capacityField.setCustomValidity('');
    }
  };

  var houseTypeValidation = function () {
    var price = houseTypeToMinPice[houseTypeField.value];
    priceField.setAttribute('placeholder', price);
    priceField.setAttribute('min', price);
    if (priceField.validity.rangeUnderflow) {
      priceField.setCustomValidity('Минимальная цена при заданном типе жилья ( ' + window.card.objHouseTypeToCardField[houseTypeField.value].toLowerCase() + ') - ' + price);
    } else if (priceField.validity.rangeOverflow) {
      priceField.setCustomValidity('Максимальная цена' + priceField.getAttribute('max'));
    } else {
      priceField.setCustomValidity('');
    }
  };

  var timeValidation = function (evt) {
    if (evt.target === checkInField) {
      checkOutField.value = checkInField.value;
    }
    if (evt.target === checkOutField) {
      checkInField.value = checkOutField.value;
    }
  };

  var onFormChangeValidation = function (evt) {
    capacityValidation();
    houseTypeValidation();
    timeValidation(evt);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.createHttpRequest(window.successPopup, window.errorPopup.showError, window.backend.saveURL, 'POST', data);
    resetPage();
  };

  var resetPage = function () {
    window.main.disable();
    window.pin.clearMap();
    window.card.remove();
    mainMapPin.style.left = window.mainMapPinMove.startPinPosition.x + 'px';
    mainMapPin.style.top = window.mainMapPinMove.startPinPosition.y + 'px';
    form.reset();
    filterForm.reset();
    addressField.value = window.main.disabledAddresValue;
  };

  form.addEventListener('change', function (evt) {
    onFormChangeValidation(evt);
  });

  form.addEventListener('submit', onFormSubmit);

  formReset.addEventListener('click', function (evt) {
    window.main.checkPageStatus('activated', resetPage, evt);
  });
})();
