angular.module('yoApp')
    .controller('contactCtrl', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.sendMail = function () {
            $scope.disable=true;
            if($scope.email && $scope.name && $scope.message && ContactService.isValidEmail($scope.email)){
                var mailData = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message
                };
                ContactService.sendMail(mailData,function(data){
                    if(data){
                        alert('mail sent successfully');
                        $scope.name='';
                        $scope.email='';
                        $scope.message='';
                        $scope.disable=true;
                    }
                    $scope.disable=false;
                });
            }else{
                $scope.disable=false;
            }
        }
    }]);

