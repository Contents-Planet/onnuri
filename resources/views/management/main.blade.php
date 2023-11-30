@extends('layouts.appAdmin')
@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}" />

{{-- {{ dd(phpinfo()); }} --}}
  <div class="panel panel-inverse">
    <div class="panel-heading">
      <h4 class="panel-title">List</h4>
      <form enctype="multipart/form-data" id='excelForm' action="{{ route('excel.upload') }}" method="post">
        {{ csrf_field() }}
        <div class="panel-heading-btn">
          <input type='file' id='excelFile' name='excelFile'>
          <button type='button' onclick="doExcel()" class="btn btn-gray btn-sm"><i class="fas fa-file-excel" aria-hidden="true"></i> excel upload</button>
        </div>
      </form>
    </div>
    <div class="panel-body">

      <form id='search_form' action="{{ route('management.mian') }}">
        <input type='hidden' name='orderDirection' id='orderDirection' value="{{$data['search_array']['orderDirection'] ?? null}}">
        <input type='hidden' name='orderField' id='orderField' value="{{$data['search_array']['orderField'] ?? null}}">
        <div class="row">
          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="search_depth_1">시/도</label>
            <select class="form-select" name='search_depth_1' id="search_depth_1">
              <option value="">select</option>
              @foreach ($addres_depth_1 as $val)
                <option value="{{$val['seq']}}" @isset($search_depth_1) @if ($search_depth_1 == $val['seq']) selected @endif @endisset>{{$val['dec']}}</option>
              @endforeach
            </select>
          </div>
          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="search_depth_2">구/군</label>
            <select class="form-select" name='search_depth_2' id="search_depth_2">
              <option value="">select</option>
              @isset($search_depth_options)
                @foreach ($search_depth_options as $val)
                  <option value="{{$val['dec']}}" @isset($search_depth_2) @if ($search_depth_2 == $val['dec']) selected @endif @endisset>{{$val['dec']}}</option>
                @endforeach
              @endisset
            </select>
          </div>
          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="search_type">검색 타입</label>
            <select class="form-select" name="search_type" id="search_type">
              <option value="">select</option>
              <option value="market_name" @isset($search_type) @if ($search_type == "market_name") selected @endif @endisset>시장명</option>
              <option value="franchise_name" @isset($search_type) @if ($search_type == "franchise_name") selected @endif @endisset>상점명</option>
            </select>
          </div>

          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="">키워드</label>
            <input class="form-control" name="search_keyword" value="{{$search_keyword ?? null}}"/>
          </div>
        </div>
        <hr>
        <ul class="btn-right">
          <li><a href="javascript:void(0)" class="btn btn-gray" onclick="document.getElementById('search_form').submit();">검색</a></li>
          <li><a href="/management" class="btn btn-danger">초기화</a></li>
          <li><a class="btn btn-success" style='background-color:#008C8C; color:#fff;' onclick="excelDown();"><i class="fas fa-file-excel" aria-hidden="true"></i> Excel Download</a></li>
        </ul>
      </form>
    </div>
    <div class="panel-body">
      <table class="table">
        <colgroup>
          <col style="width:50px">
          <col style="width:80px">
          <col style="width:80px">
          <col style="width:140px">
          <col style="width:150px">
          <col />
          <col style="width:150px">
          <col style="width:120px">
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>사업자 NO.</th>
            <th>업종</th>
            <th>상점명</th>
            <th>시장명</th>
            <th>주소</th>
            <th>LatLng</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($store_data->get() as $list)
            <tr>
              <td style='text-align:center;'>{{$row_num--;}}</td>
              <td style='text-align:center;'>{{$list->business_number}}</td>
              <td style='text-align:center;'>{{$list->industry_name}}</td>
              <td style='text-align:center;'>{{$list->franchise_name}}</td>
              <td style='text-align:center;'>{{$list->market_name}}</td>
              <td style='text-align:center;'><p class="dec">{{$list->addres ." ". $list->addres_depth_detail}}</p></td>
              <td style='text-align:center;'></td>
              <td style='text-align:center;'>
                <button class="btn btn-gray">수정</button>
                <button class="btn btn-danger">삭제</button>
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
      {!!$paga_nation!!}
    </div>
  </div>

@endsection
@push('js')
  <script>

    function excelDown(){
      var form = document.getElementById('search_form');
      form.action = "{{ route('excel.download') }}";
      form.submit();
    }

    $("#search_depth_1").on("change",function(){
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'post',
        url: "{{ route('store.search_depth2') }}",
        data: {
          'seq': $("#search_depth_1").val(),
        },
        success: function(res) {
          $("select[name='search_depth_2'] option").remove();
          $('#search_depth_2').append(res);
        }
      });
    });

    function doExcel(){
      var excelFile = $('#excelFile').val();
      var fileForm = /(.*?)\.(xlsx|xlsb)$/;


      if($('#excelFile').val() == "") {
        alert("엑셀파일을 선택해주세요.");
          $("#excelFile").focus();
          return false;
      }

      if(excelFile != "" && excelFile != null) {
          if(!excelFile.match(fileForm)) {
            alert("엑셀 파일만 업로드 가능");
              return false;
          }
      }

      $("#excelForm").submit();
    }
  </script>
@endpush
