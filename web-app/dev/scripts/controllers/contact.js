angular.module('yoApp')
    .controller('contactCtrl', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.sendMail = function () {
            $scope.disable = true;
            if ($scope.name == undefined || $scope.email == undefined || $scope.message == undefined) {
                $scope.disable = true;
            }
            else {
                var mailData = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message
                };
                ContactService.sendMail(mailData, function (data) {
                    if (data) {
                        $(".alert-success").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
                        $scope.name = '';
                        $scope.email = '';
                        $scope.message = '';
                        $scope.disable = true;

                    }
                    else {
                        $(".alert-error").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
                    }
                    $scope.disable = false;


                });


            }


        }
    }]);

