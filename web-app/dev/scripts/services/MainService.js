angular.module('yoApp')
    .service('MainService',['$http', function ($http) {
        this.addEmail=function(userId,email){
            $http.put('/addEmail/'+userId,{email:email}).success(function (data) {
                console.log("email successfully added:",data);
                jQuery('#promptemail').toggle();
                jQuery('.modal-backdrop').toggle();
                $(".alert-success").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
            }).error(function (err) {
                console.log("Error in adding email:",err);
                $(".alert-error").removeClass("in").show().delay(200).addClass("in").fadeOut(5000);
            });
        };
    }]);