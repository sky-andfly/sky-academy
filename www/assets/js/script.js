(function() {
	var SaaSio = {
		init: function() {
			this.Basic.init();  
		},
		Basic: {
			init: function() {
				this.SaaSioOnePageNav();
				this.counterUp();
				this.EiscrollTop();
				this.faqBg();
				this.SaaSCMobileMenu();
				this.SaaSCOnePageNav();
				this.StrTestimonial();
			},
			SaaSioOnePageNav: function (){
				$('.anchor-link').on("click", function(){
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name="DCSext.Level"' + this.hash.slice(1) +']');
						if (target.length) {
							$('html, body').animate({
								scrollTop: target.offset().top -50
							}, 1000);
							return false;
						}
					}
				});
			},	
			counterUp: function (){
				if ($(".odometer").length) {
					$('.odometer').appear();
					$(document.body).on('appear', '.odometer', function(e) {
						var odo = $(".odometer");
						odo.each(function() {
							var countNumber = $(this).attr("data-count");
							$(this).html(countNumber);
						});
						window.odometerOptions = {
							format: 'd',
						};
					});
				}
			},
			EiscrollTop: function (){
				$(window).on("scroll", function() {
					if ($(this).scrollTop() > 200) {
						$('#scrollup').fadeIn();
					} else {
						$('#scrollup').fadeOut();
					}
				});

				$('#scrollup').on("click", function()  {
					$("html, body").animate({
						scrollTop: 0
					}, 800);
					return false;
				});				
			},
			faqBg: function (){
				$(document).on('click', '.ei-faq', function(){
					$(this).addClass('faq_bg').siblings().removeClass('faq_bg')
				}) 				
			},
			SaaSCMobileMenu: function (){
				$('.s2-open_mobile_menu').on("click", function() {
					$('.s2-mobile_menu_wrap').toggleClass("mobile_menu_on");
				});
				$('.s2-open_mobile_menu').on('click', function () {
					$('body').toggleClass('mobile_menu_overlay_on');
				});
				if($('.s2-mobile_menu li.dropdown ul').length){
					$('.s2-mobile_menu li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
					$('.s2-mobile_menu li.dropdown .dropdown-btn').on('click', function() {
						$(this).prev('ul').slideToggle(500);
					});
				}
			},
			SaaSCOnePageNav: function (){
				jQuery(window).on('scroll', function() {
					if (jQuery(window).scrollTop() > 100) {
						jQuery('.saas_two_main_header').addClass('saas_2-menu-bg-overlay ')
					} else {
						jQuery('.saas_two_main_header').removeClass('saas_2-menu-bg-overlay ')
					}
				})
			},
			StrTestimonial: function (){
				$('ol.carousel-indicators2 li').on("click",function(){ 
					$('ol.carousel-indicators2 li.active').removeClass("active");
					$("ol.carousel-indicators li.active").removeClass("active");
					$(this).addClass("active");   
					var indicators = $(this).data("slide-to");
					$(".carousel-indicators").find("[data-slide-to='" + indicators + "']")
					.addClass("active");
				});
				$('.carousel').on('slid.bs.carousel', function() {
					var indicatorsAct = $(".carousel-indicators li.active").data("slide-to");
					$(".carousel-indicators2 li").removeClass("active");
					$(".carousel-indicators2").find("[data-slide-to='" + indicatorsAct + "']")
					.addClass("active");
				});
			}
		}
	}
	SaaSio.init();
})();