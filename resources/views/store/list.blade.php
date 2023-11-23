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
        </div>
        <div class="data-container" data-selector="dataContainer">
          <div class="m-main">
            <div class="dott" data-selector="dott" data-sid="data"></div>
            <div class="map-container" data-selector="mapContainer">
              <div id="map"></div>
            </div>
            <ul class="list-flex" data-selector="listAppend"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="/assets/js/page.store.list.js"></script>
@endsection
