@extends('layouts.app')
@section('content')
  <div id="wrap" class="page-store _search">
    <div id="container">
      <div id="contents">
        <div class="selected-container" data-selector="selectedContainer">
          <a href="javascript:void(0)" class="filter" data-action="reSearch">
            <strong class="tit" data-selector="area"></strong>
            <p class="dec" data-selector="business"></p>
          </a>
          <input type="hidden" name="depth1" data-value="" />
          <input type="hidden" name="depth2" data-value="" />
        </div>
        <div class="data-container _active" data-selector="dataContainer">
          <div class="m-main">
            <div class="dott" data-selector="dott" data-sid="data"></div>
            <div class="map-container" data-selector="mapContainer">
              <div id="map"></div>
            </div>
            <ul class="list-flex" data-selector="listAppend"></ul>
            <input type="" name="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="/assets/js/page.store.list.js"></script>
@endsection
