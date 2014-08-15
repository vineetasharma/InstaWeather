angular.module('yoApp')
    .controller('contactCtrl', ['$scope', 'ContactService', function ($scope, ContactService) {
        console.log(">>>>>>>>>>contact us called>>>>>>>>>>>>");
        /* $scope.name='';*/
        $scope.sendMail = function () {
            /*if ($scope.name == '' || $scope.email == '' || $scope.subject == '' || $scope.message == '') {
                alert('fill all fields');

            }
            else {*/
                var mailData = {
                    name: $scope.name,
                    email: $scope.email,
                    subject: $scope.subject,
                    message: $scope.message
                };
                alert('in alse l fields');
                ContactService.sendMail(mailData);

//            }


        }
    }]);

