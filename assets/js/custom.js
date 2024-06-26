(function ($) {
	
	"use strict";


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.event_box');
	const filtersElem = document.querySelector('.event_filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.event_outer',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	$('.owl-banner').owlCarousel({
		center: true,
      items:1,
      loop:true,
      nav: true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});

	$('.owl-testimonials').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      nav: true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 767) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

})(window.jQuery);




// owal slider  
$(document).ready(function(){
	// Create an array of years from 2000 to 3000
	var years = [];
	for (var year = 2000; year <= 3000; year++) {
		years.push(year);
	}

	// Generate carousel items from the years array
	var carousel = $('#year-carousel');
	years.forEach(function(year, index) {
		var contentClass = (index < 2 || index >= years.length - 2) ? 'hidden-content' : '';
		carousel.append('<div class="item ' + contentClass + '"><span>' + year + '</span></div>');
	});

	// Initialize Owl Carousel
	var $owl = $('.sectionSlider .owl-carousel');
	$owl.owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		dots: false,
		navText: ['<', '>'],
		center: true,
		responsive: {
			0: {
				items: 3
			},
			900: {
				items: 3
			},
			1000: {
				items: 7
			}
		},
		onInitialized: centerItems,
		onTranslated: centerItems
	});

	function centerItems(event) {
		// Reset all items to default size and hide content
		$('.owl-item .item').removeClass('center medium large active-content hidden-content');
		$('.owl-item .item span').hide();

		// Get all visible items
		var visibleItems = $('.owl-item.active .item');

		// Add center class to the center item
		var centerIndex = Math.floor(visibleItems.length / 2);
		visibleItems.eq(centerIndex).addClass('center active-content').children('span').show();

		// Add medium class to the items next to the center
		if(centerIndex - 1 >= 0) visibleItems.eq(centerIndex - 1).addClass('medium active-content').children('span').show();
		if(centerIndex + 1 < visibleItems.length) visibleItems.eq(centerIndex + 1).addClass('medium active-content').children('span').show();

		// Add large class to the first two and last two items only on larger screens
		if ($(window).width() > 900) {
			visibleItems.eq(0).addClass('large').children('span').hide();
			visibleItems.eq(1).addClass('large').children('span').hide();
			visibleItems.eq(visibleItems.length - 1).addClass('large').children('span').hide();
			visibleItems.eq(visibleItems.length - 2).addClass('large').children('span').hide();
		}
	}

	// Trigger the initialized event to set the initial center item
	$owl.trigger('initialized.owl.carousel');

	// Recalculate items on window resize
	$(window).resize(function() {
		centerItems();
	});
});


// video palying btn 
document.addEventListener("DOMContentLoaded", () => {
	let playIcon = document.querySelector(".playIcon");
	let startingVideo = document.querySelector("#videoElement");  
	playIcon.addEventListener("click", () => {
	  if (startingVideo.paused) { 
		startingVideo.play();
		playIcon.classList.remove("fa-play");
		playIcon.classList.add("fa-pause");
	  } else {
		console.log("Pausing video");
		startingVideo.pause();
		playIcon.classList.remove("fa-pause");
		playIcon.classList.add("fa-play");
	  }
	});
  });