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

  RenderData: function (formData, _callback) {
    var ajaxUrl = '/assets/js/api.sample2.json';
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: ajaxUrl,
      data: formData,
      success: function(response) {1
        if(response.result === "ok") {
          if (typeof _callback === 'function') {
            _callback.call(null, response);
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

      /*$.each(res, function(index, row){
        html += ' <li>';
        html += '   <div class="label-wrap '+ (depth !== "depth3" ? 'type-btn radio' : 'type-icon checkbox') +'">';
        html += '     <input type="'+ (depth !== "depth3" ? 'radio' : 'checkbox') +'" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="'+ (depth !== "depth3" ? 'radio' : 'chk') +'"/>';
        html += '     <label class="txt" '+ (depth === "depth3" ? 'style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.class +'.webp)"' : '') +' for="'+ depth +'_'+ row.seq +'">'+ row.dec +' '+ (row.cnt ? '<small>('+ row.cnt +')</small>' : '')+'</label>';
        html += '   </div>';
        html += ' </li>';
      })*/

      if(depth === "depth2") {
        $.each(res, function(index, row){
          html += ' <li>';
          html += '   <div class="label-wrap type-btn radio">';
          html += '     <input type="radio" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="radio"/>';
          html += '     <label class="txt" for="'+ depth +'_'+ row.seq +'">'+ row.dec +' '+ (row.cnt ? '<small>('+ row.cnt +')</small>' : '')+'</label>';
          html += '   </div>';
          html += ' </li>';
        })
      } else if(depth === "depth3") {
        var max = res.length - 1;
        $.each(res, function(index, row){
          html += ' <li '+ (index > 18 ? 'class="hide" data-selector="hide"' : '') +'>';
          html += '   <div class="label-wrap type-icon checkbox '+ (row.isActive == 0 ? '_disable' : '') +'" >';
          html += '     <input type="checkbox" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="chk" '+ (row.isActive === 0 ? 'disable' : '') +'/>';
          html += '     <label class="txt" for="'+ depth +'_'+ row.seq +'" style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.class +'.webp)">'+ row.dec +'</label>';
          html += '   </div>';
          html += ' </li>';
          if(index === 18) {
            html += ' <li>';
            html += '   <a href="javascript:void(0)" data-action="more" data-sid="show" class="btn-more"><span class="txt">더보기</span></a>';
            html += ' </li>';
          }
          if(index === max) {
            html += ' <li class="w100 hide" data-selector="hide">';
            html += '   <a href="javascript:void(0)" data-action="more" data-sid="hide" class="btn-close"><span class="txt">접기</span></a>';
            html += ' </li>';
          }
        })
      }

      $container.find("[data-selector=dropContainer]").removeClass("_open");
      $drop.addClass("_open").removeClass("_disable");
      $drop.find("[data-selector=kind]").html(html)

      /*이전 탭 변경*/
      var $prev = $("[data-selector=dropContainer][data-sid="+ name +"]");
      $prev.find("[data-selector=selected]").html(formData.dec)
      $prev.addClass("_checked");
    });
  },

  More: function (e) {
    var sid = e.data("sid");
    if(sid === "show") {
      $("[data-selector=hide]").addClass("_active");
      $("[data-action=more][data-sid=show]").closest("li").addClass("_hide");
    } else if(sid === "hide") {
      $("[data-selector=hide]").removeClass("_active");
      $("[data-action=more][data-sid=show]").closest("li").removeClass("_hide");
    }
  },

  ActiveSearch : function(){
    if($("[data-action=chk]:checked").length > 0) {
      $("[data-selector=searchContainer]").removeClass("_disable");
    } else {
      $("[data-selector=searchContainer]").addClass("_disable");
    }
  },

  Search : function(){
    var depth1 = $("[name=depth1]:checked").val(),
      depth2 = $("[name=depth2]:checked").val(),
      depth3 = [];


    if(var i = 0, max = $("[name=depth2]:checked").length - 1; i < max; i ++){
      console.log(i)
    }

    console.log(depth1, depth2, depth3, $("[name=frm]").serialize());
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

    $("[data-action=chk]").unbind("change");
    $(document).on("change", "[data-action=chk]", function () {
      Page.ActiveSearch();
    })

    $("[data-action=more]").unbind("click");
    $(document).on("click", "[data-action=more]", function () {
      Page.More($(this))
    })

    $("[data-action=search]").unbind("click");
    $(document).on("click", "[data-action=search]", function () {
      Page.Search()
    })
  },

  Init: function () {
    Page.Bind();
    Page.Render('depth1');
  }
}
