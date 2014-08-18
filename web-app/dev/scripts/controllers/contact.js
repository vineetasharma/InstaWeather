function createAutoClosingAlert(selector, delay) {
    $(selector).show()
    var alert = $(selector).alert();
    window.setTimeout(function() { alert.hide() }, delay);
}
angular.module('yoApp')
    .controller('contactCtrl', ['$scope', 'ContactService', function ($scope, ContactService) {
        $(".alert-info").hide();
        $(".alert-success").hide();
        $(".alert-dismissable").hide();
        $(".alert-error").hide();

        $scope.sendMail = function () {

            $scope.loader=true;


            $scope.disable = true;
            if ($scope.name && $scope.message) {
                ContactService.isValidEmail($scope.email, function (valid) {
                    if (!valid) {
                        createAutoClosingAlert(".alert-info", 3000);
                        $scope.loader=false;
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
                                createAutoClosingAlert(".alert-success", 3000);
                                $scope.name = '';
                                $scope.email = '';
                                $scope.message = '';
                                $scope.disable = false;
                                $scope.loader=false;

                            }
                            else {
                                $scope.disable = false;
                                createAutoClosingAlert(".alert-error", 3000);
                                $scope.loader=false;

                            }
                        });

                    }
                });

            }
            else{
                $scope.disable = false;
                $scope.loader=false;
                createAutoClosingAlert(".alert-info", 3000);
            }

        }


    }]);

