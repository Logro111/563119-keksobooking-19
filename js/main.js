'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_OFFERS = 8;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 5000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var FIRST_AVATAR_NUMBER = 1;
var LAST_AVATAR_NUMBER = 8;
var MAIN_MOUSE_BUTTON = 0;
var ENTER_KEY = 'Enter';
var MAIN_MAP_PIN_HEIGHT_WITH_MARKER = 84;
var MAXIMUM_ROOMS = 100;
var NOT_FOR_GUESTS_CAPACITY = 0;

var pinsContainer = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var pin = document.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var map = document.querySelector('.map');

var randomizeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomizeArrElevent = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

var randomizeArr = function (arr) {
  var newArr = arr.slice();
  var randomIndex;
  var sortedElement;
  for (var i = newArr.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    sortedElement = newArr[randomIndex];
    newArr[randomIndex] = newArr[i];
    newArr[i] = sortedElement;
  }
  newArr.length = randomizeNumber(1, newArr.length + 1);
  return newArr;
};

var createAvatarsList = function (firstAvatar, lastAvatar) {
  var avatarsList = [];
  for (var i = 0; i < lastAvatar - firstAvatar + 1; i++) {
    avatarsList.push('img/avatars/user' + 0 + (firstAvatar + i) + '.png');
  }
  return avatarsList;
};

var createOffer = function (amountOfOffers) {
  var offer;
  var offers = [];
  for (var i = 0; i < amountOfOffers; i++) {
    var locationX = randomizeNumber(0 + pin.offsetWidth / 2, pinsContainer.clientWidth - pin.offsetWidth / 2);
    var locationY = randomizeNumber(MIN_Y_POSITION, MAX_Y_POSITION);
    offer = {
      'author': {
        avatar: randomizeArrElevent(createAvatarsList(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER))
      },
      'offer': {
        title: 'Сдается жилье',
        address: '"' + locationX + ', ' + locationY + '"',
        price: randomizeNumber(MIN_PRICE, MAX_PRICE),
        type: randomizeArrElevent(TYPE),
        rooms: randomizeNumber(MIN_ROOMS, MAX_ROOMS),
        guests: randomizeNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: randomizeArrElevent(TIME),
        checkout: randomizeArrElevent(TIME),
        features: randomizeArr(FEATURES),
        description: 'Сдается жилье',
        photos: randomizeArr(PHOTOS)
      },

      'location': {
        x: locationX,
        y: locationY
      }
    };
    offers.push(offer);
  }
  return offers;
};

var renderPin = function (offersElement) {
  var newPin = templatePin.cloneNode(true);

  newPin.querySelector('img').setAttribute('src', offersElement.author.avatar);
  newPin.querySelector('img').setAttribute('alt', offersElement.offer.title);
  newPin.style.left = offersElement.location.x - pin.offsetWidth / 2 + 'px';
  newPin.style.top = offersElement.location.y - pin.offsetHeight + 'px';

  return newPin;
};

var renderPins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  pinsContainer.appendChild(fragment);
};

var offersArr = createOffer(NUMBER_OF_OFFERS);

var form = document.querySelector('.ad-form');
var fieldsGroups = form.querySelectorAll('fieldset');
var mainMapPin = document.querySelector('.map__pin--main');
var addressField = form.querySelector('[name="address"]');
var roomsField = form.querySelector('[name="rooms"]');
var capacityField = form.querySelector('[name="capacity"]');

var disablePage = function () {
  form.classList.add('ad-form--disabled');
  map.classList.add('map--faded');
  Array.prototype.forEach.call(fieldsGroups, function (elem) {
    elem.setAttribute('disabled', '');
  });
  addressField.value = Math.round(mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2) + ', ' + Math.round(mainMapPin.offsetTop + mainMapPin.offsetHeight / 2);
};

var activatePage = function () {
  form.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  Array.prototype.forEach.call(fieldsGroups, function (elem) {
    elem.removeAttribute('disabled');
  });
  addressField.value = Math.round(mainMapPin.offsetLeft + mainMapPin.offsetWidth / 2) + ', ' + Math.round(mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT_WITH_MARKER);
  renderPins(offersArr);
};

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

disablePage();

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === MAIN_MOUSE_BUTTON) {
    activatePage();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

form.addEventListener('change', function () {
  onFormChangeValidation();
});
