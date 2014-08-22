/**
 * Created by sandeepchhapola on 21/8/14.
 */


/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('profileCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {

        $scope.isEditAbout = false;
        $scope.isEditprofile = false;


        $scope.showProfileEditFields = function () {
            $scope.isEditprofile = true;
        };

        $scope.updateProfileInfo = function () {
            $scope.isEditprofile = false;
            var data = {
                Address: {
                    City: jQuery("#City").val(),
                    Country: jQuery("#Country").val(),
                    Hometown: jQuery("#Hometown").val(),
                    State: jQuery("#State").val(),
                    pin: jQuery("#pin").val()
                },
                profileData: {
                    Birthday: jQuery("#Birthday").val(),
                    CurrentCity: jQuery("#CurrentCity").val(),
                    Gender: jQuery("#Gender").val(),
                    Mobile: jQuery("#Mobile").val()
                }
            };
            HomeService.updateProfileInfo($scope.currentUser._id, data);
            $scope.currentUser.Address=data.Address;
            $scope.currentUser.profileData=data.profileData;
            $scope.$apply();

        };

        $scope.showAboutTextArea = function () {
            $scope.isEditAbout = true;
            $scope.$apply();
        };
        $scope.updateAboutInfo = function () {
            $scope.isEditAbout = false;
            var data = {
                About:jQuery("#About").val()
            };
            HomeService.updateAboutInfo($scope.currentUser._id, data);
            $scope.currentUser.About=data.About;

        };
        $scope.getProfileDeta = function (userId) {
            HomeService.getProfileDeta(userId, function (userData) {
                $scope.currentUser = userData;
                console.log($scope.currentUser);
            });
        };
        $scope.getProfileDeta($("#profileData").val());

        $scope.updateProfileDeta = function (userId, data) {
            HomeService.updateProfileDeta(userId, data);
        };
    }]);
