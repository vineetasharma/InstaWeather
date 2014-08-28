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

                    $scope.profilePicUrl=userData.profilePicUrl;

                    $scope.Name = userData.username ? userData.username : '';

                    $scope.Email = userData.email ? userData.email : '';

                    $scope.About = userData.About ? userData.About : '';

                    $scope.Birthday = userData.profileData.Birthday ? userData.profileData.Birthday : '';

                    $scope.Gender = userData.profileData.Gender ? userData.profileData.Gender : '';

                    $scope.Mobile = ''+(userData.profileData.Mobile ? userData.profileData.Mobile:'');

                    $scope.lastSearchedPlace = userData.lastSearchedLocation.fullName ? userData.lastSearchedLocation.fullName : '';

                    $scope.Hometown = userData.Address.Hometown ? userData.Address.Hometown : '';

                    $scope.City = userData.Address.City ? userData.Address.City : '';

                    $scope.State = userData.Address.State ? userData.Address.State : '';

                    $scope.Country = userData.Address.Country ? userData.Address.Country : '';

                    $scope.Pin = ''+(userData.Address.pin ? userData.Address.pin : '');

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
                    $scope.uploadPicURL = e.target.result;
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
