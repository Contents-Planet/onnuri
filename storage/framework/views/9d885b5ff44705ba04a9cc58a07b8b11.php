<?php $__env->startSection('content'); ?>
<div id="sticky-line"></div>
<div id="wrap">
  <div id="container">
    <div id="contents">
      <section>
        <article class="article">
          <figure>
            <img src="https://static.econtents.co.kr/_img/onnuri/con1.webp" alt=""/>
            <figcaption class="a11y"></figcaption>
          </figure>
        </article>
        <article class="article">
          <figure>
            <img src="https://static.econtents.co.kr/_img/onnuri/con2.webp" alt=""/>
            <figcaption class="a11y"></figcaption>
          </figure>
        </article>
      </section>
      <section class="sec2">
        <div class="m-main">
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con3.webp" alt=""/>
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con4.webp" alt=""/>
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con5.webp" alt=""/>
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
          <article class="article">
            <figure>
              <img src="https://static.econtents.co.kr/_img/onnuri/con6.webp" alt=""/>
              <figcaption class="a11y"></figcaption>
            </figure>
          </article>
        </div>
      </section>
      <a href="https://www.onnuri-mall.co.kr/" target="_blank" title="새창열림" class="btn" data-selector="floating">
        <img src="https://static.econtents.co.kr/_img/onnuri/btn.webp" alt="‘온누리시장’ 접속"/>
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
<?php $__env->stopSection(); ?>
<?php $__env->startPush("js"); ?>
<script>
  $(function () {
    Page.Init();
  })

  var Page = {
    Floating: function () {
      $('#container').imagesLoaded(
        function () {
          var $btn = $("[data-selector=floating]"),
            top = $("#sticky-line").offset().top + $(window).height() - $btn.outerHeight(),
            footTop = $("#container").outerHeight();

          if (top <= footTop) {
            $btn.removeClass("_sticky");
          } else {
            $btn.addClass("_sticky");
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
<?php $__env->stopPush(); ?>




<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/happyoley/develop/onnuri/resources/views/main.blade.php ENDPATH**/ ?>