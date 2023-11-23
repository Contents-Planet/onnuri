var API = {
  GetData: function (formData, mode, _callback) {
    var ajaxUrl = '/store/'+ mode;
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: ajaxUrl,
      data: formData,
      success: function(response) {
        if (typeof _callback === 'function') {
          _callback.call(null, response);
        }
      }
    });
  }
}
