angular.module('yoApp')
    .controller('contactCtrl', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.sendMail = function () {
            if ($scope.name == undefined|| $scope.email == undefined|| $scope.message == undefined) {
                alert('fill all fields');

            }
            else {
                var mailData = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message
                };
                ContactService.sendMail(mailData);
            $scope.name='';
            $scope.email='';
            $scope.message='';

            }


        }
    }]);

