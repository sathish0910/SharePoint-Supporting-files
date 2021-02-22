/**
 * jquery.multifile.js
 * by Rocky Meza
 *
 * Multifile is a plugin that provides a better interface for
 * uploading more than one file at a time.
 */
(function ($, global, undefined) {
  sessionStorage.setItem("loaded", "Yes");
  $.fn.multifile = function (containerOrAttributes, templateCb) {
    var container;
    var currentElem = $(this);
    if (typeof containerOrAttributes == "object") {
      container = containerOrAttributes['container'];
      templateCb = containerOrAttributes['template'];
    } else {
      container = containerOrAttributes;
    }

    var $container
      , addInput = function (event) {
        currentElem = $(this);
        var $this = $(this)
          , new_input = $this.clone(true, false);

        // newer versions of Firefox don't clear this on clone
        new_input[0].value = '';

        $this
          .unbind(event)
          .hide()
          .after(new_input);

        templateCb = templateCb || $.fn.multifile.templateCb;

        templateCb($.fn.multifile.getFileObject(this))
          .appendTo($container)
          .find('.multifile_remove_input')
          .bind('click.multifile', bindRemoveInput($this));
      }
      , bindRemoveInput = function ($input) {
        // TODO: make this customizable
        return function (event) {
          $input.remove();
          $(this).parents('.uploaded_image').remove();

          event.preventDefault();
        };
      };

    if (container) {
      if (typeof container == 'string')
        $container = $(container);
      else
        $container = container;
    }
    else {
      $container = $('<div class="multifile_container" />');
      this.after($container);
    }

    return this.each(function (index, elem) {
      $(this)
        .bind('change.multifile', addInput)
        ;
    });
  };

  $.fn.multifile.templateCb = function (file, currentElem) {
    $('#errorMsg').empty();
    var duplicateFileCheck = false;
    var allowedFiles = [".xlsx"];
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (file.name.substr(0, file.name.indexOf('.')) != "") {
      var re = /^[A-Za-z0-9]+$/;
      var fileName = file.name.substr(0, file.name.indexOf('.')).toLowerCase();
      var fileNameCheck = $.grep(fileName, function (val, index) {
        if (val != " ") {
          if (!re.test(val)) {
            return true;
          }
        }
      });
      if (fileNameCheck.length > 0) {
        $(currentElem).css('border-color', 'red');
        duplicateFileCheck = true;
        $('#errorMsg').append("<li>The file name seems to contain special character(s). Rename the file and try again.</li><li>Special Characters which aren’t allowed <b>+=-~”#%&*:<>?{}/&#92;’;!@$%^()`[],.</b></li>");
      } else {
        if (!regex.test(file.name.toLowerCase())) {
          $(currentElem).css('border-color', 'red');
          duplicateFileCheck = true;
          $('#errorMsg').append("<li>Only file with extension <b>" + allowedFiles.join(', ') + "</b> is allowed.</li>");
        }
      }
    }
    $.each($('.uploaded_image .filename'), function (indexChild, temp) {
      if ($(temp).text() === file.name) {
        $(currentElem).css('border-color', 'red');
        duplicateFileCheck = true;
        $('#errorMsg').append('<li style="color: red;">You have already used the file name for one of attached file</li>');
      }
    });
    if (!duplicateFileCheck) {
      TERNF.vars.fileArray.push({ "Attachment": file });
      if(file.name.split('.')[1].toLowerCase() === "xlsx"){
        $('#excelNofityModelDialog').modal('show');
      }
      return $(
        '<p class="uploaded_image"> \
          <a href="" class="multifile_remove_input">x</a> \
        </p>')
        .append($('<span>').attr('class', 'filename').text(file.name));
    } else {
      return '';
    }
  };

  $.fn.multifile.getFileObject = function (input) {
    var file = {};
    // check for HTML5 FileList support
    if (!!global.FileList) {
      if (input.files.length == 1)
        file = input.files[0];
      else {
        file._multiple = true;

        // We do this in order to support `multiple` files.
        // You can't display them separately because they 
        // belong to only one file input.  It is impossible
        // to remove just one of the files.
        file.name = input.files[0].name;
        for (var i = 1, _len = input.files.length; i < _len; i++)
          file.name += ', ' + input.files[i].name;
      }
    }
    else {
      file._html4 = true;
      file.name = input.value;
    }

    return file;
  };
})(jQuery, this);