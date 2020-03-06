'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var statusCodes = {
    OK: 200
  };

  var loadXhr = function (xhr, success, error) {
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCodes.OK) {
        success(xhr.response);
      } else {
        error('Статус ответа ' + xhr.status);
      }
    });
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    loadXhr(xhr, onLoad, onError);

    xhr.addEventListener('error', function () {
      onError('Ошибка загрузки');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', loadURL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
