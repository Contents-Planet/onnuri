@extends('layouts.appAdmin')
@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}" />

  <div class="panel panel-inverse">
    <div class="panel-heading">
      <h4 class="panel-title">List</h4>
      <div class="panel-heading-btn">
        <a class="btn btn-gray btn-sm" href="#"><i class="fas fa-file-excel" aria-hidden="true"></i> ExcelDownLoad</a>
        <a class="btn btn-gray btn-sm" href="#"><i class="fas fa-file-excel" aria-hidden="true"></i> ExcelUpLoad</a>
        <a href="javascript:void(0);" class="btn btn-xs btn-icon btn-default" data-toggle="panel-expand" data-tooltip-init="true"><i class="fa fa-expand"></i></a>
      </div>
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
