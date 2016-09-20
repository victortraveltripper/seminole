// JavaScript Document
window.apiConfig = {
    host: 'https://qapi.reztrip.com',
    key: 'too0nxJhq43nESW5cWdH13ZB2ZIsEuG1EXcpZeL1' 
}

//Rooms 
jQuery(document).ready(function(){


	setTimeout(function(){

		//alert('hello');

		jQuery("#rooms-scroll").owlCarousel({
         navigation: true,
		 navigationText: [
        "<span class='olw-rooms-previous'>Preveiw</span>",
        "<span class='olw-rooms-next'>next</span>"],
         pagination: false,
         paginationSpeed: 1000,
         goToFirstSpeed: 2000,
         autoHeight: true,
         items: 3,
         itemsCustom: false,
         itemsDesktop: [1199, 3],
         itemsDesktopSmall: [991, 2],
         itemsTablet: [768, 2],
         itemsTabletSmall: false,
         itemsMobile: [479, 1],
         singleItem: false,
     });


	}, 6000);
    

});


// Gallery
 $(document).ready(function() {
     $('#lightgallery').lightGallery({
         selector: '.item'
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


// onclick scroll
$(document).ready(function(){
    $('.navbar-nav li a[href^="#"]').click(function(e) {
  var offset = 102;
         e.preventDefault();
          $('html,body').animate({ scrollTop: $(this.hash).offset().top - offset}, 750);
        //Close the nav
          console.log('hi')
        $('#navbar').collapse('hide')
        return false;

    }); 

});

var today = new Date();
	var arrival = $.datepicker.formatDate('mm/dd/yy', today);
	var departure = $.datepicker.formatDate('mm/dd/yy', new Date(today.setDate(today.getDate() + 1)));
	$(document).on('change', '#arrival_dates', function() {
			arrival = $('#arrival_dates').val();
			departure = $('#departure_dates').val();
	
			var arrivalDateValue = new Date(arrival)
			var departureDateValue = new Date(departure)
			
			var minDepartureDateValue = new Date(arrivalDateValue)
			minDepartureDateValue.setDate(minDepartureDateValue.getDate() + 1)
			
			departureDate.datepicker('option', 'minDate', minDepartureDateValue);
	
			if (minDepartureDateValue.getTime() > departureDateValue.getTime()) {
					departureDate.datepicker('setDate', minDepartureDateValue);
					departure = $.datepicker.formatDate('mm/dd/yy', minDepartureDateValue);
			}
			 
	});
	$(document).on('change', '#departure_dates', function() {
			departure = $('#departure_dates').val(); 
	});
	 
	
	function createLink(to, item) {
			var date = new Date();
			var arrival = $.datepicker.formatDate('mm/dd/yy', date);
			var departure = $.datepicker.formatDate('mm/dd/yy', new Date(date.setDate(date.getDate() + 1)));
		
	} 
 
 
//  Datepicker
	var defaultArrivalDate = arrival;
	var defaultDepartureDate = departure;
	
	var arrivalDate = $('#arrival_dates');
	var departureDate = $('#departure_dates');
	
	arrivalDate.val(defaultArrivalDate);
	departureDate.val(defaultDepartureDate);
	
	arrivalDate.datepicker({
			dateFormat: 'mm/dd/yy',
			minDate: 0
	});
	
	departureDate.datepicker({
			dateFormat: 'mm/dd/yy',
	});
	 
	var arrivalDate1 = $('#q49_arrivalDate');
	var departureDate1 = $('#q50_departureDate'); 
	
	arrivalDate1.datepicker({
			dateFormat: 'mm/dd/yy',
			minDate: 0
	});
	
	departureDate1.datepicker({
			dateFormat: 'mm/dd/yy',
	});
	 
