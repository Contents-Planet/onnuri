<!DOCTYPE html>
<html lang="ko">
<head>

  <meta charset="UTF-8">
  <title>온누리상품권</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
  <meta name="description" content="이제 온라인몰 '온누리시장'에서도 온누리상품권으로 결제하세요!"/>
  <meta name="keywords" content="KT, 온누리, 온누리상품권, 온라인결제, 온누리몰, 전통시장, 온누리결제, 온누리이벤트, 온누리온라인결제, 온누리인터넷, 온누리상품권앱, 온누리결제"/>
  <meta property='og:site_name' content='온누리상품권'/>
  <meta property="og:title" content="온누리상품권"/>
  <meta property="og:description" content="이제 온라인몰 '온누리시장'에서도 온누리상품권으로 결제하세요!"/>
  <meta property="og:url" content=""/>
  <meta property="og:type" content="article"/>

  <meta property="og:type" content="article"/>

  @if (Request::path() == "how")
  <meta property="og:image" content="https://static.econtents.co.kr/_img/onnuri/og_img.web">
  @else
  <meta property="og:image" content="https://static.econtents.co.kr/_img/onnuri/og_img.jpg">
  @endif
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="315">

  <link rel="icon" type="image/png" sizes="32x32" href="https://static.econtents.co.kr/_img/onnuri/favicon_v2.png"/>

  <!-- CSS Files -->
  <link rel="stylesheet" href="/assets/css/common.min.css?v=20230921" type="text/css"/>
  <link rel="stylesheet" href="/assets/css/style.min.css?v=20230921" type="text/css"/>

  <script src="//static.econtents.co.kr/_asset/_lib/jquery-3.2.1.min.js"></script>
  <script src="//static.econtents.co.kr/_asset/_lib/cssua.min.js"></script>
  <script src="//static.econtents.co.kr/_asset/_lib/jquery-images-loaded.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.6.0/clipboard.min.js"></script>

  <script src="/assets/js/ND.function.js"></script>
  <script src="/assets/js/page.common.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=45b3ea22ee1b2c199d03c9d267c85487&libraries=services,clusterer,drawing"></script>


  <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
  <script type="text/javascript">
    if(!wcs_add) var wcs_add = {};
    wcs_add["wa"] = "1ef6a96e2915730";
    if(window.wcs) {
      wcs_do();
    }
  </script>
</head>

<body>
@yield('content')

@stack('js')
</body>

</html>
