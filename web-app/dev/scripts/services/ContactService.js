angular.module('yoApp')
    .service('ContactService', ['$http', function ($http) {

        this.sendMail = function (mailData) {
            console.log(mailData);
            $http.post("/sendMail",mailData)
                .success(function (data) {
                    callback(data);
                }).
                error(function (error) {
                    console.log("error during finding information: ", error.message);
                    callback(error);
                });

        }
    }]);