angular.module('yoApp')
    .controller('contactCtrl',['$scope','ContactService',function ($scope,ContactService) {
        console.log(">>>>>>>>>>contact us called>>>>>>>>>>>>");
      /* $scope.name='';*/
        $scope.sendMail=function(){
            if($scope.name==='' && $scope.email==='' && $scope.subject==='' && $scope.message==''){

            }
            else{
                var mailData={
                    name: $scope.name,
                    email: $scope.email,
                    subject: $scope.subject,
                    message:$scope.message
                };
                ContactService.sendMail(mailData);

            }


        }
    }]);

