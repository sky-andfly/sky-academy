$(window).on('load', function() {
	$.getScript("/assets/js/script.js");
	$(".loading-preloader").fadeOut();
	setTimeout(function(){
		if (localStorage.getItem('hash')) {
			let hash = localStorage.getItem('hash');
			let target = $(hash);
			target = target.length ? target : $('[name="DCSext.Level"' + hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top -50
				}, 1000);
				localStorage.removeItem('hash');
				return false;
			}
		}
	}, 500);
	if (location.pathname === '/') {
		$.getScript("/assets/js/typer-new.js");
	}
	setTimeout(function(){
		$.getScript("/assets/js/bootstrap.bundle.min.js");
		$.getScript("//cdn.jsdelivr.net/npm/sweetalert2@11");
	}, 3000);
	$('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
    });
    setTimeout(function(){
		$.getScript("//code-ya.jivosite.com/widget/Vs7flvHRFi");
	}, 3000);
	$.getScript("/bot/bot.js");
});

$(document).ready(function(){
	$('.eight-feature-box').removeClass('hover');
	if (document.documentElement.clientWidth < 992) {
		$('.eight-feature-box').addClass('hover');
	}
    $('.closeAdd').on('click', function(){
    	$('.newslatter_content').removeClass(`animate__delay-5s`);
    	$('.newslatter_content').removeClass(`animate__fadeInRightBig`);
    	$('.newslatter_content').addClass(`animate__fadeOutRightBig`);
    });
});

$(document).on('scroll', function(){
	let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	let opacity = 0.7 - posTop / 1000;
	if (posTop === 0) {
		opacity = 1;
	}
    $('.soft-m-ft-devider').css('opacity', opacity);
})