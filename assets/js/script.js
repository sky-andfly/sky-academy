(function() {
	var SaaSio = {
		init: function() {
			this.Basic.init();  
		},
		Basic: {
			init: function() {
				this.HeaderMenuOption();
				this.Pr3Accordion();
				this.SaaSioOnePageNav();
				this.counterUp();
				this.EiscrollTop();
				this.faqBg();
				this.SaaSCMobileMenu();
				this.SaaSCOnePageNav();
				this.StrTestimonial();
			},
			HeaderMenuOption: function (){
				jQuery(window).on('scroll', function() {
					if (jQuery(window).scrollTop() > 250) {
						jQuery('.app-dm-header-main').addClass('sticky-on')
					} else {
						jQuery('.app-dm-header-main').removeClass('sticky-on')
					}
				});
				$('.app-dm-open_mobile_menu').on("click", function() {
					$('.app-dm-mobile_menu_wrap').toggleClass("mobile_menu_on");
				});
				$('.app-dm-open_mobile_menu').on('click', function () {
					$('body').toggleClass('mobile_menu_overlay_on');
				});
				if($('.app-dm-mobile_menu li.dropdown ul').length){
					$('.app-dm-mobile_menu li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
					$('.app-dm-mobile_menu li.dropdown .dropdown-btn').on('click', function() {
						$(this).prev('ul').slideToggle(500);
					});
				}
				$('.app-dm-main-menu-wrapper ul li a').on("click", function(){
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
			Pr3Accordion: function (){
				$(".pr3-accordion .card-header a").each(function(){
					$(this).on("click", function(){
						$(this).parents(".accordion").find(".card-active").removeClass("card-active"); 
						$(this).parents(".card").addClass("card-active");
					}); 
				});
			},
			SaaSioOnePageNav: function (){
				$('.anchor-link').on("click", function(){
					let hash = $(this).attr('data-href');
					localStorage.setItem('hash', hash);
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(hash);
						target = target.length ? target : $('[name="DCSext.Level"' + hash.slice(1) +']');
						if (target.length) {
							$('html, body').animate({
								scrollTop: target.offset().top -50
							}, 1000);
							localStorage.removeItem('hash');
							return false;
						}
					}
				});
				$('.carousel-control').on("click", function(e){
					e.preventDefault()
				})
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
				$('ol.carousel-indicators li').on("click",function(){ 
					$('ol.carousel-indicators li.active').removeClass("active");
					$("ol.carousel-indicators li.active").removeClass("active");
					$(this).addClass("active");   
					var indicators = $(this).data("slide-to");
					$(".carousel-indicators").find("[data-slide-to='" + indicators + "']")
					.addClass("active");
				});
				$('.carousel').on('slid.bs.carousel', function() {
					var indicatorsAct = $(".carousel-indicators li.active").data("slide-to");
					$(".carousel-indicators li").removeClass("active");
					$(".carousel-indicators").find("[data-slide-to='" + indicatorsAct + "']")
					.addClass("active");
				});
			}
		}
	}
	SaaSio.init();
})();