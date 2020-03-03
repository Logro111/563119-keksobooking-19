'use strict';

(function () {
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

  var pin = document.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');

  var randomizeNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var randomizeArrElevent = function (arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
  };

  var sortArr = function (arr) {
    var newArr = arr.slice();
    var randomIndex;
    var sortedElement;
    for (var i = newArr.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      sortedElement = newArr[randomIndex];
      newArr[randomIndex] = newArr[i];
      newArr[i] = sortedElement;
    }
    return newArr;
  };

  var randomizeArrLength = function (arr) {
    sortArr(arr).length = randomizeNumber(1, sortArr(arr).length + 1);
  };

  var createAvatarsList = function (firstAvatar, lastAvatar) {
    var avatarsList = [];
    for (var i = 0; i < lastAvatar - firstAvatar + 1; i++) {
      avatarsList.push('img/avatars/user' + 0 + (firstAvatar + i) + '.png');
    }
    return avatarsList;
  };

  var selectArrElement = function (arr, counter) {
    if (counter >= arr.length) {
      counter = 0;
    }
    var element = arr[counter];
    counter++;
    return element;
  };

  var createOffer = function (amountOfOffers) {
    var offer;
    var offers = [];
    var authorsAvatars = sortArr(createAvatarsList(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER));
    for (var i = 0; i < amountOfOffers; i++) {
      var locationX = randomizeNumber(0 + pin.offsetWidth / 2, pinsContainer.clientWidth - pin.offsetWidth / 2);
      var locationY = randomizeNumber(MIN_Y_POSITION, MAX_Y_POSITION);
      offer = {
        'author': {
          avatar: selectArrElement(authorsAvatars, i)
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
          features: randomizeArrLength(FEATURES),
          description: 'Сдается жилье',
          photos: randomizeArrLength(PHOTOS)
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

  var offersArr = createOffer(NUMBER_OF_OFFERS);

  window.data = offersArr;
})();
