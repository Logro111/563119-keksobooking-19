'use strict';

(function () {
  var MAXIMUM_ROOMS = 100;
  var NOT_FOR_GUESTS_CAPACITY = 0;

  var form = document.querySelector('.ad-form');
  var roomsField = form.querySelector('[name="rooms"]');
  var capacityField = form.querySelector('[name="capacity"]');

  var onFormChangeValidation = function () {
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

  form.addEventListener('change', function () {
    onFormChangeValidation();
  });
})();
