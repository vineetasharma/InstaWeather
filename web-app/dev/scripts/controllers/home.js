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

        $scope.getDeatails=function(){
            HomeService.getDeatails(function(result) {
                HomeService.getWeatherDeatails(result);
            });
        }
    }]);