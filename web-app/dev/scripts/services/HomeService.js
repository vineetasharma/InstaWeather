angular.module('yoApp')
    .service('HomeService', ['$http', function ($http) {

        this.getDetails = function (callback) {
            var searchLocation = jQuery("#city").val().toString().split(', ');
            var searchLocationLength = searchLocation.length;
            jQuery.ajax({
                url: "http://ws.geonames.org/searchJSON",
                dataType: "jsonp",
                data: {
                    name_equals: searchLocation[0],
                    adminName1: (searchLocationLength) > 1 ? searchLocation[1] : false,
                    countryName: searchLocation[searchLocationLength - 1],
                    username: 'vineetasharma'
                },
                success: function (data) {
                    if (data.geonames.length) {
                    callback(data);
                    }
                    else
                        callback(null);
                }, error: function (err) {
                    console.log("error during searching location: ", err);
                    callback(null);
                }
            });
        };

        this.getWeatherDetails = function (result, callback) {
            jQuery.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?",
                dataType: "jsonp",
                data: {
                    lat: result.geonames ? result.geonames[0].lat : result.latitude,
                    lon: result.geonames ? result.geonames[0].lng : result.longitude
                },
                success: function (data) {
                    callback(data);
                }, error: function (err) {
                    console.log("error during recieving weather data: ", err);
                    callback(null);
                }
            });
        };

        this.getMostSearchPlaceDetails = function (callback) {
            $http.get("/getMostSearchPlaceDetails")
                .success(function (data) {
                    callback(data);
                }).
                error(function (error) {
                    console.log("error during finding information: ", error.message);
                    callback(error);
                });
        };

        this.updateOrSaveLocationDetails=function(data){
            $http.post("/addlocationdata", data)
                .success(function () {
                    console.log("Information sucessfully added");
                }).
                error(function (error) {
                    console.log("error during saving information: ", error.message);
                });
        };

        this.getLastSearchLocation=function(callback){
            $http.get("/getLastSearchLocation")
                .success(function (location) {
                    console.log("getLastSearchLocation found.....................> "+location);
                    callback(location);
                }).
                error(function (error) {
                    console.log("error during getLastSearchLocation: ", error.message);
                    callback(error);
                });
        }
    }]);