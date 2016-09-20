angular.module('ean').config(['$httpProvider', function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
}]);

angular.module('ean')
.factory('eanHotelsInfo', function($http) {
  return {
    async: function(path)
    {
        return $http.get(window.apiConfig.host+'/'+path, { headers: {'x-api-key': window.apiConfig.key} });
  	}

  };
})
.factory('eanHotelDetails', function($http) {
  return {
    async: function(path)
    {
      
      return $http.get(window.apiConfig.host + '/eanhotel/'+path, { headers: {'x-api-key': window.apiConfig.key} }, {params:{"ID": path}});
  	}
  };
})

.factory('eanRooms', function($http) {
  return {
    async: function(path)
    {
      
      return $http.get(window.apiConfig.host + '/eanrooms/'+path, { headers: {'x-api-key': window.apiConfig.key}}, {params:{"ID": path}});
    }
  };
})

.factory('eanRoomDetails', function($http) {
  return {
    async: function(roomtypeCode)
    {

      return $http.get(window.apiConfig.host + '/eanroom/'+roomtypeCode, { headers: {'x-api-key': window.apiConfig.key}});
    }
  };
})

.controller('MainCtrl', ['$scope','$rootScope','eanRooms', 'eanRoomDetails', function ($scope, $rootScope, eanRooms, eanRoomDetails) {


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
                            owlPic:'/images/dummy.png', 
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
          });
console.log("new gak"+$scope.gallery);
  $scope.items2 = ["http://media.expedia.com/hotels/1000000/800000/798800/798798/798798_63_z.jpg", "http://media.expedia.com/hotels/1000000/800000/798800/798798/798798_92_z.jpg", "http://media.expedia.com/hotels/1000000/800000/798800/798798/798798_71_z.jpg"];
}]).directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
              // provide any default options you want
                var defaultOptions = {
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for(var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
})
.directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);




