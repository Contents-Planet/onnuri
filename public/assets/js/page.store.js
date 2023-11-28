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

  Render: function (depth) {
    var formData = {
      depth : depth
    }
    API.GetData(formData, 'getCityNames',function(res){
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
      val = $("[name=depth"+ step +"]:checked").val(),
      dec1 = $("[name=depth1]:checked").data("value"),
      dec2 = step === "2" ? $("[name=depth2]:checked").data("value") : "",
      depth = "depth"+ (parseInt(step) + parseInt(step === "1" && val === "5" ? "2" : "1")),
      formData = {
        depth : depth,
        val : val,
        dec1 : dec1,
        dec2 : dec2
      }

      console.log(depth)
    API.GetData(formData, 'getCityNames',function(res){
      if(step === "1" && val === "5") {
        $("[data-selector=dropContainer][data-sid=depth2]").hide();
      } else {
        $("[data-selector=dropContainer][data-sid=depth2]").show();
      }

      var html = '';
      if(depth === "depth2") {
        $.each(res, function(index, row){
          html += ' <li>';
          html += '   <div class="label-wrap type-btn radio">';
          html += '     <input type="radio" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="radio"/>';
          html += '     <label class="txt" for="'+ depth +'_'+ row.seq +'">'+ row.dec +' '+ (row.cnt ? '<small>('+ row.cnt +')</small>' : '')+'</label>';
          html += '   </div>';
          html += ' </li>';
        })

        $("[data-selector=area]").html(formData.dec1)
      } else if(depth === "depth3") {

        var max = res.length - 1;
        var liCount = 0;
        html = ' <li class="all">';
        html += '   <div class="label-wrap checkbox" >';
        html += '     <input type="checkbox" name="all" id="all" data-action="chkAll" checked/>';
        html += '     <label class="txt" for="all">전체선택</label>';
        html += '   </div>';
        html += ' </li>';

        $.each(res, function(index, row){

          html += ' <li '+ (liCount > 18 ? 'class="hide" data-selector="hide"' : '') +'>';
          html += '   <div class="label-wrap type-icon checkbox '+ (row.isActive == 0 ? '_disable' : '') +'" >';
          html += '     <input type="checkbox" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="chk" '+ (row.isActive == 0 ? 'disabled' : 'checked') +'/>';
          html += '     <label class="txt" for="'+ depth +'_'+ row.seq +'" style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.class +'_v2.webp)">'+ row.dec +'</label>';
          html += '   </div>';
          html += ' </li>';
          if(liCount === 18) {
            html += ' <li>';
            html += '   <a href="javascript:void(0)" data-action="more" data-sid="show" class="btn-more"><span class="txt">더보기</span></a>';
            html += ' </li>';
          }
          if(liCount === max) {
            html += ' <li class="w100 hide" data-selector="hide">';
            html += '   <a href="javascript:void(0)" data-action="more" data-sid="hide" class="btn-close"><span class="txt">접기</span></a>';
            html += ' </li>';
          }
          liCount++;
        })
      }

      var $container = $("[data-selector=selectDrop]"),
        $drop = $("[data-selector=dropContainer][data-sid="+ formData.depth +"]");

      $container.find("[data-selector=dropContainer]").removeClass("_open");
      $drop.addClass("_open").removeClass("_disable");
      $drop.find("[data-selector=kind]").html(html)

      /*이전 탭 변경*/
      var $prev = $("[data-selector=dropContainer][data-sid="+ name +"]");
      $prev.find("[data-selector=selected]").html(formData["dec"+ step])
      $prev.addClass("_checked");

      $("[data-selector=area]").html(formData.dec1 + (formData.dec2 ? " > "+ formData.dec2 : ""));
    });
  },

  ChkAll : function(){
    if($("[data-action=chkAll]").prop("checked")) {
      $('[name=depth3]:not(":disabled")').prop("checked", true);
    } else {
      $("[name=depth3]").prop("checked", false);
    }
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
    $("[data-selector=selectDrop]").find("[data-selector=dropContainer]").removeClass("_open");
    if(!$("[name=depth1]:checked").val()) {
      alert("시/도를 선택하세요");
      $("[data-selector=dropContainer][data-sid=depth1]").addClass("_open");
      return;
    }

    if($("[name=depth1]:checked").val() !== "5") {
      if(!$("[name=depth2]:checked").val()) {
        alert("구/군을 선택하세요");
        $("[data-selector=dropContainer][data-sid=depth2]").addClass("_open").removeClass("_disable");
        return;
      }
    }

    if(!$("[name=depth3]:checked").val()) {
      alert("업종을 선택하세요");
      $("[data-selector=dropContainer][data-sid=depth3]").addClass("_open").removeClass("_disable");
      return;
    }

    $("[name=frm]").attr("action", "/store/list").submit();
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

    $("[data-action=chkAll]").unbind("change");
    $(document).on("change", "[data-action=chkAll]", function () {
      Page.ChkAll();
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
