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
          {{-- <button type='button' onclick="doExcel()" class="btn btn-gray btn-sm"><i class="fas fa-file-excel" aria-hidden="true"></i> excel upload</button> --}}
        </div>
      </form>
    </div>
    <div class="panel-body">
      <form id='search_form' action="{{ route('onnuri.search') }}">
        <input type='hidden' name='orderDirection' id='orderDirection' value="{{$data['search_array']['orderDirection'] ?? null}}">
        <input type='hidden' name='orderField' id='orderField' value="{{$data['search_array']['orderField'] ?? null}}">
        <div class="row">
          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="search_type">유형</label>
            <select class="form-select" name='search_type' id="search_type">
              <option value="">select</option>
              @foreach ($data['issues_type'] as $key => $val)
                <option value="{{$key}}" @isset($data['search_array']['type']) @if ($data['search_array']['type'] == $key) selected @endif @endisset>{{$val}}</option>
              @endforeach
            </select>
          </div>
          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="search_state">상태</label>
            <select class="form-select" name='search_state' id="search_state">
              <option value="">select</option>
              @foreach ($data['issues_state'] as $key => $val)
                <option value="{{$key}}" @isset($data['search_array']['state']) @if ($data['search_array']['state'] == $key) selected @endif @endisset>{{$val}}</option>
              @endforeach
            </select>
          </div>
          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="search_handler">담당자</label>
            <select class="form-select" name="search_handler" id="search_handler">
              <option value="">select</option>
              @foreach ($data['issues_member'] as $key => $val)
                <option value="{{$key}}" @isset($data['search_array']['handler']) @if ($data['search_array']['handler'] == $key) selected @endif @endisset>{{$val}}</option>
              @endforeach
            </select>
          </div>

          <div class="col-xl-3 col-sm-6">
            <label class="form-label" for="">제목</label>
            <input class="form-control" />
          </div>
        </div>
        <hr>
        <ul class="btn-right">
          <li><a href="javascript:void(0)" class="btn btn-success" onclick="document.getElementById('search_form').submit();">검색</a></li>
          <li><a href="/main" class="btn btn-gray">초기화</a></li>
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
          <col style="width:400px">
          <col style="width:120px">
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>사업자 NO.</th>
            <th>업종</th>
            <th>이름</th>
            <th>시장명</th>
            <th>주소</th>
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
              <td style='text-align:center;'>{{$list->addres ." ". $list->addres_depth_detail}}</td>
              <td style='text-align:center;'><button>수정</button></td>
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
