/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('homeCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
        /*$('input[type="text"]').change(function(){
            $('button').removeAttr('disabled');
        });*/
        jQuery(function () {
            var options = {
                types: ['(cities)']
            };
            $("#city").geocomplete(options);
        });
        /*disabled a button*/
        $(document).ready(function(){
            $('button').attr('disabled','disabled');
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
        $scope.imageURL;
        $scope.recentData;

        $scope.getDetails = function () {
            $('button').attr('disabled','disabled');
            HomeService.getDeatails(function (result) {
                $scope.WILocalionResult = result;
                HomeService.getWeatherDeatails(result, function (weatherInfo) {
                    $scope.WIWeatherResult = weatherInfo;
                    console.log($scope.WIWeatherResult);
                    if ($scope.WIWeatherResult.weatherObservation.temperature >= 37) {
                        $scope.imageURL = 'http://past.theweathernetwork.com/common/images/web/wicons/a.gif';
                    }
                    else {
                        $scope.imageURL = 'http://past.theweathernetwork.com/common/images/web/wicons/d.gif';


                    }
                    $scope.$apply();
                });

                // console.log($scope.WILocalionResult,"wether information");
            });
        }
       /* $http.get("/findRecentlocation")
            .success(function (result) {
                console.log("RESULT"+result);
                $scope.recentData

            }).
            error(function (error) {
                console.log("error while searching data: ",error.message);
            });*/
        /* clouds
         'http://past.theweathernetwork.com/common/images/web/wicons/a.gif' sunny
         'http://past.theweathernetwork.com/common/images/web/wicons/e.gif' variable
         'http://past.theweathernetwork.com/common/images/web/wicons/f.gif' cloudy with sunny breaks

         'http://past.theweathernetwork.com/common/images/web/wicons/k.gif' cloudy*/
    }]);
/*
* wind Speed
* http://icons.iconarchive.com/icons/dapino/beach/128/wind-mill-icon.png
* */