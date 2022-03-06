$(window).on('load', function() {
	$(".loading-preloader").fadeOut();
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
	setTimeout(function(){
		$.getScript("//code-ya.jivosite.com/widget/yTPpGTPzOb")
	}, 3000);
	$('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
    });
});