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

        /*disabled a button*/
        $(document).ready(function () {
            $('button').attr('disabled', 'disabled');
            $('#city').change(function () {
                if ($(this).val != '') {
                    $('button').removeAttr('disabled');
                }
            });
        });

        /*login pop up*/
        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };
        /*recieving location information and then weather information to show weather information on home page*/

        $scope.getDetails = function () {
            $scope.WILocalionResult=null;
            $scope.WIWeatherResult=null;
            $('button').attr('disabled', 'disabled');

          $scope.showInfo=false;
            HomeService.getDetails(function (result) {
                if (result) {
                    console.log("showInfo",$scope.showInfo);
                    $scope.WILocalionResult = result;
                    HomeService.getWeatherDetails(result, function (weatherInfo) {
                        console.log(weatherInfo,'wether info in homejs');
                        $scope.WIWeatherResult = weatherInfo;
                        $scope.$apply();
                    });
                }
                else {
                    $scope.showInfo=true;
                    $scope.$apply();
                    console.log("showInfo",$scope.showInfo);
                }
            });
        }
    }]);
