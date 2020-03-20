'use strict';

(function () {
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var popupErrorMessage = error.querySelector('.error__message');
  var errorClose = error.querySelector('.error__button');

  var closeErrorPopup = function () {
    error.remove();
    document.removeEventListener('click', closeErrorPopup);
    document.removeEventListener('keydown', onErrorPopupEscPress);
    popupErrorMessage.removeEventListener('click', onPopupErrorMessageClick);
    errorClose.addEventListener('click', closeErrorPopup);
  };

  var onErrorPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeErrorPopup);
  };

  var onPopupErrorMessageClick = function (evt) {
    evt.stopPropagation();
  };

  var showError = function () {
    main.append(error);
    popupErrorMessage.addEventListener('click', onPopupErrorMessageClick);
    document.addEventListener('click', closeErrorPopup);
    document.addEventListener('keydown', onErrorPopupEscPress);
  };

  var showLoadError = function (errorMessage) {
    popupErrorMessage.textContent = errorMessage;
    showError();
    document.removeEventListener('click', closeErrorPopup);
    errorClose.addEventListener('click', closeErrorPopup);
  };

  window.errorPopup = {
    showError: showError,
    showLoadError: showLoadError
  };
})();
