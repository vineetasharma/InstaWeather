angular.module('yoApp')
    .controller('contactCtrl', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.sendMail = function () {
            $scope.loader=true;


            $scope.disable = true;
            if ($scope.email && $scope.name && $scope.message) {
                ContactService.isValidEmail($scope.email, function (valid) {
                    if (!valid) {
                        //validation for email

                        $(".alert-info").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
                        $scope.email = '';
                        $scope.disable = false;

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
                                $(".progressbar").width($(".progress").width()).html(100 + "% ");
                                $scope.name = '';
                                $scope.email = '';
                                $scope.message = '';
                                $scope.disable = false;
                                $scope.loader=false;

                            }
                            else {
                                $scope.disable = false;
                                $(".alert-error").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
                                $scope.loader=false;

                            }
                        });

                    }
                });

            }
            else{
                $scope.disable = false;
                $scope.loader=false;
                $(".alert-dismissable").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);

            }
        }


    }]);

