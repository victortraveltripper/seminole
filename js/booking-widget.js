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



$('#step2, #step3, #step4').fadeOut(500);
$('.booking-widget_select_rooms_button').click(function(){
   $('#step1').fadeOut(500);
   $('#step2').fadeIn(500);
});


//$('.bookin-widget_avalible-room-details').on('click',function(){
$("body").on('click', '#avalible-room-details',function(){
   $('#step1').hide();
   $('#step2').hide();
   $('#step3').show();
   //getRoomDetails($(this).attr('data-roomTypeId'));
   showRoomDetails($(this).attr('data-roomTypeId'));

});

$('.bookin-widget_booknow').click(function(){
   $('#step1').fadeOut(500);
   $('#step2').fadeOut(500);
   $('#step3').fadeOut(500);
   $('#step4').fadeIn(500);

});


$('.back').click(function(){
   $('#step1').fadeIn(500);
   $('#step2').fadeOut(500);

});

$('.back1').click(function(){
   $('#step1').fadeOut(500);
   $('#step2').fadeIn(500);
   $('#step3').fadeOut(500);
});

$('.back2').click(function(){
   $('#step1').fadeOut(500);
   $('#step2').fadeOut(500);
   $('#step3').fadeIn(500);
   $('#step4').fadeOut(500);
});
});

function showRoomDetails(roomTypeId)
{
  var rname1 = $("#"+roomTypeId+"_roomname1").val();
  var rname2 = $("#"+roomTypeId+"_roomname2").val();
  var roomSrc = '../images/Select_room-1.JPG';
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
  charges = nightPrice;
  var roomWidget= '';
  $("#selectedRoomTypeId").val(roomTypeId);
  //Create Rooms Widgets
   roomWidget = '<div class="bookin-widget_avalible-room-details"><a href="javascript:void(0);">'+roomImg+'<div class="room-name_price"><div class="pull-left room-name">'+$.trim(rname1)+' <span class="lightfont">with</span><br>'+$.trim(rname2)+'</div><div class="pull-right room-price">$'+totalPrice+'<br><span class="regular-price"><span class="lightfont-dash">$ '+nightPrice+'</span>/night</span></div></a></div></div>';

   //Append the Room Widgets to the main widget
   $("#roomDetailsWidget").html(roomWidget);

  // Replace the prices
     $("#charges").html(charges);
     $("#taxfees").html(taxFee);
     $("#totalprice").html(totalPrice);
}

function bookNow(roomTypeId)
{
  //alert("func");

  //create require params hidden vars
  var roomName_1Hid = $('#'+roomTypeId+'_roomname1').val();
  var roomName_2Hid =  $('#'+roomTypeId+'_roomname2').val();
  var totalPriceHid =  $('#'+roomTypeId+'_totalprice').val();
  var nightPriceHid = $('#'+roomTypeId+'_nightprice').val();
  var taxfeesHid =  $('#'+roomTypeId+'_taxfees').val();
  var rateKeyHid = $('#'+roomTypeId+'_ratekey').val();
  var rateCodeHid = $('#'+roomTypeId+'_ratecode').val();
  var roomCodeHid = $('#'+roomTypeId+'_roomcode').val();
  var bedTypeIdHid = $('#'+roomTypeId+'_bedtypeid').val();
  var smokingPrefHid = $('#'+roomTypeId+'_smokingpref').val();
  var ccdate = $("#expiry").val();
  var ccexpiry = ccdate.split('/');
  var booknow_postdata =
  {
    "eanHotelId": $("#hotel_id").val(),
    "arrivalDate": $("#input1").val(),
    "departureDate": $("#input2").val(),
    "rateKey": rateKeyHid,
    "roomCode": roomCodeHid,
    "rateCode": rateCodeHid,
    "chargeableRate": totalPriceHid,
    "rooms": [
      {
        "numberOfAdults": $("#numAdults").val(),
        "numberOfChildren": $("#numChild").val(),
        "firstName": roomName_1Hid,
        "lastName": roomName_2Hid,
        "bedTypeId": bedTypeIdHid,
        "smokingPreference" : smokingPrefHid
      }
    ],
    "reservationInfo":
    {
        "firstName": $.trim($("#firstname").val()),
        "lastName": $.trim($("#lastname").val()),
        "email": $.trim($("#email").val()),
        "homePhone": $.trim($("#mobile").val()),
        "creditCardType": "CA",
        "creditCardNumber": $.trim($("#ccnum").val()),
        "creditCardIdentifier": $.trim($("#cvc").val()),
        "creditCardExpirationMonth": $.trim(ccexpiry[0]),
        "creditCardExpirationYear": $.trim(ccexpiry[1])
    },
    "addressInfo":
    {
      "address1": $("#address").val(),
      "address2": "",
      "address3": "",
      "city": $("#city").val(),
      "stateProvinceCode": $("#state").val(),
      "countryCode": $("#country").val(),
      "postalCode": $("#zipcode").val()
    }
  };

console.log(JSON.stringify(booknow_postdata));

  $.ajax({
            url: "https://qapi.reztrip.com/eanbook",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(booknow_postdata),
            headers: {
                'x-api-key': 'too0nxJhq43nESW5cWdH13ZB2ZIsEuG1EXcpZeL1'
            },
            //contentType: 'application/json; charset=utf-8',
            success: function (response) {
              //alert("stest");
                if(response.HotelRoomReservationResponse.processedWithConfirmation)
                {
                   alert("success");
                  return false;
                }else{
                  //  $("#roomDetailsWidget").html('Room Details Not Available');
                  alert("failed");
                  return false;
                }
              },
              error: function (error) {

              }
              });

} //function


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
