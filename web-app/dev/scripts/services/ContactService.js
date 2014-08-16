angular.module('yoApp')
    .service('ContactService', ['$http', function ($http) {

        this.sendMail = function (mailData,callback) {
            console.log(mailData);
            $http.post("/sendMail",mailData)
                .success(function (data) {
                    console.log(data,' data in contact srvice ');

                    callback(data);
                }).
                error(function (error) {
                    console.log("error during sending mail: ", error);
                    callback(null);
                });

        }
    }]);