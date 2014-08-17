angular.module('yoApp')
    .service('ContactService', ['$http', function ($http) {
        this.isValidEmail=function (email) {
            // First check if any value was actually set
            if (email.length == 0) return false;
            // Now validate the email format using Regex
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
            return re.test(email);
        };
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