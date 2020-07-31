"use strict";


// header Event
function headerEvnet() {
	// Banner boxslider
	$('.brandPromotion').bxSlider({
		auto: true,
		autoControls: false,
		stopAutoOnClick: false,
		pager: false,
		autoDelay: 1000
	});
}

// content1 Event
function content1_searchEvnet() {
	let tabMenuData, 
		itemData;

	// 클레스 추가 및 삭제 함수
	const addBtn = function(add, remove) {
		let tagCatchBox = $('.tagCatch-box'),
			choiceBox = $('.choiceBox');

		tagCatchBox.addClass(add);
		choiceBox.addClass(add)

		choiceBox.removeClass(remove)	
		setTimeout(function(){
			tagCatchBox.removeClass(remove);
		},300);
		
	}

	// 선택적용 버튼 클릭 add remove 이벤트 함수
	const activeResul = function(val) {
		let state;
		state = val
		if (state == true) {
			$('.tag-wrap').slideUp(300);
			$('.tagCatch-box').addClass('up');

			$('.resultBox').addClass('active');
			$('.tagResetBtn').removeClass('active');
			$('.choiceBox').hide()
		}else {
			$('.tag-wrap').slideDown(300);
			$('.tagCatch-box').removeClass('up');

			$('.resultBox').removeClass('active');
			$('.tagResetBtn').addClass('active');
			addBtn(null, 'active');
		}

	}

	// 탭메뉴 클릭이벤트 함수
	function tabMenuClickEvnet() {
		// 탭메뉴 클릭 이벤트 설정
		const tagTab_menuEvent = function(value) {
			$('.consonant-wrap > ul').removeClass("active");
			$("."+value+"").addClass('active');
		}
		// 탭메뉴 클릭 이벤트
		$('.tag-tabBtn').on('click', function(){
			tabMenuData = $(this).attr('data-name');
			tagTab_menuEvent(tabMenuData)
		})
	}

	// 자음클릭 이벤트 함수
	function consonantClickEvnet() {

		// 자음버튼 클릭 이벤트 설정
		const sameValue = function(value){
			$('.cnsnnBtn').removeClass('active');
			$('.checkWrap').removeClass('active');
			$("a[data-name="+value+"]").addClass('active');
			$("ul[data-name="+value+"]").addClass('active')
		}

		// 자음 버튼 클릭 이벤트
		$('.cnsnnBtn').on('click', function(){
			itemData = $(this).attr('data-name');

			sameValue(itemData);
		})
	}

	// 선택적용 이벤트, 적용 시 아이템 호출 함수
	function applyBtnClickEvnet() {
		
		// 검색결과 데이터 불러오기
		const callListAttr = function(){

			const attrWrap = function(attr_1, classNum){

				$.each(attr_1, function(index, value) {

					var listItem = "";
					listItem += '<li class=list_'+classNum+' data-name=list_'+classNum+''+index+'>';
					listItem +=    '<a href="#">';
					listItem +=        '<div>';
					listItem +=            '<img src="'+value.url+'">';
					listItem +=        '</div>';
					listItem +=        '<div class="textWrap">';
					listItem +=            '<span>';
					listItem +=                '<p><b class="percent">'+value.percent+'</b>%</p>';
					listItem +=                '<p><b class="salePrices">'+value.discountVal+'</b>원</p>';
					listItem +=            '</span>';
					listItem +=            '<p class="costPrice">'+value.costPrice+'</p>';
					listItem +=            '<p>'+value.productTitle+'</p>';
					listItem +=        '</div>';
					listItem +=    '</a>';
					listItem += '</li>';


					$(".productWrap > ul").append(listItem);
				
				});
				
			}

			$.ajax({
				dataType: "json",
				url: "/resource/js/json/list.json",
				mimeType: "application/json",

				success: function(result){
					
					let list_a = $('.cnsnnBtn[data-wrap="list_a"]'),
						list_b = $('.cnsnnBtn[data-wrap="list_b"]'),
						list_c = $('.cnsnnBtn[data-wrap="list_c"]');
						
					let val = 0;

					
					list_a.hasClass('color') ? attrWrap(result.list_array1, 'a') : null
					list_b.hasClass('color') ? attrWrap(result.list_array2, 'b') : null
					list_c.hasClass('color') ? attrWrap(result.list_array3, 'c') : null


					setTimeout(function(){
						let timer = setInterval(function(e){
							val++
							$(".productWrap").find('li').eq(val - 1).addClass('active');

							if (val == 30){
								clearInterval(timer);
							}
						}, 70)
							
					}, 70);


				}
			});
		}

		$('.check').on('click', function(){

			activeResul(true);
			callListAttr();
		})
	}
	
	tabMenuClickEvnet();		// 탭 메뉴 클릭 이벤트
	consonantClickEvnet();		// 자음버튼 클릭 이벤트
	applyBtnClickEvnet();		// 선택적용, 적용시 아이템 호출(ajax) 클릭 이벤트


	// checkdeVal 체크상태 값 설정 함수
	const checkdeVal = function(nameVal, val) {
		$("input[data-name="+nameVal+"]").prop('checked', val);
		$("input[data-name="+nameVal+"]").attr('aria-checked', val);
	}

	// 아이템 및 클레스 추가 함수
	const addItem_Class = function(nameData, nameText, val){

		// 아이템 추가
		$('.tagCollection').append("<li data-name='"+nameData+"'><a herf='#'><p>"+nameText+"</p><p>x</p></a></li>");

		// 추가한 아이템에 클레스 추가
		setTimeout(function(){
			$('.tagCollection').find('li').addClass('active')
		},1);

		// checkdeVal 함수 호출
		checkdeVal(nameData, val);
	}

	// 아이템 및 클레스 삭제 함수
	const removeItem_Class = function(nameData) {
		$('.tagCollection').find("li[data-name="+nameData+"]").removeClass('active');

		setTimeout(function(){
			$("li[data-name="+nameData+"]").remove();
		},300);

		checkdeVal(nameData, false)
	}

	// 태그 삭제 시 리스트 삭제 함수
	const removeList = function(){
		let productWrap = $('.productWrap');
		
		// A묶음
		let list_a0 = $(".checkWrap[data-name=cnsnnWrap-0]").find('.checkItem[aria-checked]:checked').length,
			list_a1 = $(".checkWrap[data-name=cnsnnWrap-1]").find('.checkItem[aria-checked]:checked').length,
			list_a2 = $(".checkWrap[data-name=cnsnnWrap-2]").find('.checkItem[aria-checked]:checked').length,
			list_a3 = $(".checkWrap[data-name=cnsnnWrap-3]").find('.checkItem[aria-checked]:checked').length;

		let A_listSum = list_a0 + list_a1 + list_a2 + list_a3;
			
		let list_b0 = $(".checkWrap[data-name=cnsnnWrap-4]").find('.checkItem[aria-checked]:checked').length,
			list_b1 = $(".checkWrap[data-name=cnsnnWrap-5]").find('.checkItem[aria-checked]:checked').length,
			list_b2 = $(".checkWrap[data-name=cnsnnWrap-6]").find('.checkItem[aria-checked]:checked').length,
			list_b3 = $(".checkWrap[data-name=cnsnnWrap-7]").find('.checkItem[aria-checked]:checked').length,
			list_b4 = $(".checkWrap[data-name=cnsnnWrap-8]").find('.checkItem[aria-checked]:checked').length,
			list_b5 = $(".checkWrap[data-name=cnsnnWrap-9]").find('.checkItem[aria-checked]:checked').length;

		let B_listSum = list_b0 + list_b1 + list_b2 + list_b3 + list_b4 + list_b5;
			
		// C묶음
		let list_c0 = $(".checkWrap[data-name=cnsnnWrap-10]").find('.checkItem[aria-checked]:checked').length,
			list_c1 = $(".checkWrap[data-name=cnsnnWrap-11]").find('.checkItem[aria-checked]:checked').length,
			list_c2 = $(".checkWrap[data-name=cnsnnWrap-12]").find('.checkItem[aria-checked]:checked').length,
			list_c3 = $(".checkWrap[data-name=cnsnnWrap-13]").find('.checkItem[aria-checked]:checked').length;
		
		let C_listSum = list_c0 + list_c1 + list_c2 + list_c3;

		if (A_listSum > 0 && B_listSum > 0 && B_listSum > 0) {

		}else {

			A_listSum > 0 ? null : productWrap.find('.list_a').removeClass('active');

			B_listSum > 0 ? null : productWrap.find('.list_b').removeClass('active');

			C_listSum > 0 ? null : productWrap.find('.list_c').removeClass('active');


			setTimeout(function(){
	
				A_listSum > 0 ? null : productWrap.find('.list_a').remove();

				B_listSum > 0 ? null : productWrap.find('.list_b').remove();
		
				C_listSum > 0 ? null : productWrap.find('.list_c').remove();
					
			},300)

		}
		
	}

	// checkItem 클릭 이벤트
	$('.checkItem').on('click', function(e){
		let _this = $(this);
		
		let nowItemData = _this.attr('data-name'),
			nowItemText = _this.parent().text(),
			nowCnsnnData = _this.parent().parent().parent().attr('data-name');

		let trueval = $(".checkWrap[data-name="+nowCnsnnData+"]").find(".checkItem[aria-checked]:checked").length;

		// 체크박스가 하나라도 체크되었을때 이벤트
		if ($("input[data-name="+nowItemData+"]").prop('checked') === true) {
		
			// 5개 이상 체크일 경우 이벤트
			if ($(".checkWrap[data-name]").find(".checkItem[aria-checked]:checked").length > 5 ){

				alert('최대 5개까지만 선택할 수 있습니다.')
				$("input[data-name="+nowItemData+"").prop('checked', false);
				return;
			// 5개 미만 체크일 경우 이벤트
			}else {
				// 체크박스 체크 및 태그추가
				addItem_Class(nowItemData, nowItemText, true);
			}
			
			// 태그 클릭 시 이벤트
			$('.tagCollection').find('li').off('click').on('click', function(){

				// 현재 클릭 데이터 네임
				let nowName = $(this).attr('data-name');
				// 현재 클릭한 상위 checkWrap 데이터 네임
				let nowCnsnnData = $(".checkItem[data-name="+nowName+"]").parent().parent().parent().attr('data-name');
				// 각 checkWrap 의 아이템 체크 개수
				let trueval = $(".checkWrap[data-name="+nowCnsnnData+"]").find(".checkItem[aria-checked]:checked").length;
				trueval = trueval - 1;

				// 태그 클릭 시 태그삭제 함수 호출
				removeItem_Class(nowName)

				// 결과박스 활성화 경우
				if ($('.resultBox').hasClass('active')) {

					// 태그가 없을 경우 되돌리기
					if( $(".checkItem[aria-checked]:checked").length > 0){
						
					}else {
						activeResul(false);
						$('.choiceBox').show();
					}
					
					// 지정 태그 삭제 시 지정 아이템 리스트 삭제 함수 호출
					removeList()
				}else {
					// 태그 삭제 후 개수가 0개일 경우 버튼 및 태그박스 비활성화
					$(".checkItem[aria-checked]:checked").length > 0 ? null : addBtn(null, 'active');
				}

				// 자음버튼 하위 태그 삭제 시 - 태그 상위 자음버튼 컬러빼기
				trueval > 0 ? null : $(".cnsnnBtn[data-name="+nowCnsnnData+"]").removeClass('color');
			})

		}else {
			// 체크박스 체크 및 태그삭제
			removeItem_Class(nowItemData);
		}	

		// 자음버튼 하위 태그 추가, 삭제 시 - 태그 상위 자음버튼 컬러넣기 / 빼기
		trueval > 0 ? $(".cnsnnBtn[data-name="+nowCnsnnData+"]").addClass('color') : $(".cnsnnBtn[data-name="+nowCnsnnData+"]").removeClass('color');

		// 체크박스 체크 개수 확인 후 0개보다 많으면 버튼 및 태그모음 박스 활성화
		$(".checkItem[aria-checked]:checked").length > 0 ? addBtn('active', null) :	addBtn(null, 'active');

	})

	// 리셋버튼 클릭시 이벤트
	$('.tagResetBtn').on('click', function(){
		$('.tagCollection').find('li').remove();
		$('.checkItem').prop('checked', false);
		$('.cnsnnBtn').removeClass('color');
		$(".checkItem[aria-checked]:checked").length > 0 ? addBtn('active', null) :	addBtn(null, 'active');
	})

	// 뒤로가기 클릭시 이벤트
	$('.tagBackBtn').on('click', function(){
		$('.tag-wrap').slideDown(500)
		$('.tagCatch-box').removeClass('up');

		$('.resultBox').removeClass('active');
		$('.tagResetBtn').addClass('active');
		$('.choiceBox').show();

		$('.productWrap').find('ul > li').remove();
	})
}

function _f_init(){

    // a href가 #인 경우, javascript:void(0); 으로 치환
    if( $('a').attr('href', '#') ){
        $('a').attr('href', 'javascript:void(0)');
	}

	// dataName 설정 함수
	const dataSeting = function(element, name) {
		element.each(function(index){
			$(this).attr('data-name', ""+name+"-"+index+"");
		})
	
		$('input').attr('aria-checked', 'false');
		
	}
	
	// content2 데이터 세팅 함수
	dataSeting($('.checkItem'), 'num');
	dataSeting($('.cnsnnBtn'), 'cnsnnWrap');
	dataSeting($('.checkWrap'), 'cnsnnWrap');

	headerEvnet();
	
}

$(document).on('ready', function(event){
	_f_init();
	content1_searchEvnet();	
});

$(window).on('load', function(){
    
});

$(window).scroll(function(){
	
});