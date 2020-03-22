'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadImg = function (inputFileField, imgContainer) {
    var onInputFieldChange = function () {
      var file = inputFileField.files[0];

      var fileName = '';

      if (file) {
        fileName = file.name.toLowerCase();
      }


      var matches = FILE_TYPES.some(function (fileExtension) {
        return fileName.endsWith(fileExtension);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (imgContainer.tagName === 'IMG') {
            imgContainer.src = reader.result;
          } else {
            imgContainer.style.backgroundImage = 'url("' + reader.result + '")';
            imgContainer.style.backgroundSize = '100% 100%';
          }
        });

        reader.readAsDataURL(file);
      }
    };
    inputFileField.addEventListener('change', onInputFieldChange);
  };

  window.loadImg = uploadImg;
})();
