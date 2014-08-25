/**
 * Created by sandeepchhapola on 21/8/14.
 */


/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('profileCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
        $scope.getProfileDeta = function (userId) {
            HomeService.getProfileDeta(userId, function (userData) {
                $scope.currentUser = userData;
            });
        };
        $scope.getProfileDeta($("#profileData").val());
        $scope.isEditable=false;
        $scope.showEditProfileForm=function(){
            $scope.isEditable=true;
        };
        $scope.hideEditProfileForm=function(){
            $scope.isEditable=false;
        };
    }]);
