<?php
    use App\Models\Member;

    $memberModel = new Member();
    $memberInfo = $memberModel->getMemberWithSeq(request()->session()->get('member_seq'));
?>
<aside id="sidebar" class="app-sidebar" data-bs-theme="dark">
  <div class="app-sidebar-content" data-scrollbar="true" data-height="100%">
    <div class="menu">
      <!-- profile -->
      <div class="menu-profile">
        <a href="javascript:void(0);" class="menu-profile-link" data-toggle="app-sidebar-profile" data-target="#appSidebarProfileMenu">
          <div class="menu-profile-cover with-shadow"></div>
          <div class="menu-profile-image">
            <div class="pic-wrap">
              <div class="img-box"></div>
            </div>
          </div>
          <div class="menu-profile-info">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">{{$memberInfo['name']}} <span style='font-size:9px;'>님</span></div>
              {{--<div class="menu-caret ms-auto"></div>--}}
            </div>
            <small>onnuri Manager</small>
          </div>
        </a>
      </div>

      <div class="depth1" data-selector="depth1" data-sid="0">
        <div class="menu-header" data-txt="depth1">ManageMent</div>

        <div class="menu-item" data-selector="depth2" data-sid="1">
          <a href="{{ route('management.mian') }}" class="menu-link">
            <div class="menu-icon">
              <i class="fas fa-lg fa-fw me-10px fa-bullhorn"></i>
            </div>
            <div class="menu-text" data-txt="depth2">Store</div>
          </a>
        </div>
      </div>
      <hr />

      <!-- BEGIN minify-button -->
      <div class="menu-item d-flex">
        <a href="javascript:void(0);" class="app-sidebar-minify-btn ms-auto d-flex align-items-center text-decoration-none" data-toggle="app-sidebar-minify"><i class="fa fa-angle-double-left"></i></a>
      </div>
    </div>
  </div>
</aside>
<div class="app-sidebar-bg"></div>
<div class="app-sidebar-mobile-backdrop"><a href="#" data-dismiss="app-sidebar-mobile" class="stretched-link"></a></div>
<!-- END #sidebar -->





