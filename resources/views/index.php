<?php
$http_host = $_SERVER['HTTP_HOST'];
$request_uri = $_SERVER['REQUEST_URI'];
$url = 'https://' . $http_host . $request_uri;
$__nowDate = date('Y-m-d');
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>온누리상품권</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
  <meta name="description" content="이제 온라인몰 '온누리시장'에서도 온누리상품권으로 결제하세요!" />
  <meta name="keywords" content="KT, 온누리, 온누리상품권, 온라인결제, 온누리몰, 전통시장, 온누리결제, 온누리이벤트, 온누리온라인결제, 온누리인터넷, 온누리상품권앱, 온누리결제" />
  <meta property='og:site_name' content='온누리상품권' />
  <meta property="og:title" content="온누리상품권" />
  <meta property="og:description" content="이제 온라인몰 '온누리시장'에서도 온누리상품권으로 결제하세요!" />
  <meta property="og:url" content="<?=$url?>" />
  <meta property="og:type" content="article" />

  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://static.econtents.co.kr/_img/onnuri/og_img.jpg">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="315">

  <link rel="icon" type="image/png" sizes="32x32" href="https://static.econtents.co.kr/_img/onnuri/favicon_v2.png" />

  <link rel="stylesheet" href="/_asset/_css/common.css?v=20230921" type="text/css" />
  <link rel="stylesheet" href="/_asset/_css/style.css?v=20230921" type="text/css" />

  <script src="//static.econtents.co.kr/_asset/_lib/jquery-3.2.1.min.js"></script>
  <script src="//static.econtents.co.kr/_asset/_lib/cssua.min.js"></script>
  <script src="//static.econtents.co.kr/_asset/_lib/jquery-images-loaded.min.js"></script>
</head>
<body>
<div id="sticky-line"></div>
<div id="wrap">
  <div id="container">
    <div id="contents">
      <section>
        <article class="article">
          <figure>
            <img src="https://static.econtents.co.kr/_img/onnuri/con1.webp" alt="" />
            <figcaption class="a11y"></figcaption>
          </figure>
        </article>
        <article class="article">
          <figure>
            <img src="https://static.econtents.co.kr/_img/onnuri/con2.webp" alt="" />
            <figcaption class="a11y"></figcaption>
          </figure>
        </article>
      </section>
      <section class="sec2">
        <div class="m-main">
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con3.webp" alt="" />
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con4.webp" alt="" />
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con5.webp" alt="" />
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con6.webp" alt="" />
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
        </div>
      </section>
      <a href="https://www.onnuri-mall.co.kr/" target="_blank" title="새창열림" class="btn" data-selector="floating">
        <img src="https://static.econtents.co.kr/_img/onnuri/btn.webp" alt="‘온누리시장’ 접속" />
      </a>
    </div>
  </div>
  <footer id="footer">
    <div class="m-main">
      <div class="foot-container">
        <strong class="tit">※ 유의사항</strong>

        <ul class="list-ul">
          <li>
            <ul class="row-ul">
              <li>APP에 등록한 카드로 결제해야 상품권 차감됩니다.</li>
              <li>다른 결제방식 선택 or 충전금 부족 시 일반 결제 처리됩니다.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</div>
<script>
  $(function(){
    Page.Init();
  })

  var Page = {
    Floating:function(){
      $('#container').imagesLoaded(
        function() {
          var $btn = $("[data-selector=floating]"),
            top = $("#sticky-line").offset().top + $(window).height() - $btn.outerHeight(),
            footTop = $("#container").outerHeight();

          if(top <= footTop) {
            $btn.removeClass("_sticky");
          } else {
            $btn.addClass("_sticky");
          }
        }
      );
    },

    Bind:function(){
      $(window).scroll(function(){
        Page.Floating();
      })
    },

    Init:function(){
      Page.Bind();
      Page.Floating();
    }
  }
</script>
</body>
</html>



