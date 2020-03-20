'use strict';

(function () {
  var PINS_AMOUNT = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var filterTypeField = filterForm.querySelector('[name="housing-type"]');
  var priceField = filterForm.querySelector('[name="housing-price"]');
  var roomsField = filterForm.querySelector('[name="housing-rooms"]');
  var guestsField = filterForm.querySelector('[name="housing-guests"]');
  var features = filterForm.querySelectorAll('[name="features"]');

  var filterFeatures = function (offerElem) {
    var result = true;
    for (var j = 0; j < features.length; j++) {
      if (features[j].checked === true) {
        result = false;
        for (var i = 0; i < offerElem.offer.features.length; i++) {
          if (features[j].value === offerElem.offer.features[i]) {
            result = true;
            break;
          }
        }
        if (!result) {
          break;
        }
      }
    }
    return result;
  };

  var filter = function (offerElem, offerProperty, field) {
    var result = true;
    if (field.value !== 'any') {
      result = String(offerElem.offer[offerProperty]) === field.value;
    }
    return result;
  };

  var filterPrice = function (offerElem) {
    switch (priceField.value) {
      case 'middle':
        return offerElem.offer.price >= MIN_PRICE && offerElem.offer.price <= MAX_PRICE;
      case 'low':
        return offerElem.offer.price < MIN_PRICE;
      case 'high':
        return offerElem.offer.price > MAX_PRICE;
      default:
        return true;
    }
  };

  var checkObjProperty = function (ObjProperty, action, arrElem, property, fieldType) {
    var result = false;
    if (!(ObjProperty === undefined)) {
      result = action(arrElem, property, fieldType);
    }
    return result;
  };

  var filterAds = function (arr) {
    var filteredArr = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].offer) {
        var allFiltersResult = checkObjProperty(arr[i].offer.type, filter, arr[i], 'type', filterTypeField)
          && checkObjProperty(arr[i].offer.price, filterPrice, arr[i])
          && checkObjProperty(arr[i].offer.rooms, filter, arr[i], 'rooms', roomsField)
          && checkObjProperty(arr[i].offer.guests, filter, arr[i], 'guests', guestsField)
          && checkObjProperty(arr[i].offer.features, filterFeatures, arr[i]);

        if (allFiltersResult) {
          filteredArr.push(arr[i]);
        }
        if (filteredArr.length === PINS_AMOUNT) {
          break;
        }
      }
    }
    return filteredArr;
  };

  window.filterData = filterAds;
})();
