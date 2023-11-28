<?php
  use App\Models\Member;
  use App\Http\Controllers\ContentsPlanet;
  $memberModel = new Member();
  $memberInfo = $memberModel->getMemberWithSeq(request()->session()->get('member_seq'));

?>
<!-- BEGIN #header -->
<div id="header" class="app-header">
  <h1 class="a11y">관리자 | 온누리</h1>
  <!-- BEGIN navbar-header -->
  <div class="navbar-header">
    <a href="#" class="navbar-brand">
      <img src="" />
    </a>
    <button type="button" class="navbar-mobile-toggler" data-toggle="app-sidebar-mobile">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
  </div>
  <!-- END navbar-header -->
  <!-- BEGIN header-nav -->
  <div class="navbar-nav">
    <div class="navbar-item navbar-user dropdown">
      <a href="#" class="navbar-link dropdown-toggle d-flex align-items-center profile" data-bs-toggle="dropdown">
        <div class="pic-wrap">
          <div class="img-box" style="background-image:url(<?php echo e((!is_null($memberInfo['profile_img'])) ? ContentsPlanet::S3_OBJECT.$memberInfo['profile_img'] : "/img/member/mem.jpg"); ?>)"></div>
        </div>
        <span class="d-none d-md-inline"><?php echo e($memberInfo['name']); ?></span> <b class="caret ms-6px"></b>
      </a>
      <div class="dropdown-menu dropdown-menu-end me-1">
        
        
        <form role="form" method="post" action="<?php echo e(route('logout')); ?>" id="logout-form">
          <?php echo csrf_field(); ?>
          <a href="<?php echo e(route('logout')); ?>" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="dropdown-item">Log Out</a>
        </form>
      </div>
    </div>
  </div>
  <!-- END header-nav -->
</div>

<?php /**PATH /Users/happyoley/develop/onnuri/resources/views/management/navbars/topnav.blade.php ENDPATH**/ ?>