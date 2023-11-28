<?php $__env->startSection('content'); ?>
<meta name="csrf-token" content="<?php echo e(csrf_token()); ?>" />

  <div class="panel panel-inverse">
    <div class="panel-heading">
      <h4 class="panel-title">List</h4>
      <form enctype="multipart/form-data" id='excelForm' action="<?php echo e(route('excel.upload')); ?>" method="post">
        <?php echo e(csrf_field()); ?>

        <div class="panel-heading-btn">
          <input type='file' id='excelFile' name='excelFile'>
          
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
          <?php $__currentLoopData = $store_data->get(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $list): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr>
              <td style='text-align:center;'><?php echo e($row_num--); ?></td>
              <td style='text-align:center;'><?php echo e($list->business_number); ?></td>
              <td style='text-align:center;'><?php echo e($list->industry_name); ?></td>
              <td style='text-align:center;'><?php echo e($list->franchise_name); ?></td>
              <td style='text-align:center;'><?php echo e($list->market_name); ?></td>
              <td style='text-align:center;'><?php echo e($list->addres ." ". $list->addres_depth_detail); ?></td>
              <td style='text-align:center;'><button>수정</button></td>
            </tr>
          <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </tbody>
      </table>
      <?php echo $paga_nation; ?>

    </div>
  </div>

<?php $__env->stopSection(); ?>
<?php $__env->startPush('js'); ?>
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
<?php $__env->stopPush(); ?>

<?php echo $__env->make('layouts.appAdmin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/happyoley/develop/onnuri/resources/views/management/main.blade.php ENDPATH**/ ?>