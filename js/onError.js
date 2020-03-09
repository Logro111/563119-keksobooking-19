'use strict';

(function () {
  var onError = function (errorMessage) {
    var errorPopup = document.createElement('div');
    errorPopup.style = 'font-size: 30px; color: white; background-color: red; position: fixed; top: 40%; z-index: 4; width: 800px; text-align: center; padding: 0; height: auto';
    errorPopup.setAttribute('class', 'error');
    errorPopup.textContent = errorMessage;
    errorPopup.style.left = 'calc(50% - 400px)';
    document.body.append(errorPopup);
    var onErrorMessageClick = function () {
      errorPopup.remove();
      errorPopup.removeEventListener('click', onErrorMessageClick);
    };
    errorPopup.addEventListener('click', onErrorMessageClick);
  };

  window.onError = onError;
})();
