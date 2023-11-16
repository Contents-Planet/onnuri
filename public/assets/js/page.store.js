$(function(){
  Page.Init();
})

var Page = {
  Drop: function (e) {
    var $container = $("[data-selector=selectDrop]"),
      $wrap = e.closest("[data-selector=dropContainer]");

    if (!$wrap.hasClass("_disable")) {
      if ($wrap.hasClass("_open")) {
        $container.find("[data-selector=dropContainer]").removeClass("_open");
      } else {
        $container.find("[data-selector=dropContainer]").removeClass("_open");
        $wrap.addClass("_open")
      }
    }
  },

  GetData: function (formData, _callback) {
    var ajaxUrl = '/assets/js/api.sample.json';
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: ajaxUrl,
      data: formData,
      success: function(response) {1
        if(response.result === "ok") {
          if (typeof _callback === 'function') {
            _callback.call(null, response[formData.depth]);
          }
        }
      }
    });
  },

  Render: function (depth) {
    var formData = {
      depth : depth
    }

    Page.GetData(formData, function(res){
      console.log(res)
      var html = '';
      $.each(res, function(index, row){
        html += ' <li>';
        html += '   <div class="label-wrap type-btn radio">';
        html += '     <input type="radio" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +"_"+ row.seq +'" data-value="'+ row.dec +'" data-action="radio"/>';
        html += '     <label class="txt" for="'+ depth +"_"+ row.seq +'">'+ row.dec +'</label>';
        html += '   </div>';
        html += ' </li>';
      })
      $("[data-selector=dropContainer][data-sid="+ depth +"]").find("[data-selector=kind]").html(html)
    });
  },

  Change: function (e) {
    var name = e.attr("name"),
      step = name.replace("depth", ""),
      depth = "depth"+ (parseInt(step) + 1),
      formData = {
        depth : depth,
        val : $("[name="+ name +"]:checked").val(),
        dec : $("[name="+ name +"]:checked").data("value")
      }

    var $container = $("[data-selector=selectDrop]"),
      $drop = $("[data-selector=dropContainer][data-sid="+ depth +"]");

    Page.GetData(formData, function(res){
      var html = '';
      $.each(res, function(index, row){
        html += ' <li>';
        html += '   <div class="label-wrap type-btn '+ (depth !== "depth3" ? 'radio' : 'checkbox') +'">';
        html += '     <input type="'+ (depth !== "depth3" ? 'radio' : 'checkbox') +'" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="'+ (depth !== "depth3" ? 'radio' : 'chk') +'"/>';
        html += '     <label class="txt" for="'+ depth +'_'+ row.seq +'">'+ row.dec +' '+ (row.cnt ? '<small>('+ row.cnt +')</small>' : '')+'</label>';
        html += '   </div>';
        html += ' </li>';
      })

      $container.find("[data-selector=dropContainer]").removeClass("_open");
      $drop.addClass("_open").removeClass("_disable");
      $drop.find("[data-selector=kind]").html(html)

      /*이전 탭 변경*/
      var $prev = $("[data-selector=dropContainer][data-sid="+ name +"]");
      $prev.find("[data-selector=selected]").html(formData.dec)
      $prev.addClass("_checked");


    });
  },

  Bind: function () {
    $("[data-action=btnDrop]").unbind("click");
    $(document).on("click", "[data-action=btnDrop]", function () {
      Page.Drop($(this))
    })

    $("[data-action=radio]").unbind("change");
    $(document).on("change", "[data-action=radio]", function () {
      Page.Change($(this))
    })
  },

  Init: function () {
    Page.Bind();
    Page.Render('depth1');
  }
}
