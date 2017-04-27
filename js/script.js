var c = 0,
	ww = $(window).width(),
	nw = $('.nav').width(),
	$width = ww-nw,
	gh = $('.greet').height(),
	gh2 = gh*2.5+'px',
	wh = $(window).height(),
	owlWrap = $('.owl-wrapper'),
	any = false;

$(document).ready(function(){
	$(window).trigger('resize');
	$('.polygon').poly();
	//slider
	$('#camera_wrap_1').camera({
		height: wh+'px',
		width: ww+'px',
		fx: 'simpleFade',
		thumbnails: true,
	});
	$('#camera_wrap_2').camera({
		minHeight:'150px',
		height: '300px',
		width: ww+'px',
		fx: 'simpleFade',
		thumbnails: true,
	});
	
	//back to top
	$("#top").click(function () {
		$("html, body").animate({scrollTop: 0}, 800);
	});
	
	// owl wrapper
	if (owlWrap.length > 0) {
		if ($().owlCarousel) {
			owlWrap.each(function(){
				var	carousel= $(this).find('.owl-carousel');
				carousel.owlCarousel({
					itemsCustom : [
						[1200, 1]
					],
					navigation  : false,
					stopOnHover : true,
					autoPlay    : 5000,
					pagination : false
				});
			});
		}
	}
	
	//menu drop down
	if (document.documentElement.clientWidth > 992) {
		$('.nav2 ul li').hover(function(){
			$(this).children('ul').stop(true,true).slideToggle('fast');
		});
	} else if (document.documentElement.clientWidth < 991) {
		$('.nav2 ul li').click(function(){
			$(this).children('ul').stop(true,true).slideToggle('fast');
		});
	}
	
	//click on banner
	$('.cameraContent').click(function(){
		if (any == false){
			$('.about').animate({'left': '-210','z-index':8},200);
			$('.rightSide').animate({'right':'-200'},200);
			$('.camera_thumbs_cont').animate({'left':'210px'});
			any = true;
		} else {
			$('.about').animate({'left': '210'},200);
			$('.rightSide').animate({'right':'0'},200);
			$('.camera_thumbs_cont').animate({'left':0});
			any = false;
		}
	});

	//book a room
	$('.booknow').click(function(){
		$('.bookInner').stop(true,true).slideToggle('fast');
	});
	$('.resto-select').change(function(){
		$('.resto-select-content').hide();
		$('.'+$(this).val()).slideDown('fast');
	});
	
	//for tab
	$('.tabNav li a[href]').click(function() {
		var dataLink = $(this).attr('href').split('#');
		$('#'+dataLink[1]).prevAll('div').hide();
		var toKeep = 'div[id="'+dataLink[1]+'"]';
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.tabPane[id]').not(toKeep).slideUp(400);
		$(toKeep).slideDown(400);
		return false;
	});
	
	//for the footer
	$('#sitelinks').on('click', function(e) {
		$("#sitemapContents").slideToggle();
		e.preventDefault();
		$('#sitemapContents').toggleClass('hidden');
		var top = $('i',this);
		top.toggleClass('fa-chevron-down fa-chevron-up');
	})
	
	//for the burger
	$('.sideNavTrigger').on('click', function(){
		if(c == 0) {
			console.log('true');
			$('.nav').addClass('extendNav navShadow').css('background','rgba(255, 0, 19, 0.5)');
			$('.gNav > li p, .logo p, .user a p').css({'width':'auto'});
			$('.logo a').css({'font-size':'1.3rem'});
			$('.userIcon img').stop(true,true).animate({'max-width':'40px','max-height':'40px'});
			$('.user a').stop(true,true).animate({'padding':'.625rem 1.25rem','font-size':'15px'});
			$('.gNav > li > a').css({'font-size':'15px'});
			$('.gNav ul').css({'left':'192px'});
			$('.main, .greet').css({'filter':'blur(5px)','-webkit-filter':'blur(5px)'});
			
			//para sa mga may submenu
			$('.gNav').find('li').each(function(){
				if($(this).children('ul').size() > 0) {
					$(this).children('a').append('<span class="fa fa-level-down pull-right"></span>');
				}
			});
			c = 1;
		} else {
			console.log('false');
			$('.nav').removeClass('extendNav navShadow').css('background','rgba(255, 0, 19, 0.24)');
			$('.gNav > li p, .logo p, .user a p').css({'width':'0'});
			$('.logo a').css({'font-size':'2px'});
			$('.userIcon img').stop(true,true).animate({'max-width':'26px','max-height':'26px'});
			$('.user a').stop(true,true).animate({'padding':'.625rem 1.25rem 0','font-size':'4px'});
			$('.gNav > li > a').css({'font-size':'2px'});
			$('.gNav ul').css({'left':'25px'});
			$('.main, .greet').css({'filter':'blur(0)','-webkit-filter':'blur(0)'});
			
			//para sa mga may submenu
			$('.gNav').find('li').each(function(){
				if($(this).children('ul').size() > 0) {
					$(this).children('a').find('span').remove('.fa-level-down');
				}
			});
			c = 0;
		}
		
		
	});
	
	//width of greet div
	$('.greet').css('width',$width+'px');
	
	//offset of main
	$('.main').css('margin-left',nw+'px');
	
	//offset of mainContent
	$('.mainContent').css('margin-top',gh2);
	
	//size of bg
	$('.bg').css({'width':ww+'px','height':wh+'px'});
});

$(window).resize(function(){
	if(ww > 1080){
		//header and about height
		$('.about, .rightSide, .header').css({'height':wh+'px'});
		$('.header2').css('width','100%');
		
		//nice scroll
		 $(".about, .rightSide").niceScroll({
			 cursorwidth: '5px', 
			 autohidemode: true, 
			 zindex: 999, 
			 scrollspeed: "100", 
			 mousescrollstep: "30", 
			 horizrailenabled: false 
		});
	} else if(ww < 1080){
		$('.onTop').parent().after($('.onTop'));
		$('.logo').parents().eq(4).before($('.logo'));
		$('.logo').appendTo('.banner');
		$('.logo').children('img').attr('src','images/largelogo.png');
		$('.logos').parents().eq(1).after($('.logos'));
		$('.logos').insertAfter($('.social'));
		$('.nav2').wrap('<div class="container"></div>');
		$('.footer').parent().parent().after($('.footer'));
		$('.footer').wrapInner('<div class="container"></div>')
		
		//nice scroll
		 $("body").niceScroll({
			 cursorwidth: '5px', 
			 autohidemode: true, 
			 zindex: 999, 
			 scrollspeed: "100", 
			 mousescrollstep: "30", 
			 horizrailenabled: false 
		});
		
		if(ww <= 768){
			$('.nav1 > ul > li:first-child').before('<li><a href="#"><span class="fa fa-bars"></span> menu</a><ul></ul></li>');
			$('.nav1 > ul > li').not('.nav1 ul li:first-child').appendTo($('.nav1 > ul > li > ul'));
			$('.nav1 ul li').click(function(){
				$(this).children('ul').stop(true,true).slideToggle('fast');
			});
		}
	}
});

window.$cameraBig = function(){
	$('#camera_wrap_1').camera({
		height: wh+'px',
		width: ww+'px',
		fx: 'simpleFade'
	});
}

window.$cameraSmall = function(){
	$('#camera_wrap_1').camera({
		height: '350px',
		minHeight: '150px',
		fx: 'simpleFade'
	});
}