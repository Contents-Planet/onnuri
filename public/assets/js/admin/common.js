$(function () {
  GNB.Init();
  Form.Init();
});

var GNB = {
  Now : function(){
    var depth1 = $("#depth1").val(),
      depth2 = $("#depth2").val(),
      depth3 = $("#depth3").val(),
      $depth1 = $("[data-selector=depth1][data-sid="+ depth1 +"]"),
      $depth2 = $depth1.find("[data-selector=depth2]"),
      $depth3 = $depth2.find("[data-selector=depth3][data-sid="+ depth3 +"]"),
      breadcrumb = '',
      pageTit = '';

    if(depth1) {
      var h2 = $depth1.find("[data-txt=depth1]").text();
      $depth1.addClass("_active");
      breadcrumb += '<li class="breadcrumb-item"><h2 class="depth1">'+ h2 +'</h2></li>';
      pageTit = h2;
      console.log("depth1 : "+ depth1 +" / "+ h2)
    }

    if(depth2) {
      var $active = $depth1.find("[data-selector=depth2][data-sid="+ depth2 +"]"),
        h3 = $active.find("[data-txt=depth2]").text();

      $active.addClass("active");
      breadcrumb += '<li class="breadcrumb-item"><h3>'+ h3 +'</h3></li>';
      pageTit = h3;

      console.log("depth2 : "+ depth2 +" / "+ h3)
    }
    if(depth3) {
      var $active = $depth2.find("[data-selector=depth3][data-sid="+ depth3 +"]"),
        h4 = $active.find("[data-txt=depth3]").text();

      $active.addClass("active");
      breadcrumb += '<li class="breadcrumb-item"><h4>'+ h4 +'</h4></li>';
      pageTit = h3 +" - "+ h4;

      console.log("depth3 : "+ depth3 +" / "+ h4)
    }
    $("[data-selector=breadcrumb]").append(breadcrumb);
    $("[data-selector=pageTit]").html(pageTit)
  },

  RowDepth : function(e){
    var $wrap = e.closest("[data-wrap=wrap]");
    $wrap.find("[data-selector=rowDepth]").addClass("_active");
  },

  Bind : function(){
    $("[data-action=hasDepth]").on("click", function(){
      GNB.RowDepth($(this));
    })
  },

  Init : function(){
    GNB.Bind();
    GNB.Now();
  }
}

var Form = {
  ReadImg : function(input){
    var $wrap = $("[data-selector=fileUpload]"),
      $tempImg = $wrap.find("[data-selector=tempImg]"),
      type = $tempImg.data("type");

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        if(type === "bg") {
          $tempImg.css({"background-image" : "url("+ e.target.result +")"}).addClass("_active");
        } else {
          $tempImg.attr("src", e.target.result);
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      if(type === "bg") {
        $tempImg.css({"background-image" : "none"}).removeClass("_active");
      } else {
        $tempImg.attr("src", '');
      }
    }
  },

  DatePick : function(){
    $('[data-action=datePick]').datepicker({
      format: "yyyy-mm-dd",	//데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
      //startDate: '-10d',	//달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
      //endDate: '+10d',	//달력에서 선택 할 수 있는 가장 느린 날짜. 이후로 선택 불가 ( d : 일 m : 달 y : 년 w : 주)
      autoclose : true,	//사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
      calendarWeeks : false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
      clearBtn : false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
      //datesDisabled : ['2019-06-24','2019-06-26'],//선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
      daysOfWeekDisabled : [0,6],	//선택 불가능한 요일 설정 0 : 일요일 ~ 6 : 토요일
      //daysOfWeekHighlighted : [3], //강조 되어야 하는 요일 설정
      disableTouchKeyboard : false,	//모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
      immediateUpdates: false,	//사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
      multidate : false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false
      multidateSeparator :",", //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
      templates : {
        leftArrow: '&laquo;',
        rightArrow: '&raquo;'
      }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
      showWeekDays : true ,// 위에 요일 보여주는 옵션 기본값 : true
      title: "",	//캘린더 상단에 보여주는 타이틀
      todayHighlight : true ,	//오늘 날짜에 하이라이팅 기능 기본값 :false
      toggleActive : true,	//이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
      weekStart : 0 ,//달력 시작 요일 선택하는 것 기본값은 0인 일요일
    });//datepicker end

    $('[data-action=timePick]').timepicker({
      showMeridian: false,
      showSeconds: true,
      format: "HH:mm"
    });

    $('[data-action=datePickWithTime]').datetimepicker({
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      format:'Y-m-d H:i',
      step: 60,
      defaultSelect: false,
      defaultDate: false,
      lang : "ko",
      onClose: function(ct, $i) {
          let endDateInput = $("#dateEnd");
          if($("#dateEnd").val() != ''){
              let tempStartDate = new Date(ct);
              let tempEndDate = new Date(endDateInput.val());
              if(tempStartDate > tempEndDate){
                  endDateInput.val(getFormatDateTime(ct));
              }
          }else {
              endDateInput.val(getFormatDateTime(ct));
          }
      },
      onSelectDate: function(ct, $i){
          $("#dateEnd").datetimepicker('setOptions', { minDate: ct });
          $("#dateEnd").datetimepicker('setOptions', { minTime: ct });
      },
      onSelectTime: function(ct, $i){
          $("#dateEnd").datetimepicker('setOptions', { minDate: ct });
          $("#dateEnd").datetimepicker('setOptions', { minTime: ct });
      }
    });
  },

  Editor : function(){
    ClassicEditor
      .create( document.querySelector( "[data-selector=editor]"), {
        extraPlugins: [Form.EditorUploadAdapter],
      } )
      .then( editor => {
        console.log( 'Editor was initialized', editor );
        myEditor = editor;
      } )
      //.catch( Form.EditorHandleError() );
  },

  EditorHandleError : function( error ) {
    const issueUrl = '';
    const message = [
      'Oops, something went wrong!',
      `Please, report the following error on ${issueUrl} with the build id "hx0uuf1x53f8-uh99o83vfkze" and the error stack trace:`
    ].join('\n');

    console.error(message);
    console.error(error);
  },

  EditorUploadAdapter : function(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader)
    }
  },

  Bind : function(){
    $("[data-action=changeImg]").unbind("change").on("change", function(){
      Form.ReadImg(this);
    })
  },

  Init : function(){
    Form.Bind();
    Form.DatePick();
    Form.Editor();
  }
}
