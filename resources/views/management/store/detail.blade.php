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
        <div class='row'>
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
          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label" for="content">동이상 주소</label></dt>
            <dd>
              <input class="form-control" type="text" name="addres" id="addres" value="{{$store_data['addres'] ?? null}}" placeholder=""/>
            </dd>
          </dl>
          <dl class="form-dl col-md-6">
            <dt><label class="form-label col-form-label" for="content">동이하 주소</label></dt>
            <dd>
              <input class="form-control" type="text" name="addres_depth_detail" id="addres_depth_detail" value="{{$store_data['addres_depth_detail'] ?? null}}" placeholder=""/>
            </dd>
          </dl>
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
    $(".saveBtn").on("click",function (){

      $("#frm").submit();

    });

  $("#addres_depth_1").on("change",function(){
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
  });
</script>
@endpush
