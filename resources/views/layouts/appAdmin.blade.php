<!DOCTYPE html>
<html lang="kr">

<head>
  <meta charset="UTF-8">
  <title>관리자 | 온누리</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
  <meta name="description" content=""/>
  <meta name="keywords" content=""/>
  <meta property="og:title" content=""/>
  <meta property="og:description" content=""/>
  <meta property="og:url" content=""/>
  <meta property="og:type" content="article"/>
  <meta property="og:site_name" content=""/>

  <link rel="icon" type="image/png" sizes="32x32" href="https://static.econtents/_img/onnuri/favicon.png">

  <!-- CSS Files -->
  <link rel="stylesheet" href="https://static.econtents.co.kr/_asset/_lib/bootstrap-datepicker-master/dist/css/bootstrap-datepicker.css" type="text/css"/>
  <link rel="stylesheet" href="https://static.econtents.co.kr/_asset/_lib/color_admin/bootstrap-timepicker/css/bootstrap-timepicker.min.css" type="text/css"/>
  <link rel="stylesheet" href="https://static.econtents.co.kr/_asset/_lib/color_admin/abpetkov-powerange/dist/powerange.min.css" type="text/css"/>
  <link rel="stylesheet" href="https://static.econtents.co.kr/_asset/_lib/color_admin/dropzone/dist/min/dropzone.min.css" type="text/css"/>
  <link rel="stylesheet" href="/assets/css/vendor.min.css" type="text/css"/>
  <link rel="stylesheet" href="/assets/css/default/app.min.css" type="text/css"/>
  <link rel="stylesheet" href="/assets/css/admin/common.css" type="text/css"/>
  <link rel="stylesheet" href="/assets/css/admin/style.css" type="text/css"/>
  <link rel="stylesheet" href="/assets/css/jquery.datetimepicker.min.css" type="text/css"/>
  <script src="https://static.econtents.co.kr/_asset/_lib/jquery-3.2.1.min.js"></script>
  <script src="/assets/js/ND.function.js"></script>
  <script src="/assets/js/plugins/smartEditor/js/HuskyEZCreator.js" charset="utf-8"></script>
</head>

<body class="pace-top theme-green {{ $class ?? '' }}">
@guest
  @yield('content')
@endguest

@auth
  @if (in_array(request()->route()->getName(), ['sign-in-static', 'sign-up-static', 'login', 'register', 'recover-password', 'rtl', 'virtual-reality']))
    @yield('content')
  @else
    @if (!in_array(request()->route()->getName(), ['profile', 'profile-static']))
      <div class="min-height-300 bg-primary position-absolute w-100"></div>
    @elseif (in_array(request()->route()->getName(), ['profile-static', 'profile']))
      <div class="position-absolute w-100 min-height-300 top-0" style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg'); background-position-y: 50%;">
        <span class="mask bg-primary opacity-6"></span>
      </div>
    @endif

    <div id="app" class="app app-header-fixed app-sidebar-fixed">
      @include('management.navbars.topnav')
      @include('management.navbars.sidenav')
      <div id="content" class="app-content">
        <header class="top-header">

        </header>
        @yield('content')
      </div>
    </div>
  @endif
@endauth

<!-- ================== BEGIN core-js ================== -->
<script src="https://static.econtents.co.kr/_asset/_lib/ckeditor5-39.0.1/build/ckeditor.js"></script>
<script src="/assets/js/UploadAdapter.js"></script>
<script src="/assets/js/vendor.min.js"></script>
<script src="/assets/js/admin/app.min.js"></script>
<script src="/assets/js/admin/common.js"></script>
<script src="/assets/js/jquery.datetimepicker.full.min.js"></script>
<!-- ================== END core-js ================== -->

<!-- ================== BEGIN page-js ================== -->
<script src="https://static.econtents.co.kr/_asset/_lib/moment.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/bootstrap-datepicker-master/dist/js/bootstrap-datepicker.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/bootstrap-datepicker-master/dist/locales/bootstrap-datepicker.ko.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/parsleyjs/dist/parsley.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/abpetkov-powerange/dist/powerange.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/clipboard/dist/clipboard.min.js"></script>
<script src="https://static.econtents.co.kr/_asset/_lib/color_admin/dropzone/dist/min/dropzone.min.js"></script>
<!-- ================== END page-js ================== -->
@stack('js')
</body>

</html>
