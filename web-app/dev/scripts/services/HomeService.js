angular.module('yoApp')
    .service('HomeService', ['$http', function ($http) {
        var baseUrl = "http://localhost:9092";
        this.isLoggedIn = function () {
            $http({method: 'GET', url: baseUrl + '/isLoggedIn'}).
                success(function (value) {
                    return value;
                }).
                error(function (err) {
                    throw err;
            });
        };
    }]);