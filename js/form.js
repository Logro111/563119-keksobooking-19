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
  var formSubmitButton = form.querySelector('.ad-form__submit');
  var avatarField = form.querySelector('.ad-form__field').querySelector('input');
  var avatar = form.querySelector('.ad-form-header__preview').querySelector('img');
  var housePhotoField = form.querySelector('.ad-form__upload').querySelector('input');
  var housePhoto = form.querySelector('.ad-form__photo');

  var houseTypeToMinPice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var validateCapacity = function () {
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

  var setMinPrice = function () {
    var price = houseTypeToMinPice[houseTypeField.value];
    priceField.setAttribute('placeholder', price);
    priceField.setAttribute('min', price);
  };

  var validateHouseType = function () {
    setMinPrice();
    if (priceField.validity.rangeUnderflow) {
      priceField.setCustomValidity('Минимальная цена при заданном типе жилья ( ' + window.card.objHouseTypeToCardField[houseTypeField.value].toLowerCase() + ') - ' + houseTypeToMinPice[houseTypeField.value]);
    } else if (priceField.validity.rangeOverflow) {
      priceField.setCustomValidity('Максимальная цена ' + priceField.getAttribute('max'));
    } else {
      priceField.setCustomValidity('');
    }
  };

  var validateTime = function (evt) {
    if (evt.target === checkInField) {
      checkOutField.value = checkInField.value;
    }
    if (evt.target === checkOutField) {
      checkInField.value = checkOutField.value;
    }
  };

  var validateForm = function (evt) {
    validateHouseType();
    validateCapacity();
    validateTime(evt);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.createHttpRequest(window.successPopup, window.errorPopup.show, window.backend.saveURL, 'POST', data);
    resetPage();
  };

  var resetPage = function () {
    window.main.disable();
    window.pin.clearMap();
    window.card.remove();
    mainMapPin.style.left = window.main.startMainPinPosition.x + 'px';
    mainMapPin.style.top = window.main.startMainPinPosition.y + 'px';
    form.reset();
    filterForm.reset();
    addressField.value = window.main.disabledAddresValue;
    setMinPrice();
    avatar.src = 'img/muffin-grey.svg';
    housePhoto.removeAttribute('style');
  };

  var onFieldInput = function (evt) {
    validateForm(evt);
    if (evt.target.validity.valid) {
      evt.target.style.outline = '';
    } else {
      evt.target.style.outline = '5px solid red';
    }
  };

  var onFormSubmitButtonClick = function (evt) {
    validateForm(evt);
    form.querySelectorAll('.ad-form__element :invalid').forEach(function (elem) {
      elem.removeEventListener('input', onFieldInput);
      elem.style.outline = '5px solid red';
      elem.addEventListener('input', onFieldInput);
    });
  };

  form.addEventListener('change', validateForm);

  formSubmitButton.addEventListener('click', onFormSubmitButtonClick);

  form.addEventListener('submit', onFormSubmit);

  formReset.addEventListener('click', function (evt) {
    window.main.checkPageStatus('activated', resetPage, evt);
  });

  window.loadImg(avatarField, avatar);
  window.loadImg(housePhotoField, housePhoto);

  window.form = {
    setMinPrice: setMinPrice
  };
})();
