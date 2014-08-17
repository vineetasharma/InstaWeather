angular.module('yoApp')
    .service('MainService',['$http', function ($http) {
        this.addEmail=function(userId,email){
            $http.put('/addEmail/'+userId,{email:email}).success(function (data) {
                console.log("email successfully added:",data);
                    jQuery('#promptemail').removeClass('in');
            }).error(function (err) {
                console.log("Error in adding email:",err);
            });
        };
    }]);