<?php $__env->startSection('content'); ?>
  <!-- BEGIN #loader -->
  <div id="loader" class="app-loader">
    <span class="spinner"></span>
  </div>
  <!-- END #loader -->

  <!-- BEGIN #app -->
  <div id="app" class="app">
    <!-- BEGIN login -->
    <div class="page-login login login-with-news-feed">
      <!-- BEGIN news-feed -->
      <div class="news-feed">
        <div class="news-image" style="background-image: url(https://static.econtents.co.kr/_img/pwe/main_bg5.webp)"></div>
        <div class="news-caption">
          <h4 class="caption-title">
            <img src="https://static.econtents.co.kr/_img/pwe/logo_top.webp" alt="Planworks" /> Admin
          </h4>
        </div>
      </div>
      <!-- END news-feed -->

      <!-- BEGIN login-container -->
      <div class="login-container">
        <!-- BEGIN login-header -->
        <div class="login-header mb-30px">
          <div class="brand">
            <div class="d-flex align-items-center">
              <strong class="planworks">Planworks</strong>&nbsp;Admin
            </div>
          </div>
        </div>
        <!-- END login-header -->

        <!-- BEGIN login-content -->
        <div class="login-content">
          <form role="form" method="POST" action="<?php echo e(route('login.perform')); ?>">
            <?php echo csrf_field(); ?>
            <?php echo method_field('post'); ?>
            <div class="form-floating mb-15px">
              <input type="id" name="id" class="form-control form-control-lg" aria-label="id" placeholder="ID">
              <label for="id" class="d-flex align-items-center fs-13px text-gray-600">ID</label>
            </div>

            <div class="form-floating mb-15px">
              <input type="password" name="password" placeholder="Password" class="form-control form-control-lg">
              <label for="password" class="d-flex align-items-center fs-13px text-gray-600">Password</label>
            </div>

            <?php $__errorArgs = ['id'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <p class="text-danger text-xs pt-1"> <?php echo e($message); ?> </p><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
            <div class="mb-15px">
              <button type="submit" class="btn btn-green d-block h-45px w-100 btn-lg fs-14px">로그인</button>
            </div>
            <div class="mb-40px pb-40px text-dark">
              
            </div>
          </form>
          <hr class="bg-gray-600 opacity-2" />
          <div class="text-gray-600 text-center  mb-0">
            &copy; Planworks All Right Reserved 2023
          </div>
        </div>
        <!-- END login-content -->
      </div>
      <!-- END login-container -->
    </div>
    <!-- END login -->
  </div>
  <!-- END #app -->
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.appAdmin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/happyoley/develop/onnuri/resources/views/auth/login.blade.php ENDPATH**/ ?>