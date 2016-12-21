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

      $('#step1').fadeIn(500);

      $('#step2').fadeOut(500);
      $('#step3').fadeOut(500);
      $('#step4').fadeOut(500);
      document.getElementById("selectedRoomTypeId") == "";
      document.getElementById("selectedRoomImage") =="";
      clearValues();

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
   $('#step1').fadeOut(500);
   $('#step2').fadeOut(500);
   $('#step3').fadeIn(500);
   //getRoomDetails($(this).attr('data-roomTypeId'));
   showRoomDetails($(this).attr('data-roomTypeId'));

});

$("body").on('click', '#booknow_widget_back',function(){
  $("#ccnum").val('');
  $("#expiry").val('');
  $("#cvc").val('');
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
   $('.loader').hide();
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

  $('.booking-widget_close').click(function(){
    $('.loader').hide();
  });


});



function showRoomDetails(roomTypeId)
{
  var roomSrc = $("#"+roomTypeId+"_roomnimage").val();
  //call api to get Room Image

  var rname1 = rname2 = '';
  var roomImg = '<img class="'+roomTypeId+'_show_image_room_dtls" src="'+roomSrc+'" alt=""/>';
  var rname1 = $("#"+roomTypeId+"_roomname1").val();
  var rname2 = $("#"+roomTypeId+"_roomname2").val();
  var numAdults = $("#numAdults").val();
  var numChilds = $("#numChild").val();
  var arrivalDate = $("#input1").val();
  var dispatchDate = $("#input2").val();
  var formattedArrDate = dateFormat(new Date(arrivalDate), "ddd, mmm d");
  var formattedDispDate = dateFormat(new Date(dispatchDate), "ddd, mmm d");
  $("#dateRange1").html(formattedArrDate+" - "+formattedDispDate);

  var roomPrice = nightPrice = charges = taxFee = totalPrice = "0.00";
  var roomPrice = priceFormat($("#"+roomTypeId+"_totalprice").val());
  var nightPrice =  priceFormat($("#"+roomTypeId+"_nightprice").val());
    var nightlyRateTotalHid =  priceFormat($("#"+roomTypeId+"_nightlyRateTotal").val());

  var taxFee = priceFormat($("#"+roomTypeId+"_taxfees").val());
  //var totalPrice = parseInt(charges) + parseInt(taxFee);
  var totalPrice = roomPrice;
  charges = nightPrice;
  var roomWidget= '';
  $("#selectedRoomTypeId").val(roomTypeId);
  $(".guestscount").html(parseInt(numAdults)+parseInt(numChilds));
  var roomNameDiv = '';

   if(rname2 == '')
    roomNameDiv = '<div class="pull-left room-name">'+$.trim(rname1)+'</div>';
   else
      roomNameDiv = '<div class="pull-left room-name">'+$.trim(rname1)+' <span class="lightfont">with</span><br>'+$.trim(rname2)+'</div>';
  //Create Rooms Widgets
   roomWidget = '<div class="bookin-widget_avalible-room-details"><a href="javascript:void(0);">'+roomImg+'<div class="room-name_price">'+roomNameDiv+'<div class="pull-right room-price">$'+totalPrice+'</div></a></div></div>';

   //Append the Room Widgets to the main widget
   $("#roomDetailsWidget").html(roomWidget);

  // Replace the prices
     $("#charges").html(nightlyRateTotalHid);
     $("#taxfees").html(taxFee);
     $("#totalprice").html(totalPrice);
}

function bookNow(roomTypeId)
{
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
        "firstName": $.trim($("#firstname").val()),
        "lastName": $.trim($("#lastname").val()),
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

  $.ajax({
            url: "",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(booknow_postdata),
            headers: {
              "x-api-key": "", "Content-Type": "application/json; charset=utf-8",
              "Accept": "application/json", "Connection": "keep-alive"
            },
            contentType: "application/json",
            success: function (response) {
                var respObj = response.HotelRoomReservationResponse;
                if(respObj.processedWithConfirmation == true)
                {
                  $("#errorMsg").hide().html('');
                  $('#step1').fadeOut(500);
                  $('#step2').fadeOut(500);
                  $('#step3').fadeOut(500);
                  $('#step4').fadeIn(500);
                  var bookedforadults = bookedforchildren = 0;
                  var bookedforadults =  $("#numAdults").val();
                  var roomName = respObj.roomDescription.split(',');
                  var bookedforchildren = $("#numChild").val();
                  var rname1 = rname2 = '';
                  var roomName =  roomNameDiv =  '' ;
                  if(respObj.roomDescription.indexOf(",") != -1){
                    var roomName = respObj.roomDescription.split(',');
                    rname1 = roomName[0];
                    rname2 = roomName[1];
                  }else{
                    rname1 = respObj.roomDescription;
                  }
                  var arrivalDate = respObj.arrivalDate;
                  var dispatchDate =  respObj.departureDate;
                  var formattedArrDate = dateFormat(new Date(arrivalDate), "ddd, mmm d - hh:MM TT");
                  var formattedDispDate = dateFormat(new Date(dispatchDate), "ddd, mmm d - hh:MM TT");
                  var fname = respObj.RateInfos.RateInfo.RoomGroup.Room.firstName;
                  var lname = respObj.RateInfos.RateInfo.RoomGroup.Room.lastName;
                  var bookin_charges = respObj.RateInfos.RateInfo.ChargeableRateInfo['@nightlyRateTotal'];
                  var bookin_taxfees = respObj.RateInfos.RateInfo.ChargeableRateInfo['@surchargeTotal'];
                  var bookin_totalprice = respObj.RateInfos.RateInfo.ChargeableRateInfo['@total'];
                  var reservation_status = respObj.reservationStatusCode;
                  //var bookInId = respObj.itineraryId;
                  var bookInId = respObj.confirmationNumbers;
                  var bookedFor = cancelPolicy = valueAdds = '' ;
                  var roomSrc =  $("#"+roomTypeId+"_roomnimage").val();
                  var mobile = $("#mobile").val();
                  var email = $("#email").val();
                  cancelPolicy = $("#"+roomTypeId+"_cancelpolicy").val();
                  valueAdds = $("#"+roomTypeId+"_valuedd").val();

                   if(rname2 == ''){
                      roomNameDiv = '<div class="pull-left room-name">'+$.trim(rname1)+'</div>';
                      $("#room_name").html(rname1);
                   }
                   else{
                      roomNameDiv = '<div class="pull-left room-name">'+$.trim(rname1)+' <span class="lightfont">with</span><br>'+$.trim(rname2)+'</div>';
                      $("#room_name").html(rname1+' with '+rname2);
                    }

                  var bookinRoomBanner = '<div class="bookin-widget_avalible-room-details"><img class="'+roomTypeId+'_show_image_room_dtls" src="'+roomSrc+'" alt=""/><div class="room-name_price">'+roomNameDiv+'<div class="pull-left room-price">$'+bookin_totalprice+'</div></div></div>';

                  $("#bookin_room_details").html(bookinRoomBanner);
                  $("#booking_id").html(bookInId);

                  if(bookedforadults > 0 && bookedforadults < 10){
                      $("#booked_for_adults").html("0"+bookedforadults);
                      bookedFor = "0"+bookedforadults;
                  }else{
                      $("#booked_for_adults").html(bookedforadults);
                      bookedFor = bookedforadults;
                    }
                    bookedFor += ' Adult(s)';
                    if(bookedforchildren > 0 &&  bookedforchildren < 10){
                      $("#booked_for_children").html("0"+bookedforchildren);
                      bookedFor += " 0"+bookedforchildren;
                    }else{
                      $("#booked_for_children").html(bookedforchildren);
                      bookedFor += " "+bookedforchildren;
                    }
                    bookedFor += ' Children';

                    $("#checkin_date").html(formattedArrDate);
                    $("#checkout_date").html(formattedDispDate);
                    $("#primary_guest").html(lname +" "+fname);
                    $("#mobile_no").html(mobile);
                    $("#email_id").html(email);
                    $("#bookin_charges").html(bookin_charges);
                    $("#bookin_taxfees").html(bookin_taxfees);
                    $("#bookin_totalprice").html(bookin_totalprice);
                    if(reservation_status == "CF"){
                      $("#reservation_status").html('CONFIRMED');

                      //Store all the Reservation Info into broswer localstorage
                      if (typeof(Storage) !== "undefined") {
                          // Store
                          //roomSrc =  $("#selectedRoomImage").val();
                          var bookin_info = {bookinId: bookInId, bookedFor: bookedFor,roomImageSrc: roomSrc, roomname1: rname1, roomname2:rname2,  checkIn: formattedArrDate, checkOut: formattedDispDate,totalPrice: bookin_totalprice,charges: bookin_charges,taxfees: bookin_taxfees, firstname: fname, lastname: lname, mobile: mobile , email: email, reservation_status: 'CONFIRMED', 'cancelPolicy': cancelPolicy ,'valueAdds': valueAdds };
                          localStorage.setItem("reservationInfo", JSON.stringify(bookin_info));
                          //console.log(localStorage.getItem("reservationInfo"));
                      } else {
                          $("#localstorage_support_errmsg") = "Sorry, your browser does not support Web Storage...";
                      } //end local storage else

                    }else
                      $("#reservation_status").html('PENDING..');
                  return false;
                }else{
                  $("#errorMsg").fadeIn(500).html(respObj.EanWsError.presentationMessage);
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
            url: "https://api.reztrip.com/eanroom/"+roomTypeId,
            type: 'GET',
            dataType: 'json',
            headers: {
                'x-api-key': 'ioYJHSv6GN2XrVMnpC44D35dHgniuu6i9YqNzIS8'
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
                     roomWidget = '<div class="bookin-widget_avalible-room-details"><a href="#">'+roomImg+'<div class="room-name_price"><div class="pull-left room-name">'+$.trim(roomName[0])+' <span class="lightfont">with</span><br>'+$.trim(roomName[1])+'</div><div class="pull-right room-price">$'+totalPrice+'<br><span class="regular-price"><span class="lightfont-dash">$ '+Math.round(nightPrice)+'</span>/night</span></div></a></div></div>';
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

function getRoomImage(roomTypeId){
  var roomSrc = '';
  $("#selectedRoomImage").val('');
  $.ajax({
            url: "https://api.reztrip.com/eanroomimages/"+roomTypeId,
            dataType: 'json',
            type: 'GET',
            async: false,
            headers: {
                'x-api-key': 'ioYJHSv6GN2XrVMnpC44D35dHgniuu6i9YqNzIS8'
            },
            success: function (responseObj) {
              //alert("hello");
              if(responseObj.success === true){
                  //var i = 0;
                //$.each(responseObj.images, function(name, imgObj) {
                  //Fetch all the dynamic parameters from response
                //  if( i == 0){
                    //alert(responseObj.images[0].smallUrl);
                    //roomSrc = responseObj.images[0].thumbUrl;

                    if(typeof responseObj.images == "undefined" || typeof responseObj.images[0] == "undefined" || responseObj.images == "null")
                        roomSrc = '/images/location.jpg';
                    else
                        roomSrc = responseObj.images[0].smallUrl;

                    $("#selectedRoomImage").val(roomSrc);
                    //alert("core :"+roomSrc);
              //$("."+roomTypeId+"_show_image_room_dtls").attr('src',roomSrc);
                    //return roomSrc;
                    //return false;
                //  }
                  //if(i > 0)
                   //return false;
                  //i++;
                //});
              }// response success
            },
            error: function (error) {
                  return roomSrc;
            }
        });

}

function showReservationInfo()
{
  if (typeof(Storage) !== "undefined")
  {
      var reservationInfo = JSON.parse(localStorage.getItem("reservationInfo"));
      //console.log("test: "+reservationInfo);
      if(reservationInfo != ""){
          $("#bookin_id").html(reservationInfo.bookinId);
          $("#booked_for").html(reservationInfo.bookedFor);
          $("#room_img").attr('src',reservationInfo.roomImageSrc);
          if(reservationInfo.roomname2 != "")
            $("#roomname").html(reservationInfo.roomname1+" with "+reservationInfo.roomname2);
          else
            $("#roomname").html(reservationInfo.roomname1);

          $("#checkindate").html(reservationInfo.checkIn);
          $("#checkoutdate").html(reservationInfo.checkOut);

          if(reservationInfo.roomname2 != "")
            $("#room_name_label").html(reservationInfo.roomname1+' <span class="checkout-details-lightfont">with</span><br>'+reservationInfo.roomname2);
          else
              $("#room_name_label").html(reservationInfo.roomname1);

          $("#img_total_price").html(reservationInfo.totalPrice);
          $("#primaryguest").html(reservationInfo.lastname+" "+reservationInfo.firstname);
          $("#mobileno").html(reservationInfo.mobile);
          $("#emailid").html(reservationInfo.email);
          $("#room_charges").html(reservationInfo.charges);
          $("#tax_fees").html(reservationInfo.taxfees);
          $("#total_price").html(reservationInfo.totalPrice);
          $("#resv_status").html(reservationInfo.reservation_status);
          $("#cancelpolicy").html(reservationInfo.cancelPolicy);
          if(reservationInfo.valueAdds.indexOf(",") != -1)
          {
              var valueAds = reservationInfo.valueAdds.split(",");
              for(var i = 0; i < valueAds.length; i++)
              {
                 if(valueAds[i] != "")
                 {
                  var valueaddstr = valueAds[i].toLowerCase();
                  if(valueaddstr.indexOf("breakfast") != -1)
                    $("#valueadds_"+i).addClass("activites-left");
                  if(valueaddstr.indexOf("internet") != -1)
                    $("#valueadds_"+i).addClass("activites-center");
                  if(valueaddstr.indexOf("airport") != -1)
                    $("#valueadds_"+i).addClass("activites-right");

                  $("#valueadds_"+i).html(valueAds[i]);
                }
              }
          }else
          {
            var valueaddstr = reservationInfo.valueAdds.toLowerCase();
              if(valueaddstr != "")
              {
                if(valueaddstr.indexOf("breakfast") != -1)
                  $("#valueadds_1").addClass("activites-left");
                if(valueaddstr.indexOf("internet") != -1)
                  $("#valueadds_1").addClass("activites-center");
                if(valueaddstr.indexOf("airport") != -1)
                  $("#valueadds_1").addClass("activites-right");
                $("#valueadds_1").html(reservationInfo.valueAdds);
             }
          }

            //console.log(localStorage.getItem("reservationInfo"));
          //localStorage.setItem("reservationInfo", '');
        }else {
            window.location = "/";
        }
    } else {
      window.location = "/";
    }
}

function priceFormat(priceval)
{
  return Math.ceil(parseFloat(priceval)); //returns string fixed to 2 decimal places
}

function clearValues()
{
    $("#appHidden").empty();
    $("#numAdults").val(1);
    $("#numChild").val(1);

    $("#availableRoomsDiv").html('');
    $("#selectedRoomImage").val('');

    resetDatePicker();
}


function resetDatePicker()
{
    $("#input1").val("");
    $("#input2").val("");
    $("#dateRange").html("");
    $("#chkIn").html('');
    $("#chkOut").html('');
    $("#bestnight_price").html("-");
    $('.booking-widget_buttons').show();
    $('.booking-widget_buttons-active').hide();
    $('.booking-widget_flexible-dates').show();
    $('.booking-widget_flexible-dates-active').hide();
    $( ".datepicker" ).datepicker( "destroy" );
    initializeUiDatePicker();

}

function initializeUiDatePicker()
{
      ///date picker

       $(".datepicker").datepicker({
        minDate: 0,
        numberOfMonths: [12,1],
        beforeShowDay: function(date) {
          var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
          var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());

          return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
        onSelect: function(dateText, inst) {
          var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
          var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
           var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText, "DD, d MM, yy");
           $('.booking-widget_buttons').hide();
           $('.booking-widget_buttons-active').show();

           $('.booking-widget_flexible-dates').hide();
           $('.booking-widget_flexible-dates-active').show();

         if (!date1 || date2) {

         /*   var arr = dateText.split('/');
            var m1 = parseInt(arr[0])-1;
            var d1 = parseInt(arr[1]);
            var y1 = parseInt(arr[2]);
            $("td[data-month='"+m1+"'][data-year='"+y1+"'] a:contains('"+d1+"')" ).parent('td').addClass('ui-state-default-checkin');
            var chkin_td_obj = $("td[data-month='"+m1+"'][data-year='"+y1+"']");*/

            /*if(chkin_td_obj.has("a:contains('"+d1+"')"))
              chkin_td_obj.addClass('ui-state-default-checkin');

            if(chkinobj) alert("hey yes");
            else alert("oops");*/
            //console.log($( "td[data-month='"+m1+"'][data-year='"+y1+"'] a:contains('"+d1+"')" ).parent('td'));
            //$("td[data-month='"+m1+"'][data-year='"+y1+"'] a:contains('"+d1+"')" ).parent('td').addClass('ui-state-default-checkin');
            //$(this).datepicker("refresh");*/


            $("#input1").val(dateText);   //ui-state-default-checkin
            $("#input2").val("");

             $(this).datepicker();
             $("#chkIn").html(dateFormat(new Date($("#input1").val()), "ddd, mmm d"));
             $("#chkOut").html('');

         } else if( selectedDate < date1 ) {
             $("#input2").val( $("#input1").val() ); //ui-state-default-checkout
             $("#input1").val( dateText );
             $(this).datepicker();
             $("#chkIn").html(dateFormat(new Date($("#input1").val()), "ddd, mmm d"));
             $("#chkOut").html(" - "+dateFormat(new Date($("#input2").val()), "ddd, mmm d"));
         } else {
              $("#input2").val(dateText);
             $(this).datepicker();
             $("#chkOut").html(" - "+dateFormat(new Date($("#input2").val()), "ddd, mmm d")); //ui-state-default-checkout

          }

          if($("#input2").val() != "")
          {
              getBestAvarageBasePrice();
          }else{
            $("#bestnight_price").html("");
          }

        }
      });

}


function getBestAvarageBasePrice()
{

  var numAdults = $("#numAdults").val();
  var numChilds = $("#numChild").val();
  var arrivalDate = $("#input1").val();
  var dispatchDate = $("#input2").val();
  var countRooms = 0;
  var hotelId = $("#hotel_id").val();
  var avgBaseRates = [];

  $.ajax({
  url: "https://api.reztrip.com/eansearch?eanHotelId="+hotelId+"&arrivalDate="+arrivalDate+"&departureDate="+dispatchDate+"&numberOfAdults="+numAdults+'&numberOfChildren='+numChilds,
  type: 'GET',
  dataType: 'json',
  headers: {
      'x-api-key': 'ioYJHSv6GN2XrVMnpC44D35dHgniuu6i9YqNzIS8'
  },
  contentType: 'application/json; charset=utf-8',

  success: function (roomsResponse) {

      //Fetch all the dynamic parameters from response
      var hotelRoomAvailability = roomsResponse.HotelRoomAvailabilityResponse;
      if(parseInt(hotelRoomAvailability['@size']) > 0 )
      {
          var roomsArr = roomsResponse.HotelRoomAvailabilityResponse.HotelRoomResponse;
          countRooms = roomsArr.length;

          var roomsWidget= '';
         if(Array.isArray(roomsArr))
         {
            if(countRooms > 0)
            {
                $.each(roomsArr, function(name, roomObj) {
                  //Fetch all the dynamic parameters from response
                  var averageBaseRate = priceFormat(roomObj.RateInfos.RateInfo.ChargeableRateInfo['@averageBaseRate']);
                  avgBaseRates.push(parseFloat(averageBaseRate));

                });
                  var bestRate = Math.min.apply(Math, avgBaseRates);
                  //Append the Room Widgets to the main widget
                  $("#bestnight_price").html('$'+bestRate);
            }
          } //end if
          else {
            var averageBaseRate = priceFormat(roomsArr.RateInfos.RateInfo.ChargeableRateInfo['@averageBaseRate']);
            avgBaseRates.push(parseFloat(averageBaseRate));
            var bestRate = Math.min.apply(Math, avgBaseRates);
            //Append the Room Widgets to the main widget
            $("#bestnight_price").html('$'+bestRate);
          }
    }else{
       $("#bestnight_price").html("");
    }
    console.log("hello"+avgBaseRates);
  },
  error: function (error) {

  }
  });

}
