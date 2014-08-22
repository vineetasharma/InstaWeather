angular.module('yoApp')
    .service('HomeService', ['$http', function ($http) {

        this.getDetails = function (callback) {
            var searchLocation = jQuery("#city").val().toString().split(', ');
            console.log(searchLocation + " city input");
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
                    console.log(data, 'data in service');
                    if (data) {
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
            console.log('result in get weather details of home service ', result);
            if(result.geolocation_data){
                jQuery.ajax({
                    url: "http://api.openweathermap.org/data/2.5/weather?",
                    dataType: "jsonp",
                    data: {
                        lat: result.geolocation_data.latitude,
                        lon: result.geolocation_data.longitude
                    },
                    success: function (data) {
                        callback(data);
                    }, error: function (err) {
                        console.log("error during receiving weather data: ", err);
                        callback(null);


                    }
                });

            }
            else{
                console.log('else part of getWeather Details');
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

            }

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

        this.updateOrSaveLocationDetails = function (data) {
            $http.post("/addlocationdata", data)
                .success(function () {
                    console.log("Information sucessfully added");
                }).
                error(function (error) {
                    console.log("error during saving information: ", error.message);
                });
        };

        this.getLastSearchLocation = function (callback) {
            $http.get("/getLastSearchLocation")
                .success(function (location) {
                    if (location.length)
                        callback(null);
                    callback(location);
                }).
                error(function (error) {
                    console.log("error during getLastSearchLocation: ", error.message);
                    callback(error);
                });
        }
        this.showCurrentLocationInfo = function (Userip,callback) {
            jQuery.ajax({
                url: "http://api.ipaddresslabs.com/iplocation/v1.7/locateip",
                dataType:'jsonp',
                data:{
                    key:'SAKZ66Z99U4NH5AS84HZ',
                    ip:Userip,
                    format:'json'
                },
                success: function (data) {
                    console.log(data, 'data of current location in home service using IP');
                    callback(data);
                }, error: function (err) {
                    console.log("error during searching current  location using IP: ", err);
                    callback(null);
                }

            });
        }
    }]);