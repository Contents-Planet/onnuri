@extends('layouts.appAdmin')
@section('content')
  <meta name="csrf-token" content="{{ csrf_token() }}" />

  <div class="panel panel-inverse">
    <div class="panel-heading">
      <h4 class="panel-title">스토어 수정</h4>
      <div class="panel-heading-btn">
        <a href="javascript:void(0);" class="btn btn-xs btn-icon btn-default" data-toggle="panel-expand"><i class="fa fa-expand"></i></a>
      </div>
    </div>
    {{-- {{dd($store_data);}} --}}
    <div class="panel-body">
      <form role="form" method="POST" id="frm" action="{{ route("management.save") }}">
        @csrf
        <input type='hidden' name='seq' value='{{$store_data['seq']}}'>
        <div class="row">
          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label req" for="content">상점명</label></dt>
            <dd>
              <input class="form-control" type="text" name="franchise_name" id="franchise_name" value="{{$store_data['franchise_name'] ?? null }}" placeholder=""/>
            </dd>
          </dl>
        </div>
        <div class="row">
          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label req" for="content">시 / 도</label></dt>
            <dd>
              <select class="form-select" name='addres_depth_1' id="addres_depth_1">
                <option value="">select</option>
                @foreach ($addres_depth as $val)
                  <option value="{{$val['seq']}}" @isset($addres_depth_1) @if ($addres_depth_1 == $val['seq']) selected @endif @endisset>{{$val['dec']}}</option>
                @endforeach
              </select>
            </dd>
          </dl>

          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label req" for="content">구 / 군</label></dt>
            <dd>
              <select class="form-select" name='addres_depth_2' id="addres_depth_2">
                <option value="">select</option>
                @isset($search_depth_options)
                  @foreach ($search_depth_options as $val)
                    <option value="{{$val['dec']}}" @isset($addres_depth_2) @if ($addres_depth_2 == $val['dec']) selected @endif @endisset>{{$val['dec']}}</option>
                  @endforeach
                @endisset
              </select>
            </dd>
          </dl>
        </div>

        <div class="row">
          <dl class="form-dl col-md-6">
            <dt><span class="form-label col-form-label req">주소 검색</span></dt>
            <dd>
              <div class="add-container" data-selector="addContainer">
                <ul class="col-flex flex">
                  <li>
                    <div class="col c1">
                      <input type="hidden" name="zip" id="zip" value="" data-selector=zip  title="우편번호"/>
                      <input class="form-control" type="text" name="addres" id="addres" value="{{$store_data['addres'] ?? null}}" readonly="" data-selector="add1"  title="주소"/>
                      <a href="javascript:void(0)" data-action="findZip" class="btn btn-gray" role="button">주소검색</a>
                    </div>
                  </li>
                  <li>
                    <input class="form-control" type="text" name="addres_depth_detail" id="addres_depth_detail" value="{{$store_data['addres_depth_detail'] ?? null}}" placeholder="" data-selector="add2" title="상세 주소"/>
                  </li>
                </ul>
              </div>
            </dd>
          </dl>
        </div>

        <div class="row">
          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label" for="content">위도</label></dt>
            <dd>
              <input class="form-control" type="text" name="latitude" id="latitude" value="{{$store_data['latitude'] ?? null}}" placeholder=""/>
            </dd>
          </dl>
          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label" for="content">경도</label></dt>
            <dd>
              <input class="form-control" type="text" name="longitude" id="longitude" value="{{$store_data['longitude'] ?? null}}" placeholder=""/>
            </dd>
          </dl>
        </div>
        <ul class="btn-right">
          <li><a href="javascript:void(0)" class="btn btn-primary btn-sm saveBtn" data-action="save">Save</a></li>
        </ul>
      </form>
    </div>
  </div>
@endsection
@push('js')
<script>
  $(function(){
    Address.Init();
    Page.Init();

  })

  var geocoder = new kakao.maps.services.Geocoder(),
  Page = {
    ChangeCity : function(){
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'post',
        url: "{{ route('store.search_depth2') }}",
        data: {
          'seq': $("#addres_depth_1").val(),
        },
        success: function(res) {
          $("select[name='addres_depth_2'] option").remove();
          $('#addres_depth_2').append(res);
        }
      });
    },

    SearchCordsFromAdd : function() {
      var add1 = $("[name=addres]").val(),
        add2 = $("[name=addres_depth_detail]").val(),
        latitude = $("[name=latitude]"),
        longitude = $("[name=longitude]");

      if(add1){
        geocoder.addressSearch((add1 +' '+ (add2 ? add2 : '')), function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            latitude.val(result[0].x);
            longitude.val(result[0].y);
          }
        })
      }
    },

    Bind : function(){
      $("#addres_depth_1").on("change",function(){
        Page.ChangeCity();
      });
    },

    Init : function(){
      Page.SearchCordsFromAdd();

      $(".saveBtn").on("click",function (){
        console.log('asd');
        Page.SearchCordsFromAdd();
        $("#frm").submit();
      });
    }
  }

  Address = {
    Zip : function(e) {
      new daum.Postcode({
        oncomplete: function(data) {
          var $wrap = e.closest("[data-selector=addContainer]");

          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if(fullRoadAddr !== ''){
            fullRoadAddr += extraRoadAddr;
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          $wrap.find("[data-selector=zip]").val(data.zonecode);				 //5자리 새우편번호 사용(도로명 우편번호)
          $wrap.find("[data-selector=add1]").val(data.roadAddress);
          Page.SearchCordsFromAdd();
        }
      }).open();
    },

    Bind : function() {
      $("[data-action=findZip]").unbind("click");
      $(document).on("click", "[data-action=findZip]", function(){
        Address.Zip($(this));
      })
    },

    Init : function(){
      Address.Bind();
    }
  }
</script>
@endpush
