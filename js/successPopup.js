'use strict';

(function () {
  var success = document.querySelector('#success').content.querySelector('.success');
  var successMessage = success.querySelector('.success__message');
  var main = document.querySelector('main');

  var closeSuccessPopup = function () {
    success.remove();
    successMessage.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('click', closeSuccessPopup);
    document.removeEventListener('keydown', onSuccessPopupEscPress);
  };

  var onSuccessPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSuccessPopup);
  };

  var onSuccessMessageClick = function (evt) {
    evt.stopPropagation();
  };

  var showSuccessPopup = function () {
    main.append(success);
    successMessage.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('click', closeSuccessPopup);
    document.addEventListener('keydown', onSuccessPopupEscPress);
  };

  window.successPopup = showSuccessPopup;
})();
