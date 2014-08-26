/**
 * Created by sandeepchhapola on 21/8/14.
 */


/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('profileCtrl', ['$scope', '$window', 'HomeService', function ($scope, $window, HomeService) {
        $scope.isEditable = false;
        $scope.isuploadPic = false;
        $scope.getProfileData = function (userId) {
            if (userId) {
                HomeService.getProfileData(userId, function (userData) {
                    $scope.currentUser = userData;
                });
            }
            else {
                $window.location.href = '#/home';
            }
        };
        $scope.getProfileData($("#profileData").val());

        $scope.showEditProfileForm = function () {
            $scope.isEditable = true;
        };
        $scope.hideEditProfileForm = function () {
            $scope.isEditable = false;
        };

        $scope.showUploadedPic = function (input) {
            $scope.isuploadPic = true;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                   $scope.uploadPicURL=e.target.result;
                    $scope.$apply();
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        $scope.clearUploadedPic = function () {
            $scope.isuploadPic = false;
            jQuery('#uploadPic').val('');
        };
    }]);
