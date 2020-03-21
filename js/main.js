'use strict';

(function () {
  var MAIN_MAP_PIN_HEIGHT_WITH_MARKER = 84;
  var RENDER_PINS_INTERVAL = 500;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var filterfieldsGroups = filterForm.querySelectorAll('fieldset');
  var filterSelects = filterForm.querySelectorAll('select');
  var fieldsGroups = form.querySelectorAll('fieldset');
  var mainMapPin = document.querySelector('.map__pin--main');
  var loadedPins = [];
  var mainMapPinCenterY = Math.floor(mainMapPin.offsetTop + mainMapPin.offsetHeight / 2);
  var pageState = 'disabled';
  var addressField = form.querySelector('[name="address"]');

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
    pageState = 'disabled';
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');

    deactivateFormFields(fieldsGroups);

    deactivateFormFields(filterfieldsGroups);

    deactivateFormFields(filterSelects);

    window.mainMapPinMove.setAddress(mainMapPinCenterY);
  };

  var onLoadSuccess = function (data) {
    activateFormFields(filterfieldsGroups);
    activateFormFields(filterSelects);
    loadedPins = data;
    window.pin.renderPins(window.filterData(loadedPins));
  };

  var activatePage = function () {
    pageState = 'activated';
    form.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');

    activateFormFields(fieldsGroups);


    window.mainMapPinMove.setAddress(mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT_WITH_MARKER);

    window.form.setMinPrice();

    window.backend.createHttpRequest(onLoadSuccess, window.errorPopup.showLoadError, window.backend.loadURL, 'GET');
  };

  var checkPageStatus = function (state, action, evt) {
    if (pageState === state) {
      action(evt);
    }
  };

  disablePage();

  var renderPinsDebounce = window.util.debounce(window.pin.renderPins, RENDER_PINS_INTERVAL);

  filterForm.addEventListener('change', function () {
    renderPinsDebounce(window.filterData(loadedPins));
    window.card.remove();
  });

  window.main = {
    activate: activatePage,
    disable: disablePage,
    checkPageStatus: checkPageStatus,
    disabledAddresValue: addressField.value,
    startMainPinPosition: {
      x: mainMapPin.offsetLeft,
      y: mainMapPin.offsetTop
    }
  };
})();
