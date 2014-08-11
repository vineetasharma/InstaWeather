/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('homeCtrl',['$scope','HomeService',function ($scope,HomeService) {
        jQuery(function () {
            var options = {
                types: ['(cities)']
            };
            $("#city").geocomplete(options);
        });
        /*disabled a button*/
        $(document).ready(function(){
            $('button').attr('disabled','disabled');
            $('#info').hide();
            $('input[type="text"]').change(function(){
                if($(this).val != ''){
                    $('button').removeAttr('disabled');
                }
            });
        });

        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };

        $scope.WILocalionResult;
        $scope.WIWeatherResult;

        $scope.getDetails = function () {
            $('button').attr('disabled','disabled');
            HomeService.getDeatails(function (result) {
                $scope.WILocalionResult = result;
                HomeService.getWeatherDeatails(result, function (weatherInfo) {
                    console.log(weatherInfo);
                    if(!(weatherInfo.weatherObservation)) {
                        $('#info').show();
                        $('#info').html("Sorry! weather information not found");
                    }
                    else
                        $('#info').hide();

                    $scope.WIWeatherResult = weatherInfo;
                    $scope.$apply();
                });

            });
        }
    }]);
