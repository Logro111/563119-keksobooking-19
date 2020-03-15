'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterTypeField = filterForm.querySelector('[name="housing-type"]');
  var PINS_AMOUNT = 5;

  var filterHouseType = function (offerElem) {
    var result = true;
    if (filterTypeField.value !== 'any') {
      result = offerElem.offer.type === filterTypeField.value;
    }
    return result;
  };

  var filterAds = function (arr) {
    var filteredArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (filterHouseType(arr[i])) {
        filteredArr.push(arr[i]);
      }
      if (filteredArr.length === PINS_AMOUNT) {
        break;
      }
    }
    return filteredArr;
  };

  window.filterData = filterAds;
})();
