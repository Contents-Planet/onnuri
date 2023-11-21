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

        $("[data-selector=area]").html(formData.dec)
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

        $("[data-selector=area]").append(" > "+ formData.dec)
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

  Reset : function(){
    $("#wrap").removeClass("_search");
    $("[data-selector=selectDrop]").find("[type=radio]").prop("checked", false);
    $("[data-selector=selectDrop]").find("[type=checkbox]").prop("checked", false);
    $("[data-selector=selectDrop]").find("[data-selector=dropContainer]").removeClass("_open").removeClass("_checked").addClass("_disable");
    $("[data-selector=selectDrop]").find("[data-selector=dropContainer][data-sid=depth1]").addClass("_open").removeClass("_disable").removeClass("_checked");
    $("[data-selector=selected]").html("");
    $("[data-selector=listAppend], [data-selector=mapContainer]").html("");
    $('html, body').animate({scrollTop: 0}, 300);
  },

  Search : function(){
    $("[data-selector=selectDrop]").find("[data-selector=dropContainer]").removeClass("_open");
    if(!$("[name=depth1]:checked").val()) {
      alert("시/도를 선택하세요");
      $("[data-selector=dropContainer][data-sid=depth1]").addClass("_open");
      return;
    }

    if(!$("[name=depth2]:checked").val()) {
      alert("구/군을 선택하세요");
      $("[data-selector=dropContainer][data-sid=depth2]").addClass("_open").removeClass("_disable");
      return;
    }

    if(!$("[name=depth3]:checked").val()) {
      alert("업종을 선택하세요");
      $("[data-selector=dropContainer][data-sid=depth3]").addClass("_open").removeClass("_disable");
      return;
    }

    var $fm = $("[name=frm]"),
      formData = $fm.serialize();


    Page.RenderData(formData, function(res){
      var html = '';

      $.each(res.data, function(index, row){
        html += ' <li>';
        html += '   <dl class="data-flex flex">';
        html += '     <dt class="flex">';
        html += '       <div class="col-ico">';
        html += '         <span class="ico" style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.business +'.webp)"></span>';
        html += '       </div>';
        html += '       <div class="col-dec">';
        html += '         <strong class="tit">'+ row.tit +'</strong>';
        html += '         <p class="add">'+ row.add +'</p>';
        html += '       </div>';
        html += '     </dt>';
        html += '     <dd>';
        html += '       <ul class="btn-flex flex">';
        html += '         <li><a href="tel:'+ row.tel +'" class="tel"><span class="a11y">'+ row.tel +' 전화걸기</span></a></li>';
        html += '         <li><a href="javascript:void(0)" class="map" data-action="mapMarker"><span class="a11y">위치보기</span></a></li>';
        html += '       </ul>';
        html += '     </dd>';
        html += '   </dl>';
        html += ' </li>';
      })

      if(res.tot > 0) {
        html += ' <li class="non-bd" data-selector="moreContainer">';
        html += '   <a href="javascript:void(0)" class="btn-close more" data-action="moreData"><span class="txt">더보기</span></a>';
        html += ' </li>';
      }

      $("[data-selector=moreContainer]").remove();
      $("[data-selector=dataContainer]").addClass("_active");
      $("[data-selector=listAppend]").append(html);
      $("[name=page]").val(parseInt($("[name=page]").val()) + 1);

      var len = $("[name=depth3]:checked").length,
        txt = $("[name=depth3]:checked").data("value");

      $("[data-selector=business]").html(txt + (len > 1 ? " 외" + (len - 1) + "건" : ''));
      $("#wrap").addClass("_search")

      var headerHeight = $("[data-selector=selectedContainer]").outerHeight(),
        dataContainer = $("[data-selector=dott][data-sid=data]").offset().top,
        moveTo = dataContainer -  headerHeight;

      $('html, body').animate({scrollTop: moveTo}, 300);
    })
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

    $("[data-action=moreData]").unbind("click");
    $(document).on("click", "[data-action=moreData]", function () {
      Page.Search()
    })

    $("[data-action=reSearch]").unbind("click");
    $(document).on("click", "[data-action=reSearch]", function () {
      Page.Reset()
    })
  },

  Init: function () {
    Page.Bind();
    Page.Render('depth1');
  }
}
