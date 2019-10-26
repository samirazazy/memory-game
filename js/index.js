$('.pageContent, .resourseContainer, .helpContainer').css('height',  (960*74/100)+15+'px');
$('.pageBg').css('height',  (960*74/100)+'px');
$('.header, .footer').css('height',  (960*13/100)+'px');

var pageWidth, pageHeight;

var basePage = {
  width: 1280,
  height: 960,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};

$(function(){
  var $page = $('.page_content');
  
  getPageSize();
  scalePages($page, pageWidth, pageHeight);
  
  //using underscore to delay resize method till finished resizing window
  $(window).resize(_.debounce(function () {
    getPageSize();            
    scalePages($page, pageWidth, pageHeight);
  }, 150));
  

	function getPageSize() {
	  pageHeight = $('#container').height();
	  pageWidth = $('#container').width();
	}

	function scalePages(page, maxWidth, maxHeight) {            
	  var scaleX = 1, scaleY = 1;                      
	  scaleX = maxWidth / basePage.width;
	  scaleY = maxHeight / basePage.height;
	  basePage.scaleX = scaleX;
	  basePage.scaleY = scaleY;
	  basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

		// var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
		// var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/2));
		var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
		var newTopPos = 0;
		page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
	}
/*----------- All Player Btn Click Event Start ---------------*/
	$('.backBtn').on('click',fnBack);
	$('.nextBtn').on('click',fnNext);
	$('.reloadBtnAll').on('click',fnReloadAll);
	$('.reloadBtnScreen').on('click',fnReloadScreen);
	$('.showAnsBtn').on('click',showAns);
	
	$('.helpBtn').on('click',function(){
		if(lastAudio == 1){
			$audio1[0].pause();
		}
		if(lastAudio == 2){
			$audio2[0].pause();
		}
		
		$('.helpPopup').show();
	});

	$('.resourseBtn').on('click',function(){
		// console.log("isMusicPlaying "+isMusic1Playing+" isMusic1Playing "+isMusic2Playing+ " lastAudio "+lastAudio);		
		if(lastAudio == 1){
			$audio1[0].pause();
		}
		if(lastAudio == 2){
			$audio2[0].pause();
		}
		$('.resoursePopup').show();
	});	

	$('.resoursePopup .closeBtn').on('click',function(){
		// console.log(">> isMusicPlaying "+isMusic1Playing+" isMusic1Playing "+isMusic2Playing+ " lastAudio "+lastAudio);
		if(lastAudio == 1 && !isMusic1Playing){
			$audio1[0].play();
		}
		if(lastAudio == 2){
			$audio2[0].play();
		}
		$('.resoursePopup').hide();
	});	

	$('.helpPopup .closeBtn').on('click',function(){
		// console.log(">> isMusicPlaying "+isMusic1Playing+" isMusic1Playing "+isMusic2Playing+ " lastAudio "+lastAudio);
		if(lastAudio == 1 && !isMusic1Playing){
			$audio1[0].play();
		}
		if(lastAudio == 2){
			$audio2[0].play();
		}
		$('.helpPopup').hide();
	});
	//
	function fnNext(){
		if($('.nextBtn').hasClass('disabled')){
			return false;
		}
		$('#myCarousel').carousel('next');
	}

	function fnBack(){
		if($('.backBtn').hasClass('disabled')){
			return false;
		}	
		$('#myCarousel').carousel('prev');
	}
	$('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart dragstart', false);
});

