$(function () {
	ND.INIT();
})

/******************************
 * 카카오톡 쉐어
 ******************************/
function sendLinkCustom(id, img) {
	Kakao.init("a4fec6d4615a2d5409e145eb523b40cf");
	Kakao.Link.sendCustom({
		templateId: [60738]
	});
}

try {
	Kakao.init('a4fec6d4615a2d5409e145eb523b40cf')
	function sendLinkDefault(formData) {
		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: formData.title,
				description: formData.description,
				imageUrl: formData.imageUrl,
				link: {
					mobileWebUrl: formData.link,
					webUrl: formData.link,
				},
			},
			social: {},
			buttons: [
				{
					title: formData.buttons,
					link: {
						mobileWebUrl: formData.buttonsLink,
						webUrl: formData.buttonsLink,
					},
				}
			],
		})
	}
	; window.kakaoDemoCallback && window.kakaoDemoCallback() }
catch(e) { window.kakaoDemoException && window.kakaoDemoException(e) }

var KakaoShare = {
	Send : function(formData){
		var description = formData.description,
			imageUrl = formData.imageUrl,
			btn = formData.btn,
			link = formData.buttonsLink ? formData.buttonsLink : encodeURIComponent($('meta[property="og:url"]').attr('content')),
			title = formData.title ? formData.title : $('meta[property="og:title"]').attr('content'),
			btnlink = link;

		var formData = {
			title : title,
			description : description,
			imageUrl : imageUrl,
			link : link,
			buttons : btn,
			buttonsLink : btnlink
		}

		sendLinkDefault(formData)
	},

	Bind : function(){
		$("[data-action=kakaoShare]").unbind("click");
		$(document).on("click", "[data-action=kakaoShare]", function() {
			KakaoShare.Send();
		})
	}
}

var ND = $;

/******************************
 * 슬라이드
 ******************************/
ND.SLIDE = {

	// slick slide
	slick: function (idx, option) {
		option = $.extend({
			dots: true,
			infinite: true,
			speed: 300,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			accessibility: true,
			autoplay: true,
			touchThreshold: 20,
			autoplaySpeed: 2000,
			pauseOnHover: false,
			adaptiveHeight: true
		}, option || {});


		var $slideWrap = idx.find("[data-action=slide]");
		var Slide = $slideWrap.slick(option);

		var bind = function () {
			if (option.autoplay) {
				// 멈춤 클릭시
				idx.find('.slick-pause').unbind("click").on('click', function () {
					if ($slideWrap.hasClass("paused")) {
						//console.log("플레이버튼");
						$slideWrap.slick('slickPlay');
						$slideWrap.removeClass("paused");
						$(this).removeClass("paused");
						$(this).attr("title", "자동재생 멈춤");
					} else {
						//console.log("멈춤버튼");
						$slideWrap.slick('slickPause');
						$slideWrap.addClass("paused");
						$(this).addClass("paused");
						$(this).attr("title", "자동재생 시작");
					}
				});

				idx.find('.slick-pause').unbind("keypress").on('keypress', '.slick-pause', function () {
					if (event.keyCode == 13) {
						var $slideWrap = $(this).parents("[data-action=slide]");

						if ($slideWrap.hasClass("paused")) {
							//console.log("플레이버튼");
							$slideWrap.slick('slickPlay');
							$slideWrap.removeClass("paused");
							$(this).removeClass("paused");
							$(this).attr("title", "자동재생 멈춤");
						} else {
							//console.log("멈춤버튼");
							$slideWrap.slick('slickPause');
							$slideWrap.addClass("paused");
							$(this).addClass("paused");
							$(this).attr("title", "자동재생 시작");
						}
					}
				});

				// 버튼 focus 시
				idx.find(".slick-slider button").unbind("focus").on("focus", function () {
					$slideWrap.slick('slickPause');
				});

				// 버튼 blur 시
				idx.find(".slick-slider button").unbind("blur").on("blur", function () {
					var $pauseBtn1 = $(this).parents("[data-action=slide]").find('.slick-pause');
					if ($pauseBtn1.hasClass('paused')) { //정지버튼이 클릭되어있을때
						$slideWrap.slick('slickPause');
					} else {
						$slideWrap.slick('slickPlay');
					}
				});

				// a focus 시
				idx.find(".slick-slider a").unbind("focus").on("focus", function () {
					$slideWrap.slick('slickPause');
				});

				// a blur 시
				idx.find(".slick-slider a").unbind("blur").on("blur", function () {
					var $pauseBtn1 = $(this).parents("[data-action=slide]").find('.slick-pause');
					if ($pauseBtn1.hasClass('paused')) {
						$slideWrap.slick('slickPause');
					} else {
						$slideWrap.slick('slickPlay');
					}
				});

				// 마우스 hover 시
				idx.find(".slick-slider").unbind("mouseenter").on("mouseenter", function () {
					$slideWrap.slick('slickPause');
				});

				// 마우스 leave 시
				idx.find(".slick-slider").unbind("mouseleave").on("mouseleave", function () {
					//console.log("play");
					var $pauseBtn1 = $(this).find('.slick-pause');
					if ($pauseBtn1.hasClass('paused')) { //정지버튼이 클릭되어있을때
						$slideWrap.slick('slickPause');
					} else {
						$slideWrap.slick('slickPlay');
					}
				});
			} else {
				// 마우스 leave 시
				idx.find(".slick-slider").unbind("mouseleave").on("mouseleave", function () {
					$slideWrap.slick('slickPause');
				});

				idx.find(".slick-slide").unbind("blur").on("blur", function () {
					$slideWrap.slick('slickPause');
				});
			}
		}
		bind();

		return Slide;
	}
}

/******************************
 * common function
 ******************************/
ND.FN = {

	/********************************
	 * drop-box
	 ********************************/
	dropBox: function (sid) {
		/*일반적인 dropbox*/
		$("[data-action=drop]").unbind("click");
		$(document).on("click", "[data-action=drop]", function () {

			var $dropBox = $(this).closest("[data-selector=dropContainer]"),
				$allDdrop = $(this).closest("[data-selector=allDdrop]");

			if ($dropBox.hasClass("_open")) {
				$dropBox.removeClass("_open");
			} else {
				$dropBox.addClass("_open");

				if($allDdrop) {
					$dropBox.siblings().removeClass("_open");
				}
				/*select dropbox*/
				$dropBox.find("[data-action=value]").unbind("click").on("click", function () {

					var value = $(this).attr("data-value");

					$(this).addClass("_active");
					$(this).siblings().removeClass("_active");
					$dropBox.find(".drop-btn").text(value);
					$dropBox.removeClass("_open");
				})
			}
		})
	},

	/********************************
	 * tab controll
	 ********************************/
	tabControll: function () {

		var bind = function () {
			$("[data-action=tab]").unbind("click");
			$(document).on("click", "[data-action=tab]", function () {
				var $tab = $(this).closest("[data-selector=tabContainer]"),
					sid = $(this).attr("data-sid");
				
				$tab.find("[data-action=tab]").removeClass("_active").attr("title", "");
				$(this).addClass("_active").attr("title", "선택됨");

				$tab.find("[data-selector=tabContent]").removeClass("_active");
				$tab.find("[data-selector=tabContent][data-sid=" + sid + "]").addClass("_active");
			})

			/* 최초실행시 */
			$("[data-selector=tabContainer]").find("[data-action=tab]").eq(0).click();
		}

		bind();
	},

	/********************************
	 * 스크롤바
	 ********************************/
	overflow: function (sid, option, destroy) {
		if (!sid) sid = $(document);
		if (destroy) {
			$(sid).find("[data-action=scroll]").mCustomScrollbar("destroy");
		} else {
			var option = $.extend({
				axis: "y",
				theme: "minimal",
				scrollButtons: false
			}, option || {});
			$(sid).find("[data-action=scroll]").mCustomScrollbar({
				axis: option.axis,
				theme: option.theme,
				scrollButtons: {enable: option.scrollButtons}
			});
		}
	},

	/********************************
	 * 그룹별 가장높은  height 값으로 resize
	 ********************************/
	boxSize: function() {
		var resize = function() {
			var cols = document.querySelectorAll('[data-col]'),
				encountered = []
			for (i = 0; i < cols.length; i++) {
				var attr = cols[i].getAttribute('data-col')
				if (encountered.indexOf(attr) == -1) {
					encountered.push(attr)
				}
			}
			for (set = 0; set < encountered.length; set++) {
				var col = document.querySelectorAll('[data-col="' + encountered[set] + '"]'),
					group = []
				for (i = 0; i < col.length; i++) {
					col[i].style.height = 'auto'
					group.push(col[i].scrollHeight)
				}
				for (i = 0; i < col.length; i++) {
					col[i].style.height = Math.max.apply(Math, group) + 'px'
				}
			}
		}

		resize();
		$(window).resize(function() {
			resize();
		})
	},

	/********************************
	 * sns 공유버튼
	 ********************************/
	shareSNS: function (sid, url) {

		var link = url ? encodeURIComponent(url) : encodeURIComponent($('meta[property="og:url"]').attr('content')),
			title = encodeURIComponent($('meta[property="og:title"]').attr('content'));

		// 페이스북
		var facebook = function () {

			var pWidth = 640,
				pHeight = 380,
				pLeft = (screen.width - pWidth) / 2,
				pTop = (screen.height - pHeight) / 2,
				url = 'http://www.facebook.com/share.php?u=' + link;

			window.open(url, '', 'width=' + pWidth + ',height=' + pHeight + ',left=' + pLeft + ',top=' + pTop + ',location=no,menubar=no,status=no,scrollbars=no,resizable=no,titlebar=no,toolbar=no');
		}

		// 카카오스토리
		var kakao = function () {
			var url = 'https://story.kakao.com/share?url=' + link;
			window.open(url);
		}

		// 네이버 블로그
		var blog = function () {
			var url = 'http://blog.naver.com/openapi/share?url=' + link + '&title=' + title;
			window.open(url);
		}

		switch (sid) {
			case "facebook":
				facebook();
				break;
			case "kakao":
				kakao();
				break;
			case "blog":
				blog();
				break;
		}
	},

	/********************************
	 * 스크롤 on / off
	 ********************************/
	noScroll: function (status) {
		if (status === "on") {
			$("body").addClass("noscroll");
			$("body").bind('touchmove', function (e) {
				e.preventDefault()
			});
		} else {
			$("body").removeClass("noscroll");
			$("body").unbind('touchmove');
		}
	},

	/*frame 체크*/
	ResizeFrame: function () {
		var w_window = $(window).width();

		if (w_window < 768) {
			$("body").addClass("_frame-mobile");
			//$("body").addClass("_mobile");
			$("body").removeClass("_frame-pc");
		} else {
			$("body").removeClass("_frame-mobile");
			//$("body").removeClass("_mobile");
			$("body").addClass("_frame-pc");
		}
	},

	Bind : function(){
		$(window).resize(function(){
			ND.FN.ResizeFrame();
		})
	},

	Init : function(){
		ND.FN.Bind();
		ND.FN.ResizeFrame();
		ND.FN.tabControll();
		ND.FN.dropBox();
	}
}

/******************************
 * return
 * @param {string} taget
 * @return
 ******************************/
ND.RETURN = {

	// get paramName
	param: function (target) {
		var _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
		if (_tempUrl) {
			var _tempArray = _tempUrl.split('&'); // '&'을 기준으로 분리하기
			for (var i = 0; i < _tempArray.length; i++) {
				var _keyValuePair = _tempArray[i].split('='); // '=' 을 기준으로 분리하기

				if (_keyValuePair[0] == target) { // _keyValuePair[0] : 파라미터 명
					// _keyValuePair[1] : 파라미터 값
					return _keyValuePair[1];
				}
			}
		}
	},

	Left: function (Str, Num) {
		if (Num <= 0)
			return "";
		else if (Num > String(Str).length)
			return Str;
		else
			return String(Str).substring(0, Num);
	},

	Right: function (Str, Num) {
		if (Num <= 0)
			return "";
		else if (Num > String(Str).length)
			return Str;
		else {
			var iLen = String(Str).length;
			return String(Str).substring(iLen, iLen - Num);
		}
	},

	Comma: function (num) {
		var len, point, str;

		num = num + "";
		point = num.length % 3;
		len = num.length;

		str = num.substring(0, point);
		while (point < len) {
			if (str != "") str += ",";
			str += num.substring(point, point + 3);
			point += 3;
		}

		return str;
	},

	GetEndDate : function (startDate, month) {
		var strtYear, strtMonth, strtDay;
		strtYear = startDate.substring(0, 4);
		strtMonth = startDate.substring(5, 7);
		strtDay = startDate.substring(8, 10);

		// 6개월후 날짜 구하기 (함께쿠클 개인정보 이용기간 자동계산)
		var endDate = new Date(strtYear, strtMonth - 1, strtDay), // 월은 0부터 시작
			endMonth = endDate.getMonth() + month,
			endDay = endDate.getDate() - 1;
		endDate = new Date(strtYear, endMonth, endDay);

		/* date format s*/
		String.prototype.string = function (len) {
			var s = '', i = 0;
			while (i++ < len) {
				s += this;
			}
			return s;
		};

		String.prototype.zf = function (len) {
			return "0".string(len - this.length) + this;
		};

		Number.prototype.zf = function (len) {
			return this.toString().zf(len);
		};

		Date.prototype.format = function (f) {
			if (!this.valueOf()) return " ";

			var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
			var d = this;
			return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {

				switch ($1) {
					case "yyyy":
						return d.getFullYear();
					case "yy":
						return (d.getFullYear() % 1000).zf(2);
					case "MM":
						return (d.getMonth() + 1).zf(2);
					case "dd":
						return d.getDate().zf(2);
					case "E":
						return weekName[d.getDay()];
					case "HH":
						return d.getHours().zf(2);
					case "hh":
						return ((h = d.getHours() % 12) ? h : 12).zf(2);
					case "mm":
						return d.getMinutes().zf(2);
					case "ss":
						return d.getSeconds().zf(2);
					case "a/p":
						return d.getHours() < 12 ? "오전" : "오후";
					default:
						return $1;
				}
			});
		};
		return endDate.format("yyyy-MM-dd");
	},

	XxssFilter : function(obj) {
		var cnt = 0;
		for(var idx in obj){
			if(typeof obj[idx] === "object"){
				for(var key in obj[idx]){
					if(!excObj.test(key)){
						var temp = obj[idx][key];
						temp = temp.replace(/</g, "&lt;").replace(/>/g, "&gt;");
						obj[idx][key] = temp;
					}
				}
			} else if (typeof obj[idx] === "string"){
				var temp = obj[idx];
				temp = temp.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				obj[idx] = temp;
			}
	
		}
		return obj;
	}
}

/*******************
 *  popup
 *******************/
ND.POP = {
	open: function (popData) {
		popData = $.extend({
			type: "append",      //popup 형태 : append / load
			html: "",            //popup content append / load 일경우 content
			class: "",          //popup content selector : class
			header: true,       //popup header 유무
			headerTit: "알림",   //popup header 타이틀
			close: true,        //popup 닫기 유무
			dim: "",          //popup dim color
			dimClick: false,      //popup dim 클릭시 팝업닫기
			double: false,      // 중복팝업
			full: false      // 전체창 팝업
		}, popData || {});

		if (!popData.double) {
			ND.POP.close();
		}

		var clickClose = popData.dimClick ? 'onclick="ND.POP.close();"' : "";

		var popOuter = '';
		popOuter += ' <div class="layer" data-sid="layer">';
		popOuter += '   <div class="pop-container ' + popData.class + ' '+ (popData.full ? '_full' : '') +'">';
		popOuter += '     <div class="pop-content">';
		if (popData.header) {
			popOuter += '       <header class="pop-header">';
			popOuter += '         <div class="header-wrap">';
			popOuter += '           <h2 class="pop-tit">' + popData.headerTit + '</h2>';
			if (popData.close) {
				popOuter += '         <a href="javascript:void(0);" class="pop-close" data-action="popClose"><span class="a11y">팝업닫기</span></a>';
			}
			popOuter += '         </div>';
			popOuter += '       </header>';
		}
		popOuter += '       <div class="pop-inner" data-action="popAppend"></div>';
		if (!popData.header && popData.close) {
			popOuter += '       <a href="javascript:void(0);" class="pop-close" data-action="popClose"><span class="a11y">팝업닫기</span></a>';
		}
		if (popData.foot) {
			popOuter += '       <div class="pop-foot">'+ popData.foot +'</div>';
		}
		popOuter += '     </div>';
		popOuter += '   </div>';
		if (popData.dim) {
			popOuter += '   <div class="dim ' + popData.dim + '" ' + clickClose + '></div>';
		}
		popOuter += ' </div>';

		$("body").append(popOuter);
		var $popContent = $('.' + popData.class).find("[data-action=popAppend]");
		if (popData.type === "append") {
			$popContent.append(popData.html);

			//ND.FN.noScroll("on");
			//PopResize.Init();
			//Form.Datepicker();
			setTimeout(function(){
				$("[data-sid=layer]").addClass("_active");
			}, 1);
		} else if (popData.type === "load") {
			$popContent.load(popData.html, function(){
				//ND.FN.noScroll("on");
				PopResize.Init();
				//Form.Datepicker();

				setTimeout(function(){
					$("[data-sid=layer]").addClass("_active");
				}, 1);
			});
		}

		ND.FN.noScroll('on');
		ND.POP.Bind();
	},

	close: function (e) {
		if (e) {
			var $pop = e.closest("[data-sid=layer]");
			$pop.remove();
		} else {
			$("[data-sid=layer]").remove();
		}
		ND.FN.noScroll("off");
	},

	PopAccess : function (id, recv_id) {
		$(".pop-content a:not(.disable), .pop-content button:not(.disable), .pop-content input:not(:disabled, :hidden), .pop-content textarea:not(:disabled), .pop-content .tabindex").addClass("_focusTab");

		var tabfocus = 0;
		$(".pop-content ._focusTab").each(function (i) {
			tabfocus = i;
			//$(".popCon.active ._focusTab").eq(i).append(i);
		})

		setTimeout(function(){ $(".pop-content").find("._focusTab").eq(0).focus() }, 100);


		// 팝업 마지막focus에서 탭클릭시 처음으로
		$(".pop-content ._focusTab").eq(tabfocus).on("keydown", function (event) {
			if (event.keyCode == 9) {
				$(".pop-content").attr("tabindex", "0");
				$(".pop-content").focus();
				$(".pop-content").attr("tabindex", "");
			}
		});
		// 팝업 마지막focus에서 쉬프트탭클릭시 이전으로
		$(".pop-content ._focusTab").eq(tabfocus).on("keydown", function (event) {
			if (event.keyCode == 9 && event.shiftKey) {
				$(".pop-content ._focusTab").eq(tabfocus).focus();
			}
		});
		// 팝업 처음focus에서 쉬프트탭클릭시 마지막으로
		$(".pop-content ._focusTab").eq(0).on("keydown", function (event) {
			if (event.keyCode == 9 && event.shiftKey) {
				$(".pop-content").append('<a href="javascript:;" id="templink"></a>');
				$("#templink").focus();
				$("#templink").remove();
			}
		});
		$(".pop-content ._focusTab").eq(0).find("a").on("keydown", function (event) {
			if (event.keyCode == 9 && event.shiftKey) {
				$(".pop-content ._focusTab").eq(0).focus();
			}
		});
	},

	Bind : function(){
		$("[data-action=popClose]").unbind("click");
		$(document).on("click", "[data-action=popClose]", function(){
			ND.POP.close($(this));
		})
	}
}

/*******************
 *  Cookie
 *******************/
ND.COOKIE = {
	//쿠키값가져오기
	set: function (name, value, expiredays) {
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	},
	get: function (cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
}

ND.Access = {
	AreaHover : function(e, status){
		var map = e.attr("data-hover"),
			img = e.attr("data-hover-img"),
			oimg = e.attr("data-img"),
			$mapImg = $("[data-map="+ map +"]");

		if(status !== "off") {
			if(map && img) {
				$mapImg.attr("src", img);
			}
		} else {
			$mapImg.attr("src", oimg);
		}
	},

	Bind : function(){
		$("area").unbind("mouseenter");
		$(document).on("mouseenter", "area", function(){
			ND.Access.AreaHover($(this));
		})
		$("area").unbind("focus");
		$(document).on("focus", "area", function(){
			ND.Access.AreaHover($(this));
		})
		$("area").unbind("mouseleave");
		$(document).on("mouseleave", "area", function(){
			ND.Access.AreaHover($(this), "off");
		})
		$("area").unbind("blur");
		$(document).on("blur", "area", function(){
			ND.Access.AreaHover($(this), "off");
		})
	},

	Init : function(){
		ND.Access.Bind();
	}
}

/*********************
 * 우편번호 검색
 *********************/
function searchZipcode() {

	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
			// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 도로명 조합형 주소 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if(data.buildingName !== '' && data.apartment === 'Y'){
				extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}

			// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if(extraRoadAddr !== ''){
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}

			// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
			if(fullRoadAddr !== ''){
				fullRoadAddr += extraRoadAddr;
			}
			// 지번 주소 선택 시 미지원 알럿창 열림.
			if(data.userSelectedType == 'J'){
				/*20180601 아이폰 이슈로 제거*/
				//alert('지번 주소는 지원하지 않습니다.\n도로명 주소로 자동 입력 됩니다.');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('appl_zipcode').value = data.zonecode;				 //5자리 새우편번호 사용(도로명 우편번호)
			document.getElementById('appl_address1').value = fullRoadAddr;
			document.getElementById('appl_jzipcode').value = data.postcode.replace("-", ""); //6자리 우편번호 사용(지번 우편번호)
			document.getElementById('appl_jaddress1').value = data.jibunAddress;

			// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
			if(data.autoRoadAddress) {
				//예상되는 도로명 주소에 조합형 주소를 추가한다.
				var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
				document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
				$("#appl_address1").val(expRoadAddr);

			} else if(data.autoJibunAddress) {
				var expJibunAddr = data.autoJibunAddress;
				document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
				$("#appl_jaddress1").val(expJibunAddr);
			} else {
				document.getElementById('guide').innerHTML = '';
			}
		}
	}).open();
}

ND.Address = {
	Zip : function(e) {
		new daum.Postcode({
			oncomplete: function(data) {
				var $wrap = e.closest("[data-selector=addContainer]");

				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

				// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
				var extraRoadAddr = ''; // 도로명 조합형 주소 변수

				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
					extraRoadAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if(data.buildingName !== '' && data.apartment === 'Y'){
					extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if(extraRoadAddr !== ''){
					extraRoadAddr = ' (' + extraRoadAddr + ')';
				}
				// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
				if(fullRoadAddr !== ''){
					fullRoadAddr += extraRoadAddr;
				}
				// 지번 주소 선택 시 미지원 알럿창 열림.
				if(data.userSelectedType == 'J'){
					/*20180601 아이폰 이슈로 제거*/
					//alert('지번 주소는 지원하지 않습니다.\n도로명 주소로 자동 입력 됩니다.');
				}

				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				$wrap.find("[data-selector=zip]").val(data.zonecode);				 //5자리 새우편번호 사용(도로명 우편번호)
				$wrap.find("[data-selector=add1]").val(data.roadAddress);

				/*$wrap.find("[data-selector=zip]").val(data.postcode.replace("-", ""))
        $wrap.find("[data-selector=add1]").val(data.jibunAddress);*/

				/*// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if(data.autoRoadAddress) {
          //예상되는 도로명 주소에 조합형 주소를 추가한다.
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
          $("#appl_address1").val(expRoadAddr);

        } else if(data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
          $("#appl_jaddress1").val(expJibunAddr);

        } else {
          document.getElementById('guide').innerHTML = '';
        }*/
			}
		}).open();
	},

	Bind : function() {
		$("[data-action=findZip]").unbind("click");
		$(document).on("click", "[data-action=findZip]", function(){
			ND.Address.Zip($(this));
		})
	},

	Init : function(){
		ND.Address.Bind();
	}
}

ND.Form = {
	Validate : function(form){
		$(form).find("input, select, textarea").removeClass("_input");
		$(form).find("input, select, textarea").addClass("_input");
		var $input = $(form).find("._input"),
			exit = "false";

		$.each($input, function(index,row){
			if ($(row).attr('data-validate') === "req" && !$(row).val()) {
				var placeholder = $(row).attr('placeholder');
				alert(placeholder);
				$(row).focus();
				exit = "true";
				return false;
			}

			if ($(row).attr("data-url") === "true" && $(row).val()) {
				if ($(row).val().toLowerCase().indexOf("http://") == -1 && $(row).val().toLowerCase().indexOf("https://") == -1) {
					alert("http:// 또는 https:// 로 시작되는 URL을 입력해주세요.");
					$(row).focus();
					exit = "true";
					return false;
				}
			}

			if ($(row).attr("data-reg") && $(row).val()) {
				if(!ND.Form.Reg($(row), $(row).attr("data-reg"))) {
					exit = "true";
					return false;
				}
			}
		})

		if(exit === "true"){
			return false;
		} else {
			return true;
		}
	},

	Reg : function(input, type) {
		var text = input.val(),
			Return = true,
			reg = '',
			msg = '';

		switch (type){
			case "tel" :
				reg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
				msg = "올바른 핸드폰 번호를 입력해 주세요."
				break;
			case "email" :
				var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
				msg = "올바른 이메일 주소를 입력해 주세요."
				break;
			case "name" :
				var reg = /^[가-힣]{2,15}$/;//이름유효성검사정규식
				msg = "올바른 이름을 입력해 주세요."
				break;
		}

		if (!reg.test(text)) {
			alert(msg)
			Return = false
		}
		return Return;
	},

	Masking : function(type, text, masking) {
		var result = "";
		switch (type) {
			case 'tel':

				var pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d(\d{3})$/;
				var match = pattern.exec(text);
				if(match) {
					result = match[1]+"-"+match[2]+"**-**"+match[2];
				} else {
					result = "***";
				}

				return result;
				break;
			case 'name':
				if (text.length > 2) {
					var originName = text.split('');
					originName.forEach(function(name, i) {
						if (i === 0 || i === originName.length - 1) return;
						originName[i] = '*';
					});
					var joinName = originName.join();
					return joinName.replace(/,/g, '');
				} else {
					var pattern = /.$/; // 정규식
					return text.replace(pattern, '*');
				}
				break;
			case 'email':
				var emailStr = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
				var strLength;

				strLength = emailStr.toString().split('@')[0].length - 3;
				return text.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*').replace(/.{6}$/, "******");
				break;
			case 'bizNo':
				if (text.length === 10) {
					var formatNum;
					if (masking === 0) {
						formatNum = text.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
					} else {
						formatNum = text.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-*****');
					}
				}
				return formatNum;
				break;
		}
	},
}

ND.Bind = function() {
	$("[numberOnly=true]").unbind("keyup");
	$(document).on("keyup", "[numberOnly=true]", function () {
		$(this).val($(this).val().replace(/[^0-9]/gi, ""));
	})

	$("[data-only=EN]").unbind("keyup");
	$(document).on("keyup", "[data-only=EN]", function () {
		$(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, ""));
	})

	$("[data-only=KR]").unbind("keyup");
	$(document).on("keyup", "[data-only=KR]", function () {
		$(this).val($(this).val().replace(/[a-z]/gi, ""));
	})
}

/******************************
 * init
 ******************************/
ND.INIT = function () {
	ND.Bind();
	ND.FN.Init();
	ND.Access.Init();

	/*var clipboard = new ClipboardJS('[data-action=clipboard]');

	clipboard.on('success', function(e) {
		var label = $(e.trigger).attr("data-label"),
			txt = (label ? label : '링크가') +' 복사되었습니다.'
		alert(txt)
	});*/
}

ND.Calendar = {
	Render : function(){
		// 현재 년월
		var nowYear = ND.RETURN.param("Year"),
			nowMonth = ND.RETURN.param("Month"),
			nowToday = ND.RETURN.param("Day"),
			selDate = nowYear + nowMonth + nowToday;

		var realYear = nowDate.getFullYear(),
			realMonth = ND.RETURN.Right(0 + String(nowDate.getMonth() + 1),2),
			realDay = ND.RETURN.Right(0 + String(nowDate.getDate()),2),
			realToday = realYear + realMonth + realDay;

		if(!nowYear) nowYear = new Date().getFullYear();
		if(!nowMonth) nowMonth = ND.RETURN.Right("0" + (new Date().getMonth() + 1), 2);
		if(!nowToday) nowToday = ND.RETURN.Right("0" + (new Date().getDay() + 1), 2);

		var firstDayWeek = new Date(nowYear +'-'+ nowMonth +'-01').getDay(),        //1일의 요일
			lastDay = new Date( nowYear, nowMonth, 0).getDate(),                    //마지막 날짜
			lastDayWeek = new Date(nowYear +'-'+ nowMonth +'-'+ lastDay).getDay();   //말일요일,

		var header = '';
		header += '<header class="calendar-head">';
		header += '	<div class="head-tit">';
		header += '		<a href="javascript:void(0);" class="_prev" data-action="moveMonth" data-sid="prev"><span class="a11y">이전</span></a>';
		header += '		<h4 class="dec">'+ parseInt(nowMonth) +' 월</h4>';
		header += '		<a href="javascript:void(0);" class="_next" data-action="moveMonth" data-sid="next"><span class="a11y">다음</span></a>';
		header += '	</div>';
		header += '</header>';

		// 금일 몇주차
		var getWeekOfMonth = function(date) {
			var selectedDayOfMonth = new Date(date).getDate();
			return Math.ceil((selectedDayOfMonth + firstDayWeek) / 7);
		}

		var allWeek,                //달력 row
			prevEmpty = "0",         //앞쪽 빈칸
			lastEmpty = "0"          //뒤쪽 빈칸

		prevEmpty = firstDayWeek;                                               //앞쪽 빈칸,
		lastEmpty = 7 - lastDayWeek;                                            //뒤쪽빈칸
		allWeek = Math.ceil((parseInt(lastDay) + parseInt(prevEmpty)) / 7);     //달력 row

		//달력
		var tbody = "";
		for (var i = 0; i < allWeek; i++) {
			tbody += '<tr class="_tr' + i + '">';
			if (i == 0) {
				// 첫번째주

				// 달력 앞쪽 빈칸
				for (var j = 0; j < prevEmpty; j++) {
					tbody += '    <td class="date-td">';
					tbody += '      <div class="date-wrap"><span class="cnt"></span><span class="date-dec"></span></div>';
					tbody += '			<div class="data-wrap" data-selector="dataWrap"></div>';
					tbody += '    </td>';
				}
				// 요일
				for (var j = prevEmpty; j < 7; j++) {
					var date = nowYear + nowMonth + (ND.RETURN.Right("0" + (i * 7 + j - firstDayWeek + 1), 2));
					tbody += '    <td class="date-td _datae-'+ (i * 7 + j - firstDayWeek + 1) +'">';
					tbody += '      <div class="date-wrap"><a href="javascript:void(0)" data-action="selectDate" class="cnt '+ (date === realToday ? '_today' : '' ) +' '+ (date === selDate ? '_selected' : '' ) +'" data-day="'+ date +'">' + (i * 7 + j - firstDayWeek + 1) + '</a><span class="date-dec"></span></div>';
					tbody += '      <div class="data-wrap" data-selector="dataWrap"></div>';
					tbody += '    </td>';
				}
			}
			else if (i == (allWeek-1)) {
				// 마지막주

				// 요일
				for (var j = 0; j < (lastDayWeek+1); j++) {
					var date = nowYear + nowMonth + (ND.RETURN.Right("0" + (i * 7 + j - firstDayWeek + 1), 2));
					tbody += '    <td class="date-td _datae-'+ (i * 7 + j - firstDayWeek + 1) +'">';
					tbody += '      <div class="date-wrap"><a href="javascript:void(0)" data-action="selectDate" class="cnt '+ (date === realToday ? '_today' : '' ) +' '+ (date === selDate ? '_selected' : '') +'" data-day="'+ date +'">' + (i * 7 + j - firstDayWeek + 1) + '</a><span class="date-dec"></span></div>';
					tbody += '      <div class="data-wrap" data-selector="dataWrap"></div>';
					tbody += '    </td>';
				}
				// 달력 뒷쪽 빈칸
				for (var j = 0; j < lastEmpty -1 ; j++) {
					tbody += '    <td class="date-td">';
					tbody += '      <div class="date-wrap"><span class="cnt"></span><span class="date-dec"></span></div>';
					tbody += '      <div class="data-wrap" data-selector="dataWrap"></div>';
					tbody += '    </td>';
				}
			}
			else {
					for (var j = 0; j < 7; j++) {
						var date = nowYear + nowMonth + (ND.RETURN.Right("0" + (i * 7 + j - firstDayWeek + 1), 2));
						tbody += '    <td class="date-td _datae-'+ (i * 7 + j - firstDayWeek + 1) +'">';
						tbody += '      <div class="date-wrap"><a href="javascript:void(0)" data-action="selectDate" class="cnt '+ (date === realToday ? '_today' : '' ) +' '+ (date === selDate ? '_selected' : '') +'" data-day="'+ date +'">' + (i * 7 + j - firstDayWeek + 1) + '</a><span class="date-dec"></span></div>';
						tbody += '      <div class="data-wrap" data-selector="dataWrap"></div>';
						tbody += '    </td>';
					}
				}
			tbody += '</tr>';
		}

		var html = '';
		html += header;
		html += '<table class="tbl">';
		html += '	<caption class="a11y">달력</caption>';
		html += '	<colgroup> <col style="width:15%" /> <col style="width:14%" /> <col style="width:14%" /> <col style="width:14%" /> <col style="width:14%" /> <col style="width:14%" /> <col style="width:15%" /> </colgroup>';
		html += '	<thead>';
		html += '	<tr> <th>SUN</th> <th>MON</th> <th>TUE</th> <th>WED</th> <th>THU</th> <th>FRI</th> <th>SAT</th> </tr>';
		html += '	</thead>';
		html += '	<tbody>';
		html +=			tbody
		html += '	</tbody>';
		html += '</table>	';

		$("[data-selector=dataContainer]").html(html)
	},

	MoveMonth : function(e, paramData){
		var sid = e.attr("data-sid"),
			param = '',
			href = '',
			_nowYear = ND.RETURN.param("Year") ? ND.RETURN.param("Year") : nowYear,
			_nowMonth = ND.RETURN.param("Month") ? ND.RETURN.param("Month") : nowMonth;

		$.each(paramData, function(index, row) {
			param += '&'+ row.dec +'='+ row.param;
		})

		if(sid === "prev") {
			var prevYear = nowYear, prevMonth, prevDay;

			prevMonth = ND.RETURN.Right("0" + (parseInt(_nowMonth) - 1), 2);
			if (prevMonth === "00") {
				prevYear = _nowYear - 1;
				prevMonth = "12"
			}
			href = "?Year="+ prevYear + "&Month="+ prevMonth + param;
		}
		else {
			var nextYear = nowYear, nextMonth, nextDay;

			nextMonth = ND.RETURN.Right("0" + (parseInt(_nowMonth) + 1), 2);
			if (nextMonth === "13") {
				nextYear = parseInt(_nowYear) + 1;
				nextMonth = "01"
			}
			href = "?Year="+ nextYear + "&Month="+ nextMonth + param;
		}
		location.href = href;
	},

	Bind : function(paramData){
		$("[data-action=moveMonth]").unbind("click");
		$(document).on("click", "[data-action=moveMonth]", function(){
			ND.Calendar.MoveMonth($(this), paramData);
		});
	},

	Init : function(paramData) {
		ND.Calendar.Bind(paramData);
		ND.Calendar.Render();
	}
}

var nowDate = new Date(),
	nowYear = nowDate.getFullYear(),
	nowMonth = ND.RETURN.Right(0 + String(nowDate.getMonth() + 1),2),
	nowDay = ND.RETURN.Right(0 + String(nowDate.getDate()),2),
	nowHour = ND.RETURN.Right(0 + String(nowDate.getHours()),2),
	nowMin = ND.RETURN.Right(0 + String(nowDate.getMinutes()),2),
	nowSec = ND.RETURN.Right(0 + String(nowDate.getSeconds()),2),
	nowFulldate = String(nowYear) + String(nowMonth) + String(nowDay),
	nowYMDHMS = nowFulldate + String(nowHour) + String(nowMin) + String(nowSec),
	Fulldatetime = String(nowYear) +'-'+ String(nowMonth) +'-'+ String(nowDay) +' '+ String(nowHour) +':'+ String(nowMin) +':'+ String(nowSec);

