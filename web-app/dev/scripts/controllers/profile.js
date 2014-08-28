/**/angular.module('yoApp')
    .controller('profileCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
        $scope.getProfileData = function (userId) {
            HomeService.getProfileData(userId, function (userData) {
                $scope.currentUser = userData;
            });
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
