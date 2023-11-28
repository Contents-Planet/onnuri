<?php $__env->startSection('content'); ?>
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
          <input type="hidden" name="page" />
          <input type="hidden" name="totalPage" />
        </div>
        <div class="data-container _active" data-selector="dataContainer">
          <div class="m-main">
            <div class="dott" data-selector="dott" data-sid="data"></div>
            <div class="map-container" data-selector="mapContainer">
              <div id="map"></div>
            </div>
            <ul class="list-flex" data-selector="listAppend"></ul>
            <ul class="btt-flex flex">
              <li><input type="button" href="javascript:void(0)" class="btn-share url" id="copy" data-action="clipboard" data-clipboard-text="111" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="/assets/js/page.store.list.js"></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/happyoley/develop/onnuri/resources/views/store/list.blade.php ENDPATH**/ ?>