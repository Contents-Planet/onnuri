var geocoder = new kakao.maps.services.Geocoder(),
  mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 8 // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var selectedMarker = null; // 클릭한 마커를 담을 변수
imageSrc = 'https://static.econtents.co.kr/_img/ktrobot.co.kr/map_marker.webp', // 마커이미지의 주소입니다
  imageSize = new kakao.maps.Size(35, 44), // 마커이미지의 크기입니다
  imageOption = {offset: new kakao.maps.Point(18, 44)}, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),

  overSize = new kakao.maps.Size(40, 50),
  overOption = {offset: new kakao.maps.Point(20, 50)},
  overImage = new kakao.maps.MarkerImage(imageSrc, overSize, overOption);

var clickedOverlay = null;

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
var formData = {
  "depth1" : parseInt(depth1),
  "depth2" : parseInt(depth2),
  "depth3" : depth3,
  "page" : page,
}
console.log("depth1 : "+ depth1, "depth2 : "+ depth2, "depth3 : "+ depth3, "page : "+ page)
console.log(formData)

$(function(){
  Page.Init();
})

var Page = {
  Reset : function(){
    location.href = "/store";
  },

  Load: function () {
    /* search bar render */
    $("[name=page]").val(formData.page)
    API.GetData({"depth" : "depth1"}, 'getCityNames', function(res) {
      $.each(res, function(index, row){
        if(row.seq === formData.depth1) {
          var depth1 = row.dec,
            depth2 = '';

          API.GetData({"depth" : "depth2", "val" : formData.depth1}, 'getCityNames',function(res2) {
            $.each(res2, function(index2, row2){
              if(row2.seq === formData.depth2) {
                depth2 = row2.dec;

                $("[name=depth1]").val(row.seq).attr("data-value", depth1);
                $("[name=depth2]").val(row2.seq).attr("data-value", depth2);
              }
            })
            $("[data-selector=area]").html(depth1 + (depth2 ? " > "+ depth2 : ""));

            API.GetData({"depth" : "depth3"}, 'getCityNames', function(res) {
              $.each(res, function(index, row){
                if(row.seq === formData.depth3[0]) {
                  $("[data-selector=business]").html(row.dec + (formData.depth3.length > 1 ? "외 " + (formData.depth3.length - 1) + "건" : ''));
                }
              })
              /* data render */
              Page.RenderMap(depth1 + (depth2 ? " "+ depth2 : ""));
              Page.RenderData(formData);
            })
          })
        }
      })
    })
  },

  RenderData : function(formData, _callback){
    API.GetData(formData, 'getStoreList', function(res){
      var $positions = [],
        $coards = [],
        html = '';

      $.each(res.data, function(index, row){
        html += ' <li>';
        html += '   <dl class="data-flex flex">';
        html += '     <dt class="flex">';
        html += '       <div class="col-ico">';
        html += '         <span class="ico" style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.business +'_v2.webp)"></span>';
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

        var jsonObj		= new Object();
        jsonObj.tit = row.tit;
        jsonObj.add = row.add;
        jsonObj.business = row.business;
        geocoder.addressSearch(row.add, function (result, status) {
          jsonObj.lat = status === kakao.maps.services.Status.OK ? result[0].y : '';
          jsonObj.lng = status === kakao.maps.services.Status.OK ? result[0].x : '';
        })
        $positions.push(jsonObj);
      })

      if(res.totalPage > res.page) {
        html += ' <li class="non-bd" data-selector="moreContainer">';
        html += '   <a href="javascript:void(0)" class="btn-close more" data-action="moreData"><span class="txt">더보기</span></a>';
        html += ' </li>';
      }
      $("[data-selector=moreContainer]").remove();
      $("[data-selector=listAppend]").append(html);

      var $reData = {
        "depth1" : $("[name=depth1]").data("value"),
        "depth2" : $("[name=depth2]").data("value"),
        "positions" : $positions
      };

      Map.AddMarker($reData)
    })
  },

  More : function(){
    $("[name=page]").val(parseInt(formData.page) + 1);
    formData = {
      "depth1" : formData.depth1,
      "depth2" : formData.depth2,
      "depth3" : formData.depth3,
      "page" : $("[name=page]").val()
    }
    console.log(formData)
    Page.RenderData(formData);
  },

  RenderMap : function(add){
    Map.CurrentLocation(add, function(res) {
      $("#map").remove();
      $("[data-selector=mapContainer]").html("<div id=map></div>");

      mapContainer = document.getElementById('map'); // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(res.lon, res.lat),
        level: 7
      };
      map = new kakao.maps.Map(mapContainer, mapOption);
    })
  },

  Bind: function () {
    $("[data-action=moreData]").unbind("click");
    $(document).on("click", "[data-action=moreData]", function () {
      Page.More()
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

  /*AddMarker : function(data){
    Map.CurrentLocation((data.depth1 + (data.depth2 ? ' '+ data.depth2 : "")), function(res) {
      $("#map").remove();
      $("[data-selector=mapContainer]").html("<div id=map></div>");

      var mapContainer = document.getElementById('map'),
        mapOption = {
          center: new kakao.maps.LatLng(res.lon, res.lat),
          level: 7
        };

      var map = new kakao.maps.Map(mapContainer, mapOption),
        center = map.getCenter(),
        level = map.getLevel();

      /!*클러스터로*!/
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 1, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
      });

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
    })
  },*/

  AddMarker : function(data){
    $.each(data.positions, function (index, row) {
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      selectedMarker = null; // 클릭한 마커를 담을 변수
      imageSrc = "https://static.econtents.co.kr/_img/onnuri/marker"+ row.business +".webp"; // 마커이미지의 주소입니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        overImage = new kakao.maps.MarkerImage(imageSrc, overSize, overOption);

      Map.SearchCordsFromAdd(row.add, function(coords) {
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

        /*var content = '<div class="customoverlay">';
        content += '  <a href="' + place + '" target="_blank">';
        content += '    <span class="strore">' + row.store + '</span>';
        content += '  </a>';
        content += '</div>';*/

        /*var customOverlay = new kakao.maps.CustomOverlay({
          position: coords,
          content: content
        });*/

        /*kakao.maps.event.addListener(marker, 'mouseover', function () {
          if (!selectedMarker || selectedMarker !== marker) {
            marker.setImage(overImage);
            //infowindow.open(map, marker);
          }
        });*/

        // 마커에 mouseout 이벤트를 등록합니다
        /*kakao.maps.event.addListener(marker, 'mouseout', function () {
          if (!selectedMarker || selectedMarker !== marker) {
            marker.setImage(markerImage);
            //infowindow.close();
          }
        });*/

        /*kakao.maps.event.addListener(marker, 'click', function () {
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
        });*/
      })
    });


    /*Map.SearchAddrFromCoords(center, function(res) {
      var depth1 = res[0].region_1depth_name,
        depth2 = level > 7 ? '' : res[0].region_2depth_name,
        depth3 = level > 7 ? '' : res[0].region_3depth_name;

      var markers = $(data.positions).map(function(i, row) {
        return new kakao.maps.Marker({
          position : new kakao.maps.LatLng(row.lat, row.lng)
        });
      });

      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers);


    })*/
  },
}