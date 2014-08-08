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

        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };

        $scope.WILocalionResult;
        $scope.WIWeatherResult;

        $scope.getDetails=function(){
            HomeService.getDeatails(function(result) {
                $scope.WILocalionResult=result;
                HomeService.getWeatherDeatails(result,function(weatherInfo){
                    $scope.WIWeatherResult=weatherInfo;
                    console.log($scope.WIWeatherResult);
                    $scope.$apply();
                });

               // console.log($scope.WILocalionResult,"wether information");
            });
        }
        $scope.imageURL='http://past.theweathernetwork.com/common/images/web/wicons/d.gif';/*
        'http://past.theweathernetwork.com/common/images/web/wicons/a.gif' sunny
        'http://past.theweathernetwork.com/common/images/web/wicons/e.gif' variable
        'http://past.theweathernetwork.com/common/images/web/wicons/f.gif' cloudy with sunny breaks

        'http://past.theweathernetwork.com/common/images/web/wicons/k.gif' cloudy*/
    }]);
