"use strict";

function _f_resizeHeight(){
    
    const _windowHeight = $(window).height()
    
    $('.home-area').css('height', _windowHeight);

}

function _f_init(){

    // a href가 #인 경우, javascript:void(0); 으로 치환
    if( $('a').attr('href', '#') ){
        $('a').attr('href', 'javascript:void(0)');
    }
    
    const _windowHeight = $(window).height()
    
    $('.home-area').css('height', _windowHeight);
}

$(document).on('ready', function(event){
	_f_init();
});

$(window).on('resize', function(){
	_f_resizeHeight();
});

$(window).on('load', function(){
    
});