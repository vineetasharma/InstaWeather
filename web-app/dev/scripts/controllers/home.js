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
                                $scope.fullName = currentLocationInfo.geolocation_data.city + ',' + currentLocationInfo.geolocation_data.country_name;
                                $scope.city = $scope.fullName;
                                $scope.WIWeatherResult = data;
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
                        $scope.fullName = location.fullName ? location.fullName : (location.name + ', ' + location.adminName1 + ', ' + location.countryName);
                        $scope.city = $scope.fullName;
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
        var day = date.getDay();
        $scope.month = monthNames[date.getMonth()];
        $scope.day = dayNames[day - 1];
        jQuery(function () {
            var options = {
                types: ['(cities)']
            };
            $("#city").geocomplete(options).bind("geocode:result", function (event, result) {
                $scope.reqLoader = true;
                $scope.WILocalionResult = null;
                $scope.WIWeatherResult = null;
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
            $scope.reqLoader = true;
            $scope.WILocalionResult = null;
            $scope.WIWeatherResult = null;
            $scope.showInfo = false;
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

        $scope.getWeather = function (result) {
            var user = $('#profileData').val();
            if (!user) {
                if (result.geonames ? (result.geonames.length > 0) : null) {
                    var cookieObject = {
                        geoNameId: result.geonames[0].geonameId,
                        locationName: result.geonames[0].name,
                        fullName: (result.geonames[0].name + ', ' + result.geonames[0].adminName1 + ', ' + result.geonames[0].countryName),
                        latitude: result.geonames[0].lat,
                        longitude: result.geonames[0].lng
                    }
                    $.cookie("location", JSON.stringify(cookieObject));

                }
                if (result.geoNameId)
                    $.cookie("location", JSON.stringify(result));
            }
            if (result.geonames) {
                if (result.geonames.length > 0) {
                    $scope.showInfo = false;
                    $scope.reqLoader = true;
                    $scope.WILocalionResult = null;
                    $scope.WIWeatherResult = null;
                    var flag = false;
                    if ($scope.mostVisitedData) {
                        $scope.mostVisitedData.forEach(function (mostVisited) {
                            if (mostVisited.geoNameId == (result.geoNameId ? result.geoNameId : result.geonames[0].geonameId)) {
                                mostVisited.searchCount++;
                                flag = true;
                            }
                        });
                        if (!flag) {
                            $scope.mostVisitedData.push({geoNameId: result.geonames[0].geonameId,
                                locationName: result.geonames[0].name,
                                fullName: (result.geonames[0].name + ', ' + result.geonames[0].adminName1 + ', ' + result.geonames[0].countryName),
                                latitude: result.geonames[0].lat,
                                longitude: result.geonames[0].lng,
                                searchCount: 1});

                        }

                        HomeService.updateOrSaveLocationDetails(result);
                        HomeService.getWeatherDetails(result, function (weatherInfo) {
                            $scope.fullName = result.geonames[0].name + ', ' + result.geonames[0].adminName1 + ', ' + result.geonames[0].countryName;
                            $scope.city = $scope.fullName;
                            $scope.WIWeatherResult = weatherInfo;
                            $scope.$apply();
                        });

                    }
                    else {
                        $scope.reqLoader = false;
                        $scope.showInfo = true;
                        $scope.$apply();
                    }

                }
                else {
                    $scope.reqLoader = false;

                    $scope.showInfo = true;
                }
            }
            else if (result.geoNameId) {
                $scope.showInfo = false;
                $scope.reqLoader = true;
                $scope.WILocalionResult = null;
                $scope.WIWeatherResult = null;
                var flag = false;
                if ($scope.mostVisitedData) {
                    $scope.mostVisitedData.forEach(function (mostVisited) {
                        if (mostVisited.geoNameId == (result.geoNameId ? result.geoNameId : result.geonames[0].geonameId)) {
                            mostVisited.searchCount++;
                            flag = true;
                        }
                    });
                    if (!flag) {
                        $scope.mostVisitedData.push({geoNameId: result.geonames[0].geonameId,
                            locationName: result.geonames[0].name,
                            fullName: (result.geonames[0].name + ', ' + result.geonames[0].adminName1 + ', ' + result.geonames[0].countryName),
                            latitude: result.geonames[0].lat,
                            longitude: result.geonames[0].lng,
                            searchCount: 1});

                    }
                }
                HomeService.updateOrSaveLocationDetails(result);
                HomeService.getWeatherDetails(result, function (weatherInfo) {
                    $scope.fullName = result.fullName;
                    $scope.city = $scope.fullName;
                    $scope.WIWeatherResult = weatherInfo;
                    $scope.$apply();
                });


            }
        }

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
