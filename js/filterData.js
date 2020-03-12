'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterTypeField = filterForm.querySelector('[name="housing-type"]');

  var filterHouseType = function (offerElem) {
    var result;
    if (filterTypeField.value === 'any') {
      result = true;
    } else {
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
      if (filteredArr.length === 5) {
        break;
      }
    }
    return filteredArr;
  };

  window.filterData = filterAds;
})();
