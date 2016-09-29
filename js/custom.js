$(document).ready(function(){
  $(document).on("click", ".readon", function() {
     var owlid = $(this).attr('data-id');
     $('.contTabs li:last').tab('show');
     $('#rooms-carousel').carousel(parseInt(owlid));
  });


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




  //$('#sandbox-container div').datepicker({

  //});




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

    $('.btn-number').click(function(e){
           e.preventDefault();

           var fieldName = $(this).attr('data-field');
           var type      = $(this).attr('data-type');
           var input = $("input[name='"+fieldName+"']");
           var currentVal = parseInt(input.val());
           if (!isNaN(currentVal)) {
               if(type == 'minus') {
                   var minValue = parseInt(input.attr('min'));
                   if(!minValue) minValue = 1;
                   if(currentVal > minValue) {
                       input.val(currentVal - 1).change();
                   }
                   if(parseInt(input.val()) == minValue) {
                       $(this).attr('disabled', true);
                   }

               } else if(type == 'plus') {
                   var maxValue = parseInt(input.attr('max'));
                   if(!maxValue) maxValue = 999;
                   if(currentVal < maxValue) {
                       input.val(currentVal + 1).change();
                   }
                   if(parseInt(input.val()) == maxValue) {
                       $(this).attr('disabled', true);
                   }

               }
           } else {
               input.val(0);
           }
       });
       $('.input-number').focusin(function(){
          $(this).data('oldValue', $(this).val());
       });
       $('.input-number').change(function() {

           var minValue =  parseInt($(this).attr('min'));
           var maxValue =  parseInt($(this).attr('max'));
           if(!minValue) minValue = 1;
           if(!maxValue) maxValue = 999;
           var valueCurrent = parseInt($(this).val());

           var name = $(this).attr('name');
           if(valueCurrent >= minValue) {
               $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
           } else {
               alert('Sorry, the minimum value was reached');
               $(this).val($(this).data('oldValue'));
           }
           if(valueCurrent <= maxValue) {
               $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
           } else {
               alert('Sorry, the maximum value was reached');
               $(this).val($(this).data('oldValue'));
           }


       });
       $(".input-number").keydown(function (e) {
               // Allow: backspace, delete, tab, escape, enter and .
               if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                    // Allow: Ctrl+A
                   (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                   (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
               }
               // Ensure that it is a number and stop the keypress
               if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                   e.preventDefault();
               }
       });



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
   					$("#input1").val(dateText);
   					$("#input2").val("");
                       $(this).datepicker();
                       $("#chkIn").html(dateFormat(new Date($("#input1").val()), "ddd, mmm d"));
                       $("#chkOut").html('');

                   } else if( selectedDate < date1 ) {
                       $("#input2").val( $("#input1").val() );
                       $("#input1").val( dateText );
                       $(this).datepicker();
                       $("#chkIn").html(dateFormat(new Date($("#input1").val()), "ddd, mmm d"));
                       $("#chkOut").html(" - "+dateFormat(new Date($("#input2").val()), "ddd, mmm d"));
                   } else {
   					$("#input2").val(dateText);
                       $(this).datepicker();
                       $("#chkOut").html(" - "+dateFormat(new Date($("#input2").val()), "ddd, mmm d"));

   				}

   			}
   		});


/*** Start -- Api Call to search the available rooms ***/
        $(".booking-widget_select_rooms_button").on("click",function()  {
          var numAdults = $("#numAdults").val();
          var numChilds = $("#numChild").val();
          var arrivalDate = $("#input1").val();
          var dispatchDate = $("#input2").val();
          var roomsWidget= '';
          var countRooms = 0;
          var formattedArrDate = dateFormat(new Date(arrivalDate), "ddd, mmm d");
          var formattedDispDate = dateFormat(new Date(dispatchDate), "ddd, mmm d");
          var hotelId = $("#hotel_id").val();
          $(".roomcount").html('');
          $("#dateRange").html(formattedArrDate+" - "+formattedDispDate);
          $("#availableRoomsDiv").html('');
          $("#selectedRoomImage").val('');
          $.ajax({
                    url: "https://qapi.reztrip.com/eansearch?eanHotelId="+hotelId+"&arrivalDate="+arrivalDate+"&departureDate="+dispatchDate+"&numberOfAdults="+numAdults+'&numberOfChildren='+numChilds,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'x-api-key': 'too0nxJhq43nESW5cWdH13ZB2ZIsEuG1EXcpZeL1'
                    },
                    contentType: 'application/json; charset=utf-8',
                    /*beforeSend: function(){
                    $('.loader').show();
                    },*/
                    success: function (roomsResponse) {

                        //Fetch all the dynamic parameters from response
                        var hotelRoomAvailability = roomsResponse.HotelRoomAvailabilityResponse;
                        if(parseInt(hotelRoomAvailability['@size']) > 0 )
                        {
                            var roomsArr = roomsResponse.HotelRoomAvailabilityResponse.HotelRoomResponse;
                            countRooms = roomsArr.length;

                            $(".roomcount").html(countRooms);
                            var roomsWidget= '';
                           if(countRooms > 0)
                           {
                              $.each(roomsArr, function(name, roomObj) {
                                //Fetch all the dynamic parameters from response

                                var roomName = '';
                                var roomname1 = roomname2 = '';
                                if(roomObj.roomTypeDescription.indexOf(",") != -1)
                                {
                                  roomName = roomObj.roomTypeDescription.split(',');
                                  roomname1 = roomName[0];
                                  roomname2 = roomName[1];
                                }else{
                                  roomname1 = roomObj.roomTypeDescription;
                                }
                                var totalPrice = priceFormat(roomObj.RateInfos.RateInfo.ChargeableRateInfo['@total']);
                                var nightPrice = priceFormat(roomObj.RateInfos.RateInfo.ChargeableRateInfo['@nightlyRateTotal']);
                                var surcharges = priceFormat(roomObj.RateInfos.RateInfo.ChargeableRateInfo['@surchargeTotal']);
                                var roomTypeId = roomObj.roomTypeCode;
                                var rateKey = roomObj.RateInfos.RateInfo.RoomGroup.Room.rateKey;
                                var rateCode = roomObj.rateCode;
                                var roomCode = roomTypeId;
                                var bedTypeId = roomObj.BedTypes.BedType['@id'];
                                var smokingPref = roomObj.smokingPreferences;
                                //get room image
                                getRoomImage(roomTypeId);
                                var roomSrc = $("#selectedRoomImage").val();
                                //var roomImg = '<img src="'+roomSrc+'" alt=""/>';
                                var roomImg = '<img class="'+roomTypeId+'_show_image_room_dtls" src="'+roomSrc+'" alt=""/>';
                                var roomSrc_Hid = '<input type="hidden" id="'+roomTypeId+'_roomnimage" value="'+roomSrc+'"/>';
                                //create require params hidden vars
                                var roomName_1Hid = '<input type="hidden" id="'+roomTypeId+'_roomname1" value="'+roomname1+'"/>';
                                var roomName_2Hid = '<input type="hidden" id="'+roomTypeId+'_roomname2" value="'+roomname2+'"/>';
                                var totalPriceHid = '<input type="hidden" id="'+roomTypeId+'_totalprice" value="'+totalPrice+'"/>';
                                var nightPriceHid = '<input type="hidden" id="'+roomTypeId+'_nightprice" value="'+nightPrice+'"/>';
                                var taxfeesHid = '<input type="hidden" id="'+roomTypeId+'_taxfees" value="'+surcharges+'"/>';
                                var rateKey_Hid = '<input type="hidden" id="'+roomTypeId+'_ratekey" value="'+rateKey+'"/>';
                                var rateCode_Hid = '<input type="hidden" id="'+roomTypeId+'_ratecode" value="'+rateCode+'"/>';
                                var roomCode_Hid = '<input type="hidden" id="'+roomTypeId+'_roomcode" value="'+roomTypeId+'"/>';
                                var bedTypeId_Hid = '<input type="hidden" id="'+roomTypeId+'_bedtypeid" value="'+bedTypeId+'"/>';
                                var smokingPref_Hid = '<input type="hidden" id="'+roomTypeId+'_smokingpref" value="'+smokingPref+'"/>';

                                var roomNameDiv = '';
                                if(roomname2 == '')
                                  roomNameDiv = '<div class="pull-left room-name">'+$.trim(roomname1)+'</div>';
                                else
                                  roomNameDiv = '<div class="pull-left room-name">'+$.trim(roomname1)+' <span class="lightfont">with</span><br>'+$.trim(roomname2)+'</div>';


                                //Create Rooms Widgets
                                 roomsWidget += '<div class="bookin-widget_avalible-rooms"><div class="bookin-widget_avalible-room-details" id="avalible-room-details" data-roomTypeId="'+roomTypeId+'"><a href="javascript:void(0);">'+roomImg+'<div class="room-name_price">'+roomNameDiv+'<div class="pull-right room-price"><span class="checkout-details-regular-price"><span  class="checkout-details-lightfont-dash">$'+Math.round(nightPrice)+'</span>/night</span></div></a></div></div>'+roomSrc_Hid+roomName_1Hid+roomName_2Hid+totalPriceHid+nightPriceHid+taxfeesHid+rateKey_Hid+rateCode_Hid+roomCode_Hid+bedTypeId_Hid+smokingPref_Hid+'</div>';

                              });

                              //Append the Room Widgets to the main widget
                                $("#availableRoomsDiv").html(roomsWidget);

                            } //end if
                      }else{
                          $("#availableRoomsDiv").html(countRooms);
                          $("#availableRoomsDiv").html('No Rooms Available');
                      }
                    },
                    error: function (error) {

                    }/*,
                    complete: function(){
                      $('.loader').hide();
                    },*/
                });
        });
/*** End -- Api Call to fetch the available rooms ***/

});
