var geocoder = new kakao.maps.services.Geocoder(),
  mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 8 // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var selectedMarker = null, // 클릭한 마커를 담을 변수
  imageSrc = 'https://static.econtents.co.kr/_img/ktrobot.co.kr/map_marker.webp', // 마커이미지의 주소입니다
  imageSize = new kakao.maps.Size(35, 44), // 마커이미지의 크기입니다
  imageOption = {offset: new kakao.maps.Point(18, 44)}, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),

  overSize = new kakao.maps.Size(40, 50),
  overOption = {offset: new kakao.maps.Point(20, 50)},
  overImage = new kakao.maps.MarkerImage(imageSrc, overSize, overOption),
  marker = new kakao.maps.Marker();

var clickedOverlay = null;

var depth1 = ND.RETURN.param("depth1"),
  depth2 = ND.RETURN.param("depth2"),
  depth3 = [],
  page = ND.RETURN.param("page")

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

var $reData = {
  "depth1" : "",
  "depth2" : "",
  "positions" : "",
  "coards" : ""
};
var $positions = [];
//console.log("depth1 : "+ depth1, "depth2 : "+ depth2, "depth3 : "+ depth3, "page : "+ page)
//console.log(formData)
//console.log($positions)

$(function(){
  Page.Init();

  var clipboard = new Clipboard('#copy');
  clipboard.on('success', function(e) {
    alert("URL 복사가 완료되었습니다.\n다른곳에 붙여넣으세요");
  });

  clipboard.on('error', function(e) {
    alert("Ctrl + C 를 눌러서 복사해 주세요.");
  });
})

var Page = {
  Reset : function(){
    location.href = "/store";
  },

  Load: function () {
    /* search bar render */
    $("[name=page]").val(formData.page)
    Page.NowUrl();
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

            var depth3Data = {
              "dec1" : formData.depth1,
              "dec2" : formData.depth2,
              "depth" : "depth3"
            }
            API.GetData(depth3Data, 'getCityNames', function(res) {

              $.each(res, function(index, row){
                if(row.seq === formData.depth3[0]) {
                  $("[data-selector=business]").html(row.dec + (formData.depth3.length > 1 ? "외 " + (formData.depth3.length - 1) + "건" : ''));
                }
              })
              /* data render */
              //Page.RenderMap(depth1 + (depth2 ? " "+ depth2 : ""));

              if(formData.page > 1) {

                var reData = {}
                for(var i = 1, max = formData.page; i <= max; i++) {
                  reData = {
                    "depth1" : formData.depth1,
                    "depth2" : formData.depth2,
                    "depth3" : formData.depth3,
                    "page": i
                  }
                  var mapData = "";
                  Page.RenderData(reData, function(mapData){
                    if(mapData.page == formData.page) {
                      Map.AddMarker(mapData)
                    }
                  });
                }
              } else {
                Page.RenderData(formData, function(mapData){
                  Map.AddMarker(mapData)
                });
              }
            })
          })
        }
      })
    })
  },

  NowUrl: function () {
    $("[data-action=clipboard]").attr("data-clipboard-text", location.href)
  },

  RenderData : function(reData, _callback){
    API.GetData(reData, 'getStoreList', function(res){
      //console.log(formData)
      $("[name=totalPage]").val(res.totalPage)

      var html = '';
      $.each(res.data, function(index, row) {
        var jsonObj = new Object();
        jsonObj.seq = row.seq;
        jsonObj.tit = row.tit;
        jsonObj.add = row.add;
        jsonObj.market_name = row.market_name;
        jsonObj.business = row.business;
        geocoder.addressSearch(row.add, function (result, status) {
          jsonObj.lat = status === kakao.maps.services.Status.OK ? result[0].y : '';
          jsonObj.lng = status === kakao.maps.services.Status.OK ? result[0].x : '';
        })
        $positions.push(jsonObj);
      })

      setTimeout(function(){
        var pin = 0;
        $.each($positions, function(index, row) {
          html += ' <li class="data-item" data-selector="dataItem" data-la="'+ row.lng +'" data-ma="'+ row.lat +'" data-tit="'+ row.tit +'" data-seq="'+ row.seq +'">';
          html += '   <dl class="data-flex flex">';
          html += '     <dt class="flex">';
          html += '       <div class="col-ico">';
          html += '         <span class="ico" style="background-image:url(https://static.econtents.co.kr/_img/onnuri/type'+ row.business +'_v2.webp)"></span>';
          html += '       </div>';
          html += '       <div class="col-dec">';
          html += '         <strong class="tit">'+ row.tit +' / '+ row.seq +'</strong>';
          html += '         <p class="add">'+ row.add +'</p>';
          html += '         <p class="latlng">La : '+ row.lng +' / Ma : '+ row.lat +'</p>';
          html += '       </div>';
          html += '     </dt>';
          html += '     <dd>';
          html += '       <ul class="btn-flex flex">';
          // html += '         <li><a href="tel:'+ row.tel +'" class="tel"><span class="a11y">'+ row.tel +' 전화걸기</span></a></li>';
          if(row.lat && row.lng) {
            pin ++
            html += '         <li><button class="map" data-action="mapMarker" data-lat="'+ row.lat +'" data-lng="'+ row.lng +'"><span class="a11y">위치보기</span></button></li>';
          }
          html += '       </ul>';
          html += '     </dd>';
          html += '   </dl>';
          html += ' </li>';
        })
        //console.log($positions.length, pin)

        if(Math.ceil($("[name=totalPage]").val())  > res.page) {
          html += ' <li class="non-bd" data-selector="moreContainer">';
          html += '   <a href="javascript:void(0)" class="btn-close more" data-action="moreData"><span class="txt">더보기</span></a>';
          html += ' </li>';
        }
        $("[data-selector=moreContainer]").remove();
        $("[data-selector=listAppend]").append(html);

        var $mapData = {
          "depth1" : $("[name=depth1]").data("value"),
          "depth2" : $("[name=depth2]").data("value"),
          "positions" : $positions,
          "page" : res.page
        };

        if (typeof _callback === 'function') {
          _callback.call(null, $mapData);
        }
      }, (200 * res.page))
    })
  },

  More : function(){
    var _tempUrl = window.location.search.substring(1),
      _tempArray = _tempUrl.split('&');

    var url = '?';
    $.each(_tempArray, function(index, row){
      if(row.indexOf("page") > -1) {
        url += "page="+ (parseInt($("[name=page]").val()) + 1) + (_tempArray.length - 1 > index ? "&" : '');
      } else {
        url += row + (_tempArray.length > index ? "&" : '');
      }
    })
    location.href=url;
  },

  /*RenderMap : function(add){
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
  },*/

  Clipboard : function(){
    console.log(location.href)
    $("[data-action=clipboard]").attr("data-clipboard-text", "");

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

  AddMarker : function(data){
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

      /*클러스터로*/
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 1, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
      });

      var markers = $(data.positions).map(function(i, position) {
        var imageSrc = "https://static.econtents.co.kr/_img/onnuri/marker"+ position.business +".webp", // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 44), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(18, 44)}, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

        var marker = new kakao.maps.Marker({
          position : new kakao.maps.LatLng(position.lat, position.lng),
          title : position.tit,
          clickable : true,
          image: markerImage,
        });
        marker.id = position.seq

        /*customoverlay Todo*/
        var content = '<div class="customoverlay">';
        content += '  <span href="javascript:void(0)" data-action="">';
        content += '    <span class="strore">'+ position.tit +'</span>';
        content += '  </span>';
        content += '</div>';

        var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(position.lat, position.lng),
          content: content
        });

        kakao.maps.event.addListener(marker, 'click', function() {
          $('[data-selector=dataItem]').removeClass("_active");
          $('[data-tit="'+ marker.getTitle() +'"]').addClass("_active");

          if (!selectedMarker || selectedMarker !== marker) {
            // 클릭된 마커 객체가 null이 아니면
            // 클릭된 마커의 이미지를 기본 이미지로 변경하고
            !!selectedMarker && selectedMarker.setImage(markerImage);

            marker.setImage(markerImage);
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

        return marker
      });

      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers);

      kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        var level = map.getLevel()-1;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        map.setLevel(level, {anchor: cluster.getCenter()});
        $('[data-selector=dataItem]').removeClass("_active");

        if(level < 1) {
          $.each(cluster._markers, function(index, row){
            $('[data-tit="'+ row.Gb +'"]').addClass("_active");
          })

        }
      });

      $("[data-action=mapMarker]").unbind("click");
      $(document).on("click", "[data-action=mapMarker]", function () {
        var lat = $(this).data("lat"),
          lng = $(this).data("lng");

        var moveLatLon = new kakao.maps.LatLng(lat, lng);
        map.setLevel('2');
        map.panTo(moveLatLon);

        $("[data-selector=listAppend] > li").removeClass("_active");
        $(this).closest("[data-selector=dataItem]").addClass("_active");
      })
    })
  }
}
