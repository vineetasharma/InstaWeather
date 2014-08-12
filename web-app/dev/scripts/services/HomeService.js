angular.module('yoApp')
    .service('HomeService', ['$http', function ($http) {

        this.getDetails = function (callback) {
            var searchLocation = jQuery("#city").val().toString().split(', ');


            var searchLocationLength = searchLocation.length;
            console.log("location to be search: ", searchLocation);
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
                    if(data.geonames.length){
                        $http.post("/addlocationdata", data)
                            .success(function () {
                                console.log("Information sucessfully added");
                            }).
                            error(function (error) {
                                console.log("error during saving information: ", error.message);
                            });
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
                    lat: result.geonames[0].lat,
                    lon: result.geonames[0].lng
                },
                success: function (data) {
                    console.log("Weather information is: ", data);
                    callback(data);
                }, error: function (err) {
                    console.log("error during recieving weather data: ", err);
                    callback(null);
                }
            });
        };
        this.getWeatherInfo=function(result,callback) {
         jQuery.ajax({
             url: "http://api.openweathermap.org/data/2.5/weather?",
             dataType: "jsonp",
             data: {
                 lat: result.latitude,
                 lon: result.longitude
             },
         success: function (data) {

         console.log(data, 'weather info most search location');
         callback(data);
         }, error: function (err) {
         console.log(err);
         callback(null);
         }
         });
         }
         this.getMostSearchPlaceDetails=function(callback) {
         $http.get("/findlocationdata")
         .success(function (data) {
         console.log("Information find",data);
         callback(data);
         }).
         error(function (error) {
         console.log("error during finding information: ",error.message);
         callback(error);
         });


         }
    }]);