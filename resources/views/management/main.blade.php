@extends('layouts.appAdmin')
@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}" />

{{ dd(phpinfo()); }}
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
