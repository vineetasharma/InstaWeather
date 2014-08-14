/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('homeCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
        jQuery(function () {
            var options = {
                types: ['(cities)']
            };
            $("#city").geocomplete(options);
        });

        /*login pop up*/
        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };

/*
        $scope.getLastSearchLocation = function () {
            console.log("getLastSearchLocation called...............");
            HomeService.getLastSearchLocation(function (location) {
                if (location) {
                    $scope.getWeather(location);
                }
                else{
                    console.log("location data is null for last search");
                }
            });
        };
*/

        (function () {
            HomeService.getMostSearchPlaceDetails(function (data) {
                $scope.mostVisitedData = data;
            });
            HomeService.getLastSearchLocation(function (location) {
                if (location!=='null') {
                    $scope.getWeather(location);
                }
                else{
                    console.log("location data is null for last search");
                }
            });
        })();

        /*recieving location information and then weather information to show weather information on home page*/
        $scope.getDetails = function () {
            $scope.WILocalionResult = null;
            $scope.WIWeatherResult = null;

            $scope.showInfo = false;
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
        };


        $scope.getWeather = function (result) {
            var flag = false;
            $scope.mostVisitedData.forEach(function (mostVisited) {
                if (mostVisited.geoNameId == result.geoNameId) {
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
                $scope.fullName = result.fullName ? result.fullName : (result.geonames[0].name + ', ' + result.geonames[0].adminName1 + ', ' + result.geonames[0].countryName);
                $scope.city = $scope.fullName;
                $scope.WIWeatherResult = weatherInfo;
                console.log("weather info in homejs", weatherInfo);
                $scope.$apply();
            });
        };
    }]);
