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
        <span class="d-none d-md-inline">{{$memberInfo['name']}}</span> <b class="caret ms-6px"></b>
      </a>
      <div class="dropdown-menu dropdown-menu-end me-1">
        {{-- <a href="#" class="dropdown-item">Edit Profile</a> --}}
        {{-- <div class="dropdown-divider"></div> --}}
        <form role="form" method="post" action="{{ route('logout') }}" id="logout-form">
          @csrf
          <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="dropdown-item">Log Out</a>
        </form>
      </div>
    </div>
  </div>
  <!-- END header-nav -->
</div>

