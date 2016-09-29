angular.module('ean')
.controller('eanInitCtrl', ['$scope','$rootScope','$location','eanHotelsInfo', 'eanHotelDetails', function ($scope, $rootScope, $location, eanHotelsInfo, eanHotelDetails){
    $scope.hotelDetails={};
    $rootScope.locationHash = angular.element('#hotel_id').val();
    console.log(angular.element('#hotel_id').val());
    //service to get global ean Hotels present in the api
    eanHotelsInfo.async('eanhotels').then(function(d) {
        $scope.availableHotels = d.data.hotels
        $scope.hotelInfo=createHotelInfo(d.data.hotels,$rootScope.locationHash);
        $scope.latitude=$scope.hotelInfo.latitude;
        $scope.longitude=$scope.hotelInfo.longitude;

        // init the map here
        var latlng = new google.maps.LatLng($scope.latitude,$scope.longitude);
		var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        var styles = [{
                "featureType": "landscape.man_made",
                "stylers": [{ "color": "#f0ede5" }]
            },{
                "featureType": "water",
                "stylers": [{ "color": "#a3ccff" }]
            },{
                "featureType": "landscape.natural",
                "stylers": [{ "color": "#cbe6a3" }]
            },{
                "featureType": "road.highway",
                "stylers": [{ "color": "#fdedb1" }]
            },{
                "featureType": "poi",
                "stylers": [{ "visibility": "off" }]
        }];
		var myOptions = {
			zoom: 12,
  			center: latlng,
  			mapTypeId: google.maps.MapTypeId.ROADMAP,
  			disableDefaultUI: true,
  			styles: styles,
            scrollwheel: false,
            draggable: false
  		};
        var map = new google.maps.Map(document.getElementById('map'), myOptions);
        $scope.map = map
        var marker = new google.maps.Marker({
            position: latlng,
            icon: '../images/map-icon.svg',
            map: map,
  		        title: $scope.hotelInfo.name
        });

        $(map.getDiv()).click(function(map) {
           map.setOptions({
               scrollwheel: true,
               draggable: true
           })
        }.bind(this, map));
        $(map.getDiv()).mouseout(function(map) {
           map.setOptions({
               scrollwheel: false,
               draggable: false
           })
        }.bind(this, map));
        $(map.getDiv()).bind('touchend', function(map) {
           map.setOptions({
               scrollwheel: false,
               draggable: false
           })
        }.bind(this, map));


        // service to get hotelInfo depending on the hotel Id provided as parameter
        if (!$rootScope.locationHash) {
            var hotels = [];
            var items = $scope.availableHotels
            for(var i = 0; i < items.length; i++) {
                hotels.push(items[i].name +  ' (' + items[i].hotelId + ')');
            }
            alert('Specify query string ?ID=<id> with one of\n' + hotels.join("\n"));
        }
        eanHotelDetails.async($rootScope.locationHash).then(function(d) {
            if(d.data.hotelDetails!==null) {
                $scope.hotelDetails.propertyDescription=d.data.hotelDetails.propertyDescription;
                $scope.hotelDetails.propertyDescription = $scope.hotelDetails.propertyDescription
                    .replace(/<p>/g,'<div>')
                    .replace(/<\/p>/g,'</div>')
                    .replace(/<b>/g,'<h3>')
                    .replace(/<\/b>/g,'</h3>')
                    .replace(/<br\s?\/?>/g,'');
                    $scope.hotelDetails.amenitiesDescription=d.data.hotelDetails.amenitiesDescription;
                $scope.hotelDetails.roomDetailDescription=d.data.hotelDetails.roomDetailDescription;
                $scope.hotelDetails.roomFeesDescription=d.data.hotelDetails.roomFeesDescription;
                $scope.hotelDetails.knowBeforeYouGoDescription=d.data.hotelDetails.knowBeforeYouGoDescription;
                $scope.hotelDetails.checkInTime=d.data.hotelDetails.checkInTime;
                $scope.hotelDetails.checkOutTime=d.data.hotelDetails.checkOutTime;
                $scope.hotelDetails.locationDescription=d.data.hotelDetails.locationDescription
                $scope.hotelDetails.areainfo=processAreaInfo(d.data.hotelDetails.areaInformation)
            } else {
                var hotels = [];
                var items = $scope.availableHotels
                for(var i = 0; i < items.length; i++) {
                    hotels.push(items[i].name +  ' (' + items[i].hotelId + ')');
                }
                alert($rootScope.locationHash + ' not found, try\n' + hotels.join("\n"));
            }
         if(d.data.propertyAmenities!=null) {
             $scope.amenities=createAmenities(d.data.propertyAmenities, $rootScope.locationHash);
             //console.log($scope.amenities);
         }
   });

});

        function processAreaInfo(htmlText) {
            htmlText = htmlText.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&apos;/g,"'");
            // find all the paragrapahs
            var reg = new RegExp(/<p>(.+?)<\/p>/g);
            var matches = [];
            result = reg.exec(htmlText)
            lines = result[1].split("<br />")
            for(var i=0;i<lines.length;i++) {
                var line = lines[i]
                line_parts = line.split(" - ")
                matches.push(line_parts[0])
            }
            text = ""
            while(result = reg.exec(htmlText)) {
                text += result[0]
            }
            return matches

        }

       function createAmenities(items, param)
       {

          var details=[];

          for(var i = 0; i < items.length; i++)

          {
              if(items[i].hotelId == param)
              {
                details.push(items[i].amenity);

              }
          }

        return details;

       }


	function createHotelInfo(items, param) {

      var details={};
      for(var i = 0; i < items.length; i++) {

      	if(items[i].hotelId == param)
      	{
        	details.name=items[i].name;
        	details.address1=items[i].address1;
        	details.city=items[i].city;
        	details.stateProvinceCode=items[i].stateProvinceCode;
        	details.postalCode=items[i].postalCode;
        	details.countryCode=items[i].countryCode;
        	details.propertyCategory=items[i].propertyCategory;
        	details.hotelRating=items[i].hotelRating;
        	details.locationDescription=items[i].locationDescription;
        	details.highRate=items[i].highRate;
        	details.lowRate=items[i].lowRate;
        	details.latitude=items[i].latitude;
        	details.longitude=items[i].longitude;

    	}
      }

      return details;

    }


}])

.controller('roomsInitCtrl', ['$scope','$rootScope','eanRooms', 'eanRoomDetails', function ($scope, $rootScope, eanRooms, eanRoomDetails) {
    $scope.roomCode=[];
    $scope.gallery=[];
    $scope.carousel=[];
    $scope.roomamenities=[];
    $scope.roomdesp=[];
    $scope.roomInfo=[];
    $scope.galleryThumb=[];

    eanRooms.async($rootScope.locationHash).then(function(d) {
        $scope.roomsCount=d.data.rooms.length;
        $scope.roomCode=createroomCodes(d.data.rooms);
        for( var i=0; i<$scope.roomCode.length;i++) {
            eanRoomDetails.async($scope.roomCode[i]).then(function(d) {
                if(d.data.roomDetails.length!=0) {
                    var roomHeader=d.data.roomDetails.description.split(',');
                    if(d.data.roomImages.length!=0) {
                        roomImageUrl = getValidRoomImage(d.data.roomImages);
                        if (roomImageUrl) {
                            $scope.roomInfo.push({
                                owlPic: roomImageUrl,
                                roomHead: roomHeader[0],
                                roomCaption: roomHeader[1],
                                roomFeature: roomHeader[2],
                                longdesp: d.data.roomDetails.descriptionLong
                            });
                            if ($scope.carousel.length < 5) {
                                $scope.carousel.push(roomImageUrl);
                            }
                            $scope.gallery = galleryImgArr(d.data.roomImages,'big');
                            $scope.galleryThumb = galleryImgArr(d.data.roomImages,'small');
                        }
                    } else {
                        $scope.roomInfo.push({
                            owlPic:'/images/dummy.jpg',
                            roomHead: roomHeader[0],
                            roomCaption:roomHeader[1],
                            roomFeature:roomHeader[2],
                            longdesp:d.data.roomDetails.descriptionLong
                        });
                    }
                }
                if(d.data.roomAmenities.length!=0 && $scope.loop==false) {
                    var len=d.data.roomAmenities.length;
                    for (var j=0; j<len;j++) {
                        $scope.roomamenities.push(d.data.roomAmenities[j].amenity);
                        $scope.loop=true;
                    }
                }
            });
        }

        $('#homebanner').carousel()



    });

    function getValidRoomImage(roomImageList) {
        for(var i=0; i< roomImageList.length; i++) {
            var image_url = roomImageList[i].url.replace('_s', '_z')
            return image_url;
            // $.get(image_url).done(function(a,b,c) {
            //     console.log(a,b,c)
            // })
            // var http = new XMLHttpRequest();
            // http.open('HEAD', image_url.replace('http','https'), false);
            // http.send();
            // if (http.status != 404) {
            //     return image_url
            // }
        }
        return null;
    }

    function createroomCodes(items) {
        var roomCodes=[];
        for(var i = 0; i < items.length; i++) {
            roomCodes[i]=items[i].roomTypeId;
        }
        return roomCodes;
    }

    function galleryImgArr(items, param) {
        var arr=[];
        for(var i = 0; i < items.length; i++) {
            if(param=='big') {
                arr.push(items[i].url.replace('_s','_z'));
            } else {
                arr.push(items[i].url);
            }
        }
        return arr;
    }
 	// Gallery Section - initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.gallery.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.gallery.length - 1) ? ++$scope._Index : 0;
    };


    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

}])
