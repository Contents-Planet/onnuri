@extends('layouts.app')
@section('content')
<div id="sticky-line"></div>
<div id="wrap" class="page-how">
  <div id="container">
    <div id="contents">
      <section class="sec1">
        <figure>
          <img src="https://static.econtents.co.kr/_img/onnuri/how1.webp" alt=""/>
          <figcaption class="a11y">
            이제 온라인에서 온누리상품권으로 결제하세요!
            온누리상품권
          </figcaption>
        </figure>

        <a href="" target="_blank" title="새창열림" class="btn" data-selector="floating">
          <img src="https://static.econtents.co.kr/_img/onnuri/float_link.webp" alt="온라인몰 바로가기"/>
        </a>
        <div class="dott" data-selector="secBase"></div>
      </section>
      <section class="sec2">
        <figure>
          <img src="https://static.econtents.co.kr/_img/onnuri/how2_3.webp" alt=""/>
          <figcaption class="a11y">
            사용 방법
            01 각 제휴 온라인몰 접속
            02 로그인/회원가입
            03 결제 수단으로 카드형 온누리상품권, 카드 충전형 온누리상품권 등 선택
            ※ 일부 온라인몰은 결제수단을 선택할 필요가 없습니다.
            04 APP에서 등록한 카드로 결제
          </figcaption>
        </figure>
      </section>
      <section class="sec3">
        <figure>
          <img src="https://static.econtents.co.kr/_img/onnuri/how3.webp" alt=""/>
          <figcaption class="a11y">
            꼭 유의할 내용
            온누리상품권 앱에 등록한 카드로 결제!
            다른 결제 방식 혹은 충전 금액이 부족할 경우 일반 카드로 결제 처리!
            상품의 상태 문의, 결제 취소, 배송 등은 해당 몰로 문의!
          </figcaption>
        </figure>
      </section>
      <section class="sec4">
        <figure>
          <img src="https://static.econtents.co.kr/_img/onnuri/how4.webp" alt=""/>
          <figcaption class="a11y">온라인몰 GO! GO!</figcaption>
        </figure>
        <ul class="mall-flex flex">
          <li>
            <a href="https://www.onnuri-sijang.com/onnuri/main" class="btn-item" target="_blank">
              <img src="https://static.econtents.co.kr/_img/onnuri/mall_1.webp" alt="온누리 전통시장"/>
            </a>
          </li>
          <li>
            <a href="https://onnurishop.co.kr/" class="btn-item" target="_blank">
              <img src="https://static.econtents.co.kr/_img/onnuri/mall_2.webp" alt="온누리쇼핑"/>
            </a>
          </li>
          <li>
            <a href="https://www.onnuri-mall.co.kr/" class="btn-item" target="_blank">
              <img src="https://static.econtents.co.kr/_img/onnuri/mall_3.webp" alt="온누리시장"/>
            </a>
          </li>
        </ul>
      </section>
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
              <li>상품의 상태 문의, 결제 취소, 배송 등은 해당 몰로 문의하시기 바랍니다.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</div>
@endsection
@push("js")
<script>
  $(function () {
    Page.Init();
  })

  var Page = {
    Floating: function () {
      $('#container').imagesLoaded(
        function () {
          var $btn = $("[data-selector=floating]"),
            $sec4 = $(".sec4"),
            $secDot = $("[data-selector=secBase]"),
            btnHeight = $btn.outerHeight(),
            btnTop = Math.ceil($btn.offset().top + btnHeight),
            base = $("#sticky-line").offset().top + $(window).height(),
            sec4Top = $sec4.offset().top;
            dotTop = $secDot.offset().top;

          if (btnTop <= base - 20) {
            $btn.addClass("_sticky");
          }

          if (dotTop > base - 20) {
            $btn.removeClass("_sticky");
          }

          if (btnTop >= sec4Top - 20) {
            $btn.addClass("_hold");
          } else {
            $btn.removeClass("_hold");
          }
        }
      );
    },

    Bind: function () {
      $(window).scroll(function () {
        Page.Floating();
      })
    },

    Init: function () {
      Page.Bind();
      Page.Floating();
    }
  }
</script>
@endpush



