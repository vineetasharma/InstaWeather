/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('mainCtrl', ['$scope','HomeService', function ($scope,HomeService) {

        /*login pop up*/
        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };

        $scope.getProfileDeta = function (userId) {
            HomeService.getProfileDeta(userId, function (user) {
                $scope.profileData = user.profileData;
                $scope.address = user.Address;
            });
        };
    }]);
