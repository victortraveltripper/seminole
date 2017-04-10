// JavaScript Document
window.apiConfig = {
    host: 'https://api.reztrip.com',
    key: 'ioYJHSv6GN2XrVMnpC44D35dHgniuu6i9YqNzIS8'
}




// Gallery

 $(document).ready(function() {
   $('#lightgallery').lightGallery({
      selector: '.item',
      thumbnail: true,
      download: false,
      zoom: true
    })


		 $(".filter").on("click", function () {
    var $this = $(this);
    // if we click the active tab, do nothing
    if (!$this.hasClass("active")) {
      $(".filter").removeClass("active");
      $this.addClass("active"); // set the active tab
      var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
      $filter == 'all' ? // if we select "view all", return to initial settings and show all
        $(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn()
        : // otherwise
        $(".fancybox").fadeOut(0).filter(function () {
          return $(this).data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
        }).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
    } // if
  }); // on

	$('.anchorlink').on('click', function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
});

 });


 //View more

 //$('#about-link').addClass('current');
$('.viewmore').on('click', function (e) {
	//alert("test");
    e.preventDefault();
    $('.location ul').toggleClass('location-hight', 1000);
    //$(this).addClass('current');
});


// // onclick scroll
// $(document).ready(function(){
//     $('.navbar-nav li a[href^="#"]').click(function(e) {
//   var offset = 102;
//          e.preventDefault();
//           $('html,body').animate({ scrollTop: $(this.hash).offset().top - offset}, 750);
//         //Close the nav
//           console.log('hi')
//         $('#navbar').collapse('hide')
//         return false;
//
//     });
//
// });


