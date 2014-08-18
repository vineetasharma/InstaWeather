angular.module('yoApp')
    .service('MainService',['$http', function ($http) {
        this.addEmail=function(user){
            $http.put('/addemailandcreatetwitteracc/'+user.email,user).success(function () {
                jQuery('#promptemail').toggle();
                jQuery('.modal-backdrop').toggle();
                $(".alert-success").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
            }).error(function (err) {
                console.log("Error in adding email:",err);
                $(".alert-error").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
            });
        };
    }]);