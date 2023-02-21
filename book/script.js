console.log('script loaded');

$(document).ready(function(){
	
	$('.right-page').click(function(){
		console.log('right-page clicked');
		$('.right-page').addClass('shadow');
		$('.left-page').addClass('shadow-left');
		$('.right-mid').addClass('shadow-rm');
		$('.left-mid').addClass('shadow-lm');
		$('.right-stripe').addClass('shadow-rs');
		$('.right-stripe2').addClass('shadow-rs2');
		$('.left-stripe').addClass('shadow-ls');
		$('.left-stripe2').addClass('shadow-ls2');
		$('.triangle1').addClass('tri1');
		$('.triangle2').addClass('tri3');

		
		// Remove classes added by left-page click function
		$('.right-page').removeClass('shadow5');
		$('.left-page').removeClass('shadow-left5');
		$('.right-mid').removeClass('shadow-rm5');
		$('.left-mid').removeClass('shadow-lm5');
		$('.right-stripe').removeClass('shadow-rs5');
		$('.right-stripe2').removeClass('shadow-rs25');
		$('.left-stripe').removeClass('shadow-ls5');
		$('.left-stripe2').removeClass('shadow-ls25');
		$('.triangle1').removeclass('tri2');
		$('.triangle2').removeclass('tri4');
	});

	$('.left-page').click(function(){
		console.log('left-page clicked');
		$('.right-page').addClass('shadow5');
		$('.left-page').addClass('shadow-left5');
		$('.right-mid').addClass('shadow-rm5');
		$('.left-mid').addClass('shadow-lm5');
		$('.right-stripe').addClass('shadow-rs5');
		$('.right-stripe2').addClass('shadow-rs25');
		$('.left-stripe').addClass('shadow-ls5');
		$('.left-stripe2').addClass('shadow-ls25');
		$('.triangle1').addClass('tri2');
		$('.triangle2').addClass('tri4');
		
		// Remove classes added by right-page click function
		$('.right-page').removeClass('shadow');
		$('.left-page').removeClass('shadow-left');
		$('.right-mid').removeClass('shadow-rm');
		$('.left-mid').removeClass('shadow-lm');
		$('.right-stripe').removeClass('shadow-rs');
		$('.right-stripe2').removeClass('shadow-rs2');
		$('.left-stripe').removeClass('shadow-ls');
		$('.left-stripe2').removeClass('shadow-ls2');
		$('.triangle1').removeclass('tri1');
		$('.triangle2').removeclass('tri3');
	});

	window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

});
