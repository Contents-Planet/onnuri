@extends('layouts.app')
@section('content')
<div id="wrap" class="page-store">
  <header id="header">
    <div class="sticky"><h1 id="logo"><a href="" class="logo-item"></a></h1></div>
    <p class="h1"><strong class="t-orange">온누리 가맹점</strong>을 <br />소개합니다</p>
  </header>
  <div id="container">
    <div id="contents">
      <div class="selected-container" data-selector="selectedContainer">
        <a href="javascript:void(0)" class="filter" data-action="reSearch">
          <strong class="tit" data-selector="area"></strong>
          <p class="dec" data-selector="business"></p>
        </a>
      </div>
      <form method="post" name="frm">
        <div class="m-main">
          <section class="drop-sec" data-selector="selectDrop">
            <div class="drop-container" data-selector="dropContainer" data-sid="depth1">
              <a href="javascript:void(0)" class="btn-drop" data-action="btnDrop">
                <dl>
                  <dt><span class="label">지역선택 <small>(시/도)</small></span><span class="dt">지역</span></dt>
                  <dd data-selector="selected"></dd>
                </dl>
              </a>
              <div class="drop-wrap">
                <ul class="label-flex flex" data-selector="kind"></ul>
              </div>
            </div>

            <div class="drop-container _disable" data-selector="dropContainer" data-sid="depth2">
              <a href="javascript:void(0)" class="btn-drop" data-action="btnDrop">
                <dl>
                  <dt><span class="label">지역선택 <small>(구/군)</small></span><span class="dt">지역</span></dt>
                  <dd data-selector="selected"></dd>
                </dl>
              </a>
              <div class="drop-wrap">
                <ul class="label-flex flex depth2" data-selector="kind"></ul>
              </div>
            </div>

            <div class="drop-container _disable" data-selector="dropContainer" data-sid="depth3">
              <a href="javascript:void(0)" class="btn-drop" data-action="btnDrop">
                <dl>
                  <dt><span class="label">업종별</span><span class="dt">업종</span></dt>
                  <dd data-selector="selected"></dd>
                </dl>
              </a>
              <div class="drop-wrap">
                <ul class="label-flex flex icon" data-selector="kind"></ul>
              </div>
            </div>

            <div class="drop-container _disable" data-selector="searchContainer">
              <a href="javascript:void(0)" class="btn-drop search" data-action="search"><span class="txt">검색</span></a>
              <input type="hidden" value="1" name="page" />
            </div>
          </section>
        </div>
        <div class="data-container" data-selector="dataContainer">
          <div class="m-main">
            <div class="dott" data-selector="dott" data-sid="data"></div>
            <div class="map-container" data-selector="mapContainer">
              <div id="map"></div>
            </div>
            <ul class="list-flex flex" data-selector="listAppend"></ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<script src="/assets/js/page.store.js"></script>
@endsection
