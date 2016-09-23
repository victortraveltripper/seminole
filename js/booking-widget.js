$(function() {
  var body = $('body');
  var sidebar = $('.booking-widget');
  var closeButton = $('.booking-widget_close');
  var showButtons = $('a[show-booking-widget]');
  var isselect=true;


  // Show booking sidebar events
  $.each(showButtons, function(i, item) {
    $(item).on('click', function(e) {
      e.preventDefault();
      if (!sidebar.hasClass('-show')) {
        body.addClass('overflow');
        sidebar.addClass('-show');
      }
    });
  });

  // Close sidebar event
  closeButton.on('click', function() {
    body.removeClass('overflow');
    sidebar.removeClass('-show');
  });

  // View Special Rates
  var specialRates = $('.booking-widget_special-rates');
  var specialRatesTitle = specialRates.find('.booking-widget_special-rates_title');
  var specialRatesContent = specialRates.find('.booking-widget_special-rates_content');

  specialRatesTitle.on('click', function() {

    $(this).toggleClass('-show');
    specialRatesContent.stop().slideToggle(400);
  });



  // TODO
  //$(document).on('click.acord', '.booking-widget_accord_toggler', function() {
  //  var $this = $(this);
//$this.toggleClass('-show');

//$this.siblings('.booking-widget_accord_content').stop().slideToggle(200);
/*
if(isselect)
{
$(".booking-widget_calendar_icon-checkin").html("CHECK IN");
isselect=false;
}
else
{
  $(".booking-widget_calendar_icon-checkin").html("SELECT CHECK IN");
  isselect=true;
}
*/
//  });



$('#step2, #step3, #step4').hide();
$('.booking-widget_select_rooms_button').click(function(){
   $('#step1').hide();
   $('#step2').show();
});

//$('.bookin-widget_avalible-room-details').on('click',function(){
$("body").on('click', '.bookin-widget_avalible-room-details',function(){
   $('#step1').hide();
   $('#step2').hide();
   $('#step3').show();
   //getRoomDetails($(this).attr('data-roomTypeId'));
   showRoomDetails($(this).attr('data-roomTypeId'));
});

$('.bookin-widget_booknow').click(function(){
   $('#step1').hide();
   $('#step2').hide();
   $('#step3').hide();
   $('#step4').show();

});


$('.back').click(function(){
   $('#step1').show();
   $('#step2').hide();

});

$('.back1').click(function(){
   $('#step1').hide();
   $('#step2').show();
   $('#step3').hide();
});

$('.back2').click(function(){
   $('#step1').hide();
   $('#step2').hide();
   $('#step3').show();
   $('#step4').hide();
});
});

function showRoomDetails(roomTypeId)
{
  var rname1 = $("#"+roomTypeId+"_roomname1").val();
  var rname2 = $("#"+roomTypeId+"_roomname2").val();
  var roomSrc = '../images/booking-pics/Select_room-1.png';
  var roomImg = '<img src="'+roomSrc+'" alt=""/>';

  var arrivalDate = $("#input1").val();
  var dispatchDate = $("#input2").val();
  var formattedArrDate = dateFormat(new Date(arrivalDate), "ddd, mmm d");
  var formattedDispDate = dateFormat(new Date(dispatchDate), "ddd, mmm d");
  $("#dateRange1").html(formattedArrDate+" - "+formattedDispDate);

  var roomPrice = nightPrice = charges = taxFee = totalPrice = "0.00";
  var roomPrice = $("#"+roomTypeId+"_totalprice").val();
  var nightPrice =  $("#"+roomTypeId+"_nightprice").val();

  var taxFee = $("#"+roomTypeId+"_taxfees").val();
  //var totalPrice = parseInt(charges) + parseInt(taxFee);
  var totalPrice = roomPrice;

  var roomWidget= '';
  //Create Rooms Widgets
   roomWidget = '<div class="bookin-widget_avalible-room-details"><a href="javascript:void(0);">'+roomImg+'<div class="room-name_price"><div class="pull-left room-name">'+$.trim(rname1)+' <span class="lightfont">with</span><br>'+$.trim(rname2)+'</div><div class="pull-right room-price">$'+totalPrice+'<br><span class="regular-price"><span class="lightfont-dash">$ '+nightPrice+'</span>/night</span></div></a></div></div>';

   //Append the Room Widgets to the main widget
   $("#roomDetailsWidget").html(roomWidget);

  // Replace the prices
     $("#charges").html(charges);
     $("#taxfees").html(taxFee);
     $("#totalprice").html(totalPrice);
}

function getRoomDetails(roomTypeId)
{
  $.ajax({
            url: "https://qapi.reztrip.com/eanroom/"+roomTypeId,
            type: 'GET',
            dataType: 'json',
            headers: {
                'x-api-key': 'too0nxJhq43nESW5cWdH13ZB2ZIsEuG1EXcpZeL1'
            },
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                if(!response.success)
                {
                    //var roomDetails = response.roomDetails;
                    /*var roomName = roomDetails.description.split(',');
                    var roomPrice = roomDetails.Price;
                    var nightPrice = roomDetails.NightPrice;
                    var charges = roomDetails.Charges;
                    var taxFee = roomDetails.TaxFee;
                    var totalPrice = parseInt(charges) + parseInt(taxFee);*/
//static data
                    var rname = 'STUDIO993232 QUEEN, 1 QEEN BED';
                    var roomName = rname.split(',');
                    var roomPrice = 196;
                    var nightPrice = 203;
                    var roomSrc = '../images/booking-pics/Select_room-1.png';
                    var roomImg = '<img src="'+roomSrc+'" alt=""/>';
                    var arrivalDate = $("#input1").val();
                    var dispatchDate = $("#input2").val();
                    var formattedArrDate = dateFormat(new Date(arrivalDate), "ddd, mmm d");
                    var formattedDispDate = dateFormat(new Date(dispatchDate), "ddd, mmm d");
                    $("#dateRange1").html(formattedArrDate+" - "+formattedDispDate);
                    var charges = 198;
                    var taxFee = 2;
                    var totalPrice = parseInt(charges) + parseInt(taxFee);

                    var roomWidget= '';
                    //Create Rooms Widgets
                     roomWidget = '<div class="bookin-widget_avalible-room-details"><a href="#">'+roomImg+'<div class="room-name_price"><div class="pull-left room-name">'+$.trim(roomName[0])+' <span class="lightfont">with</span><br>'+$.trim(roomName[1])+'</div><div class="pull-right room-price">$'+totalPrice+'<br><span class="regular-price"><span class="lightfont-dash">$ '+nightPrice+'</span>/night</span></div></a></div></div>';
                     //Append the Room Widgets to the main widget
                       $("#roomDetailsWidget").html(roomWidget);

                    // Replace the prices
                       $("#charges").html(charges);
                       $("#taxfees").html(taxFee);
                       $("#totalprice").html(totalPrice);
              }else{
                  $("#roomDetailsWidget").html('Room Details Not Available');
              }
            },
            error: function (error) {

            }
        });
}
