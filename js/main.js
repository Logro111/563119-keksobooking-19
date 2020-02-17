'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_OF_OFFERS = 8;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pinsContainer = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var pin = document.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var randomizeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomizeArrElevent = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

var randomizeArr = function (arr) {
  var NewArr = arr.slice();
  for (var i = Math.floor(Math.random() * (NewArr.length + 1)); i < arr.length; i++) {
    NewArr.splice(Math.floor(Math.random() * NewArr.length), 1);
    if (NewArr.length === 1) {
      break;
    }
  }
  return NewArr;
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
    var locationY = randomizeNumber(130, 630);
    offer = {
      'author': {
        avatar: randomizeArrElevent(createAvatarsList(1, 8))
      },
      'offer': {
        title: 'Сдается жилье',
        address: '"' + locationX + ', ' + locationY + '"',
        price: randomizeNumber(1000, 5000),
        type: randomizeArrElevent(TYPE),
        rooms: randomizeNumber(1, 5),
        guests: randomizeNumber(1, 10),
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

renderPins(offersArr);
