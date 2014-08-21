/**
 * Created by sandeepchhapola on 30/7/14.
 */
function updateGauge() {
    var currentValues = getValidTime();

    var scales = $('#jqRadialGauge').jqRadialGauge('option', 'scales');

    scales[0].needles[0].value = currentValues.hours;
    scales[0].needles[1].value = currentValues.minutes;
    scales[0].needles[2].value = currentValues.seconds;

    $('#jqRadialGauge').jqRadialGauge('update');

    setTimeout('updateGauge()', 1000);
}

function getValidTime() {
    var currentTime = new Date();

    var hoursValue = currentTime.getHours();
    var minutesValue = currentTime.getMinutes() / 5;
    var secondsValue = currentTime.getSeconds() / 5;

    if (hoursValue > 12) {
        hoursValue -= 12;
    }

    hoursValue += (minutesValue / 12 * 11) / 12;

    return {
        hours: hoursValue,
        minutes: minutesValue,
        seconds: secondsValue
    };
}

angular.module('yoApp')
    .controller('homeCtrl', ['$scope', 'HomeService', '$interval', function ($scope, HomeService, $interval) {


            var anchorGradient = {
            type: 'radialGradient',
            x0: 0.35,
            y0: 0.35,
            r0: 0.0,
            x1: 0.35,
            y1: 0.35,
            r1: 1,
            colorStops: [
            { offset: 0, color: '#4F6169' },
                { offset: 1, color: '#252E32'}
        ]
        };


        $('#jqRadialGauge').jqRadialGauge({
            background: '#F7F7F7',
            border: {
            lineWidth: 8,
            strokeStyle: '#76786A',
            padding: 10
            },
        shadows: {
            enabled: true
            },
        anchor: {
            visible: true,
            fillStyle: anchorGradient
            },
        tooltips: {
            disabled: true,
            highlighting: false
            },
        scales: [
                {
                    minimum: 0,
                    maximum: 12,
                    interval: 1,
                    startAngle: 270,
                    endAngle: 630,
                    labels: {
                    offset: 0.85,
                    showFirstLabel: false,
                    font: '14px sans-serif'
                    },
        minorTickMarks: {
            visible: true,
            interval: 0.2,
            offset: 0.98
            },
        majorTickMarks: {
            lineWidth: 3,
            offset: 0.97
            },
        needles: [
                        {
                            value: 1,
                            type: 'pointer',
                            outerOffset: 0.5,
                            mediumOffset: 0.4,
                            width: 12,
                            fillStyle: '#252E32'
                            },
                        {
                            value: 6,
                            type: 'pointer',
                            outerOffset: 0.8,
                            mediumOffset: 0.6,
                            width: 12,
                            fillStyle: '#252E32'
                            },
                        {
                            value: 10,
                            type: 'line',
                            outerOffset: 0.8,
                            innerOffset: -0.2,
                            lineWidth: 3,
                            strokeStyle: '#B2183E'
                            }
        ]
        }
        ]
        });

        $('#jqRadialGauge').bind('labelCreating', function (event, data) {
            switch (data.text) {
            case '1':
            data.text = 'I';
            break;
            case '2':
            data.text = 'II';
            break;
            case '3':
            data.text = 'III';
            break;
            case '4':
            data.text = 'IV';
            break;
            case '5':
            data.text = 'V';
            break;
            case '6':
            data.text = 'VI';
            break;
            case '7':
            data.text = 'VII';
            break;
            case '8':
            data.text = 'VIII';
            break;
            case '9':
            data.text = 'IX';
            break;
            case '10':
            data.text = 'X';
            break;
            case '11':
            data.text = 'XI';
            break;
            case '12':
            data.text = 'XII';
            break;
            }

        });

        updateGauge();






        jQuery(function () {

            var options = {
                types: ['(cities)']
            };
            $("#city").geocomplete(options).bind("geocode:result", function (event, result) {
                $scope.reqLoader = true;
                console.log('getDetail method called');
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

        HomeService.getLastSearchLocation(function (location) {
            if (location !== 'null' && location) {
                $scope.getWeather(location);
            }
            else {
                $scope.reqLoader = false;
                console.log("location data is null for last search");
            }
        });
        /*recieving location information and then weather information to show weather information on home page*/
        $scope.getDetails = function () {
            $scope.reqLoader = true;
            console.log('getDetail method called');
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
                    $scope.showInfo = true;
                    $scope.$apply();
                }
            });
        };

        $scope.getWeather = function (result) {

            $scope.reqLoader = true;
            console.log('getWeather method called');
            $scope.WILocalionResult = null;
            $scope.WIWeatherResult = null;
            var flag = false;
            if ($scope.mostVisitedData) {
                console.log('most visited', $scope.mostVisitedData);
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
                $scope.fullName = result.fullName ? result.fullName : (result.geonames[0].name + ', ' + result.geonames[0].adminName1 + ', ' + result.geonames[0].countryName);
                $scope.city = $scope.fullName;
                $scope.WIWeatherResult = weatherInfo;
                $scope.$apply();
            });
        };

    }]);