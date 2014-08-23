/**
 * Created by sandeepchhapola on 21/8/14.
 */


/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('profileCtrl', ['$scope', 'HomeService', function ($scope, HomeService) {
        $scope.updateProfileInfo = function () {
            $scope.isEditprofile = false;
            var data = {
                username: jQuery("#Name").val(),
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
           console.log("data>>>>>>>>..",data);
           /* HomeService.updateProfileInfo($scope.currentUser._id, data);
            $scope.currentUser.Address=data.Address;
            $scope.currentUser.profileData=data.profileData;
            $scope.$apply();*/

        };
        $scope.getProfileDeta = function (userId) {
            HomeService.getProfileDeta(userId, function (userData) {
                $scope.currentUser = userData;
                console.log($scope.currentUser);
            });
        };
        $scope.getProfileDeta($("#profileData").val());
    }]);
