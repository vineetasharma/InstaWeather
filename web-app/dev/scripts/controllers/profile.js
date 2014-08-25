/**
 * Created by sandeepchhapola on 21/8/14.
 */


/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('profileCtrl', ['$scope','$window', 'HomeService', function ($scope,$window, HomeService) {
        $scope.getProfileData = function (userId) {
            if(userId){
                HomeService.getProfileData(userId, function (userData) {
                $scope.currentUser = userData;
            });
        }
            else{
                $window.location.href='#/home';
            }
        };
        $scope.getProfileData($("#profileData").val());
        $scope.isEditable=false;
        $scope.showEditProfileForm=function(){
            $scope.isEditable=true;
        };
        $scope.hideEditProfileForm=function(){
            $scope.isEditable=false;
        };
    }]);
