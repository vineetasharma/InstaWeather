/**/angular.module('yoApp')
    .controller('profileCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
        $scope.isEditable=false;

        $scope.getProfileData = function (userId) {
            HomeService.getProfileData(userId, function (userData) {
                $scope.currentUser = userData;
            });
        };

        $scope.getProfileData($("#profileData").val());

        $scope.showEditProfileForm=function(){
            $scope.isEditable=true;
        };

        $scope.hideEditProfileForm=function(){
            $scope.isEditable=false;
        };
    }]);
