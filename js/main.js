'use strict';

(function () {
  var MAIN_MAP_PIN_HEIGHT_WITH_MARKER = 84;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var filterfieldsGroups = filterForm.querySelectorAll('fieldset');
  var filterSelects = filterForm.querySelectorAll('select');
  var fieldsGroups = form.querySelectorAll('fieldset');
  var mainMapPin = document.querySelector('.map__pin--main');
  var addressField = form.querySelector('[name="address"]');

  var deactivateFormFields = function (fields) {
    Array.prototype.forEach.call(fields, function (elem) {
      elem.removeAttribute('disabled', '');
    });
  };

  var activateFormFields = function (fields) {
    Array.prototype.forEach.call(fields, function (elem) {
      elem.setAttribute('disabled', '');
    });
  };

  var disablePage = function () {
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');

    activateFormFields(fieldsGroups);

    activateFormFields(filterfieldsGroups);

    activateFormFields(filterSelects);

    addressField.value = Math.round(mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2) + ', ' + Math.round(mainMapPin.offsetTop + mainMapPin.offsetHeight / 2);
  };

  var activatePage = function () {
    form.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');

    deactivateFormFields(fieldsGroups);

    deactivateFormFields(filterfieldsGroups);

    deactivateFormFields(filterSelects);

    addressField.value = Math.round(mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2) + ', ' + Math.round(mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT_WITH_MARKER);
    window.pin.renderPins(window.data);
  };

  disablePage();

  window.main = {
    activate: activatePage
  };
})();
