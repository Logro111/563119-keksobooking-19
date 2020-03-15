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
  var loadedPins = [];
  var filterTypeField = filterForm.querySelector('[name="housing-type"]');

  var activateFormFields = function (fields) {
    Array.prototype.forEach.call(fields, function (elem) {
      elem.removeAttribute('disabled', '');
    });
  };

  var deactivateFormFields = function (fields) {
    Array.prototype.forEach.call(fields, function (elem) {
      elem.setAttribute('disabled', '');
    });
  };

  var disablePage = function () {
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');

    deactivateFormFields(fieldsGroups);

    deactivateFormFields(filterfieldsGroups);

    deactivateFormFields(filterSelects);

    addressField.value = Math.round(mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2) + ', ' + Math.round(mainMapPin.offsetTop + mainMapPin.offsetHeight / 2);
  };

  var onLoadSuccess = function (data) {
    activateFormFields(filterfieldsGroups);
    activateFormFields(filterSelects);
    loadedPins = data;
    window.pin.renderPins(window.filterData(loadedPins));
  };

  var activatePage = function () {
    form.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');

    activateFormFields(fieldsGroups);

    addressField.value = Math.round(mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2) + ', ' + Math.round(mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT_WITH_MARKER);

    window.backend.createHttpRequest(onLoadSuccess, window.onError, 'Ошибка загрузки', window.backend.loadURL, 'GET');
  };

  disablePage();

  filterTypeField.addEventListener('change', function () {
    window.pin.renderPins(window.filterData(loadedPins));
  });

  window.main = {
    activate: activatePage
  };
})();
