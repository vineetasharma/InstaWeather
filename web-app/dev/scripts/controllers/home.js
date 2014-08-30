angular.module('yoApp')
    .controller('homeCtrl', ['$scope', 'HomeService', '$interval', function ($scope, HomeService, $interval) {
        var user = $('#profileData').val();
        if (!user) {
            var cookieInfo = $.cookie('location');
            if (!cookieInfo) {
                $scope.reqLoader = true;
                HomeService.showCurrentLocationInfo(myip, function (currentLocationInfo) {
                    if (currentLocationInfo) {
                        HomeService.getWeatherDetails(currentLocationInfo, function (data) {
                            if (data) {
                                $scope.reqLoader = false;
                                $scope.WIWeatherResult = data;
                                $scope.fullName = currentLocationInfo.fullName;
                                $scope.$apply();
                            }

                        });
                    }

                });

            }
            else {
                $scope.reqLoader = true;
                var location = JSON.parse(cookieInfo);
                HomeService.getWeatherDetails(location, function (data) {
                    if (data) {
                        $scope.reqLoader = false;
                        $scope.fullName = location.fullName ;
                        $scope.WIWeatherResult = data;
                    }
                });
            }
        }
        else {
            HomeService.getLastSearchLocation(function (location) {
                if (location !== 'null' && location) {
                    $scope.getWeather(location);
                }
                else {
                    $scope.reqLoader = false;
                }
            });
        }

        $scope.format = 'h:mm';
        $scope.formatDate = 'd';
        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        var date = new Date();
        $scope.month = monthNames[date.getMonth()];
        $scope.day = dayNames[date.getDay() - 1];

        jQuery(function () {
            var options = {
                types: ['(cities)']
            };
            $("#city").geocomplete(options).bind("geocode:result", function (event, result) {
                init();
                HomeService.getDetails(function (result) {
                    if (result) {
                        $scope.WILocalionResult = result;
                       $scope.getWeather(result);
                    }
                    else {
                        $scope.showInfo = true;
                        $scope.$apply();
                    }
                });

            });

        });

        HomeService.getMostSearchPlaceDetails(function (data) {
            $scope.mostVisitedData = data;
        });

        /*recieving location information and then weather information to show weather information on home page*/
        $scope.getDetails = function () {
            init();
            HomeService.getDetails(function (result) {
                if (result) {
                    $scope.WILocalionResult = result;
                    $scope.getWeather(result);
                    $scope.reqLoader = false;
                }
                else {

                    $scope.showInfo = false;
                    $scope.$apply();
                }
            });
        };

        /*Initialize some common variables*/
        var init=function(){
            $scope.showInfo = false;
            $scope.reqLoader = true;
            $scope.WILocalionResult = null;
            $scope.WIWeatherResult = null;
        };

        var createCookieObject=function(geoData){
            var cookieObject = {
                geoNameId: geoData.geoNameId,
                locationName: geoData.locationName,
                fullName: geoData.fullName,
                latitude: geoData.latitude,
                longitude: geoData.longitude
            };
            $.cookie("location", JSON.stringify(cookieObject));
        };

        $scope.getWeather = function (geoData) {
            var user = $('#profileData').val();
            if (!user && geoData) {
                createCookieObject(geoData);
            }
            if (geoData) {
                init();
                var flag = false;
                if ($scope.mostVisitedData) {
                    $scope.mostVisitedData.forEach(function (mostVisited) {
                        if (mostVisited.geoNameId == geoData.geoNameId) {
                            mostVisited.searchCount++;
                            flag = true;
                        }
                    });
                    if (!flag) {
                        $scope.mostVisitedData.push({geoNameId:  geoData.geoNameId,
                            locationName: geoData.locationName,
                            fullName: geoData.fullName,
                            latitude: geoData.latitude,
                            longitude: geoData.longitude,
                            searchCount: 1});

                    }

                    HomeService.updateOrSaveLocationDetails(geoData);
                    HomeService.getWeatherDetails(geoData, function (weatherInfo) {
                        $scope.fullName = geoData.fullName;
                        $scope.WIWeatherResult = weatherInfo;
                        $scope.$apply();
                    });

                }
            }
            else {
                $scope.reqLoader = false;
                $scope.showInfo = true;
            }
        };


    }   ])
    .
    directive('myCurrentTime', ['$interval', 'dateFilter',
        function ($interval, dateFilter) {
            return function (scope, element, attrs) {
                var format,
                    stopTime;

                function updateTime() {
                    element.text(dateFilter(new Date(), format));
                }

                scope.$watch(attrs.myCurrentTime, function (value) {
                    format = value;
                    updateTime();
                });

                stopTime = $interval(updateTime, 1000);
                element.on('$destroy', function () {
                    $interval.cancel(stopTime);
                });
            }
        }]);
