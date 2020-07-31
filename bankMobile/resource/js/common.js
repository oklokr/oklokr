"use strict";

//  Content1 Evnet 키패드 이벤트 함수
function padEvnet() {
	const _padBtn = $('.key-pad');
	let _numberInput = $('.numberInput');
	let _subInput = $('.amountText');
	let _backInput = $('.textWrap').find('input');

	_backInput.prop('readonly', 'true');	

	//한칸씩 지우기 이벤트 함수
	const _backClear = function() {
		let _backInput = $('.textWrap').find('input');
		let _numberInput = $('.numberInput');
		let _subInput = $('.amountText');
		
		// backInput 데이터 뒤부터 지우기
		_backInput.val(_backInput.val().slice(0, -1));
		// backInput 값이 1000 이상 일경우 backInput val 값 호출
		_backInput.val() >= 1000 ? _subInput.text(_backInput.val().toString().replace(/\B(?=(\d{4})+(?!\d))/g, "만")).append('원') : _subInput.text("");
		// 화면 표기 금액 뒤부터 삭제
		_numberInput.children().last().removeClass('active')
		setTimeout(function(){
			_backInput.val() <= 0 ?	_numberInput.html("<span>0</span>") : _numberInput.children().last().remove();
		},300)
		// 경고 Class 삭제
		$('.textWrap').removeClass('active');
		// Class 값마다 컨트롤
		_backInput.val() > 0 ? classPluse('active', null) : classPluse(null, 'active');

	}

	// 9자리 확인 함수
	const digit = function(obj) {
		let test = /^\d{7}$/;
		let value = obj.val();
		
		return test.test(obj.val());

	}

	// 클레스 묶음
	function classPluse(add, remove) {
		const _resetBtn = $('.resetBtn');
		const _backClear = $('.backClear');
		const _remittanceBtn = $('.remittanceBtn');

		_resetBtn.addClass(add);
		_backClear.addClass(add);
		_remittanceBtn.addClass(add);

		_resetBtn.removeClass(remove);
		_backClear.removeClass(remove);
		_remittanceBtn.removeClass(remove);
	}

	//키패드 이벤트
	_padBtn.on('click', function(){
		// 키패드 클릭 값
		let _number = $(this).attr("data-num");
		
		// 9 자리 확인 함수 호출, 9자리 아닐 경우 backinput data 값 키패드 입력
		digit(_backInput) ? null : _backInput.val(_backInput.val().replace(/(^0+)/, "") + _number);
		
		// backinput data 1000 이상 시 이벤트 실행
		// backinput data 6000000 이하 만 subinput 에 backinput data 호출 및 한글표기
		if(_backInput.val() >= 1000){
			_backInput.val() > 3000000 ? null : _subInput.text(_backInput.val().toString().replace(/\B(?=(\d{4})(?!\d))/g, "만").replace(/\B(?=(\d{4})(?!\d))/g, "억")).append('원')
		}

		let num = "";
			num += "<span class='number'>"+_number+"</span>"
		
		// 입력하려는 값이 0일경우 입력 제한
		_backInput.val() <= 0 ? _numberInput.html("<span>0</span>").find('span').remove() : null;
		_numberInput.children('span').eq(0).text() == 0 ? _numberInput.children().eq('0').remove() : null;

		// 7자리 넘길경우 입력 제한
		if ( _numberInput.find('span').length == 7 ){
			return
			
		}else {
			_numberInput.append(num);
			setTimeout(function(){
				$('.number').addClass('active');
			},1);
		}

		// 3백만원 이상일 경우 경고 메세지
		if ( _backInput.val() > 3000000 ) {
			$('.textWrap').addClass('active');
			_subInput.text('최대 3백만원 까지 입력할 수 있습니다.');
		}

		// 값 입력시 Evnet호출
		_backInput.val() > 0 ? classPluse('active', null) : classPluse(null, 'active');

		// 한칸씩 지우기 Evnet
		$('.backClear').off('click').on('click', function(){
			_backClear();
		})

	})

	// 300만원 초과시 버튼 클릭 이벤트
	$('.changeBtn').off('click').on('click', function(){
		$('#price').val('3000000');
		_subInput.text(_backInput.val().toString().replace(/\B(?=(\d{4})(?!\d))/g, "만").replace(/\B(?=(\d{4})(?!\d))/g, "억")).append('원')
		_numberInput.find('.span').remove();
		$('.textWrap').removeClass('active');
		_numberInput.html(
			"<span class='number active'>3</span><span class='number active'>0</span><span class='number active'>0</span><span class='number active'>0</span><span class='number active'>0</span><span class='number active'>0</span><span class='number active'>0</span>"
		)
	})

	// 송금 버튼 함수
	function layerPopup() {
		let _layerPopup = $('.layerPopup');

		_layerPopup.addClass("active");
		$('.footer').addClass('active');

		var countValtext = $('#price').val();
	
		// comma 변환 함수
		const numberWithCommas = function(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		// 숫자증가 애니메이션
		$({ val : 0 }).animate({ val : countValtext }, {
		duration: 1500,
			step: function() {
				var num = numberWithCommas(Math.floor(this.val));
				$(".countVal").text(num);
			},
			complete: function() {
				var num = numberWithCommas(Math.floor(this.val));
				$(".countVal").text(num);
			}
		});
		
		// add, remove 묶음
		const addRemoveClass = function(val) {
			let property = val
			if (property == true) {
				
				$('.layerFoot').addClass('active');
				$('.priceWrap').removeClass('active');
				$('.completion').addClass('active');
				$('.footer').removeClass('active');
			}else {
				$('.layerFoot').removeClass('active');
				$('.priceWrap').addClass('active');
				$('.completion').removeClass('active');
				$('.footer').removeClass('active');
			}
		}
		
		// 보내기 btn Evnet
		$('.cancell').off('click').on('click', function(){
			_layerPopup.removeClass("active");
			setTimeout(function(){
				addRemoveClass(false);
			}, 100)
		})

		// 취소 btn Event
		$('.send').off('click').on('click', function(){

			addRemoveClass(true);

			setTimeout(function(){
				_layerPopup.removeClass("active");
			},1500)

			setTimeout(function(){
				addRemoveClass(false);
			}, 2000)
		})
	}

	// 송금 버튼 클릭 Evnet
	$('.remittanceBtn').on('click', function(){

		// backInput value값 3백만원 확인
		if (_backInput.val() > 3000000 ) {
			return

		}else {
			// 송금버튼 클릭 함수 호출
			layerPopup()
		}
	})
	
	// 취소버튼 클릭 Evnet
	$('.resetBtn').off('click').on('click', function(){
		_backInput.val("");
		setTimeout(function(){
			_numberInput.append().html("<span>0</span>");
		},300)
		$('.number').removeClass('active')
		_subInput.text("");
		classPluse(null, 'active');
		$('.textWrap').removeClass('active');
	})
}

// main show Event 함수
function mainCardShow() {
	let num = 0;
	$('.loding').addClass('active');

	setTimeout(function(){
		const addEvent = setInterval(function(){
			num ++;
			$('.mid-area').children().eq(num - 1).addClass('active');
	
			if (num == 6) {
				$('.loding').removeClass('active');
				clearInterval(addEvent);
			}
		}, 100)
	}, 1000)
	
}

//  Main Content2 Event
function contetn2() {
	let setColorBtn = $('.set-color-btn');

	// 로딩, show Evnet 함수 호출
	mainCardShow()

	// 통장 컬러변경 버튼 Event
	setColorBtn.on('click', function(){
		let colorBtn = $('.color-select-wrap').find('button');

		$('.footer').addClass('off');
		$('.set-color-box').addClass('active');

		$(this).parents('.passbook').addClass("set");

		// set-color-wrap Title값 통장 이름값으로 변경
		$('.top-title').find('p').text($(this).prevAll('.passbook-name').text());

		// colorItmeBtn click Evnet
		colorBtn.each(function(){
			$(this).on('click', function(){
				for (let i = 0; i < colorBtn.length + 1; i++) {
					$('.set').removeClass('color-type-'+i+'').addClass( $(this).attr('data-name') );
				}
			})
		})

		// 확인버튼 Envent
		$('.change-btn').on('click', function(){
			$('.set-color-box').removeClass('active');	
			$('.set').removeClass('set');
			$('.footer').removeClass('off');
		})
	})

}

function CreditLevel(element, is_val) {
	// 파라미터 상태값
	let is = is_val;
	
	let scoreValue = Number($(''+element+'').text());		// 파라미터 입력한 text값
	let percentValue = (scoreValue/1000)*100 - 100			// 백분율 계산값
	
	$('.percent').text(Math.abs(percentValue));				// 퍼센트 변수호출하여 절대값으로 입력

	// 신용등급 입력 함수
	const myMake = function(){
		let percentVal = Number($('.percent').text());

		for (let i = 1; i < 10 + 1; i++) {
			percentVal >= i * 10 ? $('.rating-value').text(i) : null;
		}
	}

	// 상태값 확인 후 등급 입력 함수 호출
	is == 'nice' ? myMake() : null;
}

//  Content3 Event
function contetn3Event() {
	let ratingValue = $('.rating-value'),
		creditRating = $('.credit-rating'),
		loding = $('.loding'),
		itemVal = $('.num');

	loding.addClass('active');

	setTimeout(function(){

		creditRating.addClass("show");
		loding.removeClass('active');

		const rotate = function(conditionVal, value) {
			let percentVal = Number($('.percent').text());
			percentVal >= conditionVal ? $('.gauge-arrow-wrap').css('transform','rotate('+value+'deg)') : null
		}
		
		// 백분율 비례 속도계 Evnet
		rotate(10, 0), rotate(20, -20), rotate(30, -40), rotate(40, -60), rotate(50, -80)
		rotate(60, -100), rotate(70, -120), rotate(80, -140), rotate(90, -160), rotate(100, -180)


		// Library 활용 카운트 애니메이션
		itemVal.counterUp({
			delay: 10,
			time: 650
		});

		ratingValue.counterUp({
			delay: 10,
			time: 650
		});			

	}, 1000)
}


//Footer = Content Control Tab menu 하단 리모컨 이벤트 함수
function _f_tabMenu(){

	const _tabWrap = $('.footer')
	const _tabContent = _tabWrap.find('.footerWrap')
	const _tabMenuWrap = _tabContent.find('button')
	const _CONTENTWRAP1 = $('.content1')
	const _CONTENTWRAP2 = $('.content2')
	const _CONTENTWRAP3 = $('.content3')

	_CONTENTWRAP2.addClass('active')
	
	_tabMenuWrap.each(function(){

		let _this = $(this);

		_this.on('click', function(){
			// class add remove 속성 함수
			const addRemoveWrap = function(page1, page2, page3, active2, active3){
				let _creditRating = $('.credit-rating');
				
				let page1State = page1, page2State = page2, page3State = page3, active2State = active2, active3State = active3;
				
				// 1, 2, 3 page class add or remove 유무
				page1State == 'active' ? _CONTENTWRAP1.addClass('active') :	_CONTENTWRAP1.removeClass('active');
				page2State == 'active' ? _CONTENTWRAP2.addClass('active') :	_CONTENTWRAP2.removeClass('active');
				page3State == 'active' ? _CONTENTWRAP3.addClass('active') :	_CONTENTWRAP3.removeClass('active');

				// main 2page 슬라이드 효과
				active2State == 'active' ? _CONTENTWRAP2.addClass('active2') : _CONTENTWRAP2.removeClass('active2');
				active3State == 'active' ? _CONTENTWRAP2.addClass('active3') : _CONTENTWRAP2.removeClass('active3');

				// 3page 속도계 초기화
				$('.gauge-arrow-wrap').css('transform','rotate(-180deg)');

				// main 2page 로딩 효과
				$('.mid-area').children().removeClass('active');
				// main 3page 로딩 효과
				_creditRating.removeClass("show");
			}

			// footer 및 dim Evnet 함수
			function footerIsDimEvnet(){
				setTimeout(function(){
					_this.removeClass('show')
					_tabWrap.removeClass('show')
				},100)
			}

			const _number_of_cases = function() {
				
				if (_this.hasClass('remittance-btn')) {
					_tabWrap.addClass('off');
					_tabContent.children().first().addClass('open');
					// 클레스 부여 및 제거
					addRemoveWrap('active', false, false, 'active', false);

					// open 버튼 자동 화살표 만들기
					_tabWrap.hasClass('show') ? _tabWrap.removeClass('show').find('.open').removeClass('show') : $('.open').removeClass('show');

				}
	
				if (_this.hasClass('home-btn')) {
					_tabWrap.removeClass('off');
					_tabContent.children().first().removeClass('open');
					
					// 클레스 부여 및 제거
					addRemoveWrap(false, 'active', false, false, false);

					// main 2page 통장 올라오는 효과
					mainCardShow()
					
					// footer dim 제거
					footerIsDimEvnet();

					// 아이콘 애니메이션 효과
					$('.home-btn').addClass('ani-2');
					setTimeout(function(){
						$('.home-btn').removeClass('ani-2');
					}, 1000)					
				}
	
				if (_this.hasClass('creditRating-btn')) {
					_tabWrap.removeClass('off');
					_tabContent.children().first().removeClass('open');

					contetn3Event()

					// 클레스 부여 및 제거
					addRemoveWrap(false, false, 'active', false, 'active');

					// footer dim 제거
					footerIsDimEvnet();

					// 아이콘 애니메이션 효과
					$('.creditRating-btn').addClass('ani-3');
					setTimeout(function(){
						$('.creditRating-btn').removeClass('ani-3');
					}, 1000)
				}
			}


			_number_of_cases();

			//하단메뉴 Show / Hide
			if( _this.hasClass('open') ) {
				
				if( _this.hasClass('show') ){
					_this.removeClass('show');
					_tabWrap.removeClass('show');
				}else {

					_this.addClass('show');
					_tabWrap.addClass('show');

				}
			}
		});
	})
	
}

function _f_init(){

    // a href가 #인 경우, javascript:void(0); 으로 치환
    if( $('a').attr('href', '#') ){
        $('a').attr('href', 'javascript:void(0)');
	}

	const key_padText = function () {
		const _padBtn = $('.key-pad');
	
		// 키패드 text data값 불러오기
		_padBtn.each(function(){
			let number = $(this).attr("data-num");
	
			$(this).text(number);
	
		})
	}

	// 키패드 값 불러오기 함수 호출
	key_padText();

}

$(document).on('ready', function(event){
	_f_init();
	padEvnet();
	contetn2();
	_f_tabMenu();
	
});

$(window).on('load', function(){
    
});

$(window).scroll(function(){
	
});