'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  var houseTypeValuesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    '': ''
  };

  var setFieldValue = function (objectfield, field, fieldValue) {
    if (objectfield) {
      field.textContent = fieldValue;
    } else {
      field.style.display = 'none';
    }
  };

  var renderCard = function (cardsArrElem) {
    var newCard = templateCard.cloneNode(true);
    var title = newCard.querySelector('.popup__title');
    var address = newCard.querySelector('.popup__text--address');
    var price = newCard.querySelector('.popup__text--price');
    var houseType = newCard.querySelector('.popup__type');
    var capacity = newCard.querySelector('.popup__text--capacity');
    var time = newCard.querySelector('.popup__text--time');
    var featuresContainer = newCard.querySelector('.popup__features');
    var features = featuresContainer.querySelectorAll('.popup__feature');
    var description = newCard.querySelector('.popup__description');
    var images = newCard.querySelectorAll('.popup__photo');
    var imageConteiner = newCard.querySelector('.popup__photos');
    var avatar = newCard.querySelector('.popup__avatar');
    window.card.closeButton = newCard.querySelector('.popup__close');

    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }

    setFieldValue(cardsArrElem.offer.title, title, cardsArrElem.offer.title);

    setFieldValue(cardsArrElem.offer.address, address, cardsArrElem.offer.address);

    setFieldValue(cardsArrElem.offer.description, description, cardsArrElem.offer.description);

    setFieldValue(cardsArrElem.offer.price, price, cardsArrElem.offer.price + '₽/ночь');

    setFieldValue(cardsArrElem.offer.type, houseType, houseTypeValuesMap[cardsArrElem.offer.type]);

    setFieldValue((cardsArrElem.offer.rooms && cardsArrElem.offer.guests), capacity, cardsArrElem.offer.rooms + ' комнаты для ' + cardsArrElem.offer.guests + ' гостей');

    setFieldValue((cardsArrElem.offer.checkin && cardsArrElem.offer.checkout), time, 'Заезд после ' + cardsArrElem.offer.checkin + ', выезд до ' + cardsArrElem.offer.checkout);


    if (cardsArrElem.offer.features && cardsArrElem.offer.features.length !== 0) {
      features.forEach(function (list) {
        var counter = 0;
        var listClassValue = list.getAttribute('class');
        listClassValue = listClassValue.slice(listClassValue.indexOf('--') + 2);
        cardsArrElem.offer.features.forEach(function (element) {
          if (element === listClassValue) {
            counter += 1;
          }
        });
        if (!counter) {
          list.setAttribute('style', 'display: none');
        }
      });
    } else {
      featuresContainer.style.display = 'none';
    }

    if (cardsArrElem.offer.photos && cardsArrElem.offer.photos.length !== 0) {
      cardsArrElem.offer.photos.forEach(function (elem, i) {
        if (images[i]) {
          images[i].setAttribute('src', elem);
        } else {
          var newImage = newCard.querySelector('.popup__photo').cloneNode();
          newImage.setAttribute('src', elem);
          imageConteiner.append(newImage);
        }
      });
    } else {
      imageConteiner.style.display = 'none';
    }

    if (cardsArrElem.author && cardsArrElem.author.avatar) {
      avatar.setAttribute = cardsArrElem.author.avatar;
    }

    filtersContainer.before(newCard);
  };

  window.card = {
    render: renderCard,
    houseTypeValuesMap: houseTypeValuesMap
  };
})();
