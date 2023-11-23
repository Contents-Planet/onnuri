var geocoder = new kakao.maps.services.Geocoder();

var clickedOverlay = null;

$(function(){
  Page.Init();
})

var Page = {
  Load: function () {
    var depth1 = ND.RETURN.param("depth1"),
      depth2 = ND.RETURN.param("depth2"),
      depth3 = [],
      page = ND.RETURN.param("page");

    var _tempUrl = window.location.search.substring(1),
    _tempArray = _tempUrl.split('&');
    $.each(_tempArray, function(index, row){
      if(row.indexOf("depth3") > -1) {
        depth3.push(row.replace("depth3=", ""));
      }
    })
    console.log("depth1 : "+ depth1, "depth2 : "+ depth2, "depth3 : "+ depth3, "page : "+ page)

    var formData = {
      "depth1" : depth1,
      "depth2" : depth2,
      "depth3" : depth3,
      "page" : page,
    }

    console.log(formData)

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

    var $container = $("[data-selector=selectDrop]"),
      $drop = $("[data-selector=dropContainer][data-sid="+ depth +"]");


    Page.GetData(formData, function(res){
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
      }
      else if(depth === "depth3") {

        var max = res.length - 1;
        var liCount = 0;
        $.each(res, function(index, row){

          html += ' <li '+ (liCount > 18 ? 'class="hide" data-selector="hide"' : '') +'>';
          html += '   <div class="label-wrap type-icon checkbox '+ (row.isActive == 0 ? '_disable' : '') +'" >';
          html += '     <input type="checkbox" name="'+ depth +'" value="'+ row.seq +'" id="'+ depth +'_'+ row.seq +'" data-value="'+ row.dec +'" data-action="chk" '+ (row.isActive === 0 ? 'disable' : '') +'/>';
          html += '     <label class="txt" for="'+ depth +'_'+ row.seq +'" style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.class +'.webp)">'+ row.dec +'</label>';
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
    $("[data-selector=listAppend]").html("");
    $('html, body').animate({scrollTop: 0}, 300);
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

    var $fm = $("[name=frm]"),
      formData = $fm.serialize();

    Page.RenderData(formData, function(res){
      console.log(formData, res)
      var $positions = new Array(),
        html = '';


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
        // html += '         <li><a href="tel:'+ row.tel +'" class="tel"><span class="a11y">'+ row.tel +' 전화걸기</span></a></li>';
        html += '         <li><a href="javascript:void(0)" class="map" data-action="mapMarker"><span class="a11y">위치보기</span></a></li>';
        html += '       </ul>';
        html += '     </dd>';
        html += '   </dl>';
        html += ' </li>';

        geocoder.addressSearch(row.add, function (result, status) {
          var jsonObj		= new Object();
          jsonObj.tit = row.tit;
          jsonObj.add = row.add;
          jsonObj.business = row.business;
          jsonObj.lat = status === kakao.maps.services.Status.OK ? result[0].y : '';
          jsonObj.lng = status === kakao.maps.services.Status.OK ? result[0].x : '';
          $positions.push(jsonObj);
        })
      })

      if(res.tot > 0) {
        html += ' <li class="non-bd" data-selector="moreContainer">';
        html += '   <a href="javascript:void(0)" class="btn-close more" data-action="moreData"><span class="txt">더보기</span></a>';
        html += ' </li>';
      }

      $("[data-selector=moreContainer]").remove();
      $("[data-selector=dataContainer]").addClass("_active");
      $("[data-selector=listAppend]").append(html);
      $("[name=page]").val(parseInt($("[name=page]").val()));

      var len = $("[name=depth3]:checked").length,
        txt = $("[name=depth3]:checked").data("value");

      $("[data-selector=business]").html(txt + (len > 1 ? " 외" + (len - 1) + "건" : ''));
      $("#wrap").addClass("_search")

      var headerHeight = $("[data-selector=selectedContainer]").outerHeight(),
        dataContainer = $("[data-selector=dott][data-sid=data]").offset().top,
        moveTo = dataContainer -  headerHeight;

      /*map render*/
      var depth1 = $("[name=depth1]:checked").data("value"),
        depth2 = depth1 !== "5" ? $("[name=depth2]:checked").data("value") : "",
        $reData = {
          "depth1" : depth1,
          "depth2" : depth2,
          "positions" : $positions
        };
      Map.AddMarker($reData)
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
    Page.Load();
  }
}

var Map = {
  /* 현재위치 ㅎ*/
  CurrentLocation : function(add, _callback) {
    geocoder.addressSearch(add, function(result, status) {
      nowLocation = {"lat" : result[0].x, "lon" : result[0].y}
      if (typeof _callback === 'function') {
        _callback.call(null, nowLocation);
      }
    })
  },

  /* 죄표 주소로변환 */
  SearchAddrFromCoords : function(coords, _callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), _callback);
  },

  /* 주소 좌표로변환 */
  SearchCordsFromAdd : function(add, _callback) {
    geocoder.addressSearch(add, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        if (typeof _callback === 'function') {
          _callback.call(null, coords);
        }
      }
    })
  },

  AddMarker : function(data){
    console.log(data)
    Map.CurrentLocation((data.depth1 + (data.depth2 ? ' '+ data.depth2 : "")), function(res) {
      var mapContainer = document.getElementById('map'),
        mapOption = {
          center: new kakao.maps.LatLng(res.lon, res.lat),
          level: 7
        };

      var map = new kakao.maps.Map(mapContainer, mapOption),
        center = map.getCenter(),
        level = map.getLevel();

      /*클러스터로*/
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 1, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
      });


      /*var ajaxUrl = '/assets/js/api.sample3.json';
      $.ajax({
        type: 'get',
        dataType: 'json',
        url: ajaxUrl,
        success: function(response) {
          console.log(response.positions)
          console.log(data.positions)

          var markers = $(data.positions).map(function(i, position) {
            return new kakao.maps.Marker({
              position : new kakao.maps.LatLng(position.lat, position.lng)
            });
          });

          // 클러스터러에 마커들을 추가합니다
          clusterer.addMarkers(markers);

          kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
            // 현재 지도 레벨에서 1레벨 확대한 레벨
            var level = map.getLevel()-1;
            // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
            map.setLevel(level, {anchor: cluster.getCenter()});

            console.log(clusterer)
          });
        }
      });*/

      var markers = $(data.positions).map(function(i, position) {
        return new kakao.maps.Marker({
          position : new kakao.maps.LatLng(position.lat, position.lng)
        });
      });

      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers);

      kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        var level = map.getLevel()-1;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        map.setLevel(level, {anchor: cluster.getCenter()});

        console.log(clusterer)
      });

      /*Map.SearchAddrFromCoords(center, function(res) {
        var depth1 = res[0].region_1depth_name,
          depth2 = level > 7 ? '' : res[0].region_2depth_name,
          depth3 = level > 7 ? '' : res[0].region_3depth_name;

        /!*var markers = $($positions).map(function(i, row) {
          return new kakao.maps.Marker({
            position : new kakao.maps.LatLng(row.lat, row.lng)
          });
        });

        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);*!/

        /!*$.each($addData, function (index, row) {
          //var place = !row.place ? 'https://map.naver.com/v5/search/'+ (encodeURI(row.depth1 +' '+ row.depth2 +' '+ row.depth3 +' '+ row.store)) +'/place/' : row.place;
          Map.SearchCordsFromAdd(row.add, function (coords) {

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var selectedMarker = null; // 클릭한 마커를 담을 변수
            var imageSrc = "https://static.econtents.co.kr/_img/onnuri/marker"+ row.business +".webp", // 마커이미지의 주소입니다
              imageSize = new kakao.maps.Size(35, 44), // 마커이미지의 크기입니다
              imageOption = {offset: new kakao.maps.Point(18, 44)}, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),

              overSize = new kakao.maps.Size(40, 50),
              overOption = {offset: new kakao.maps.Point(20, 50)},
              overImage = new kakao.maps.MarkerImage(imageSrc, overSize, overOption);

            var marker = new kakao.maps.Marker({
              position: coords,
              image: markerImage, // 마커이미지 설정
              clickable: true
            });

            var infowindow = new kakao.maps.InfoWindow({
              content: row.store // 인포윈도우에 표시할 내용
            });

            var content = '<div class="customoverlay">';
            content += '  <a href="" target="_blank">';
            content += '    <span class="strore">' + row.tit + '</span>';
            content += '  </a>';
            content += '</div>';

            marker.setMap(map);

            /!*var content = '<div class="customoverlay">';
            content += '  <a href="' + place + '" target="_blank">';
            content += '    <span class="strore">' + row.store + '</span>';
            content += '  </a>';
            content += '</div>';*!/

            var customOverlay = new kakao.maps.CustomOverlay({
              position: coords,
              content: content
            });

            kakao.maps.event.addListener(marker, 'mouseover', function () {
              if (!selectedMarker || selectedMarker !== marker) {
                marker.setImage(overImage);
                //infowindow.open(map, marker);
              }
            });

            // 마커에 mouseout 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseout', function () {
              if (!selectedMarker || selectedMarker !== marker) {
                marker.setImage(markerImage);
                //infowindow.close();
              }
            });

            kakao.maps.event.addListener(marker, 'click', function () {
              if (!selectedMarker || selectedMarker !== marker) {

                // 클릭된 마커 객체가 null이 아니면
                // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                !!selectedMarker && selectedMarker.setImage(markerImage);

                marker.setImage(overImage);
                //window.open(place, '', '');

              }

              if (clickedOverlay) {
                clickedOverlay.setMap(null);
              }
              customOverlay.setMap(map);
              clickedOverlay = customOverlay;

              // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
              selectedMarker = marker;
            });
          })
        });*!/
      })*/
    })
  },
}
