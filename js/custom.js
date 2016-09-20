$(document).ready(function(){
  $("#Slider").owlCarousel({
      navigation : true,
      navigationText: ["<img src='images/arrow-left.svg'> ","<img src='images/arrow-right.svg'>"],
      slideSpeed : 300,
      paginationSpeed : 400,
      pagination : false,
      paginationNumbers:  false,
      singleItem : true,
      autoPlay:true,
 	    loop:true
 
  });


$('#rooms-carousel').carousel();
  $("#GallerySlider").owlCarousel({
    
 
      navigation: true, // Show next and prev buttons
      navigationText: ["<img src='images/arrow-left-gray.svg'> <span class='slider-text'>Previous Thumbnail</spnan>","<span class='slider-text'>Next Thumbnail</spann> <img src='images/arrow-right-gray.svg'>"],
      autoPlay: 3000,
      slideSpeed : 100,
      paginationSpeed : 200,
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsMobile : [479,1],
      paginationNumbers:  true,
      loop:true,
      margin:60,

   
  });





  $("#rooms").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      navigationText: ["<img src='images/arrow-left-gray.svg'> ","<img src='images/arrow-right-gray.svg'>"],
      autoPlay: false,
      slideSpeed : 100,
      paginationSpeed : 200,
      paginationNumbers:  true,
      singleItem : true,
      loop:true,
      URLhashListener:true
   
  });

  $('a.readon').click(function(){ 
    var owlid = $(this).attr('data-id');
    $('.contTabs li:last').tab('show');
    var owl = $('#rooms').data('owlCarousel');
    owl.goTo(owlid);

  });

 //Show Hide Aminites 

    $('.nav-toggle').click(function(){
      //get collapse content selector
      var collapse_content_selector = $(this).attr('href');
      //make the collapse content to be shown or hide
      var toggle_switch = $(this);
      $(collapse_content_selector).toggle(function(){
        if($(this).css('display')=='none'){
        //change the button label to be 'Show'
        toggle_switch.html('View More');
        }else{
        //change the button label to be 'Hide'
        toggle_switch.html('Close');
        }
      });
    });


});

$('#owl-demo').owlCarousel({
    items:1,
    margin:10,
    autoHeight:true
});