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
      priceField.setCustomValidity('Минимальная цена при заданном типе жилья ( ' + window.card.houseTypeValuesMap[houseTypeField.value].toLowerCase() + ') - ' + price);
    } else if (priceField.validity.rangeOverflow) {
      priceField.setCustomValidity('Максимальная цена' + priceField.getAttribute('max'));
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

  form.addEventListener('change', function (evt) {
    onFormChangeValidation(evt);
  });
})();
