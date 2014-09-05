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
                    countryName: searchLocation[searchLocationLength - 1],
                    username: 'vineetasharma'
                },
                success: function (data) {
                    if (data.geonames.length > 0) {
                        getLngLat(searchLocation,data.geonames,callback);
                    }
                    else {
                        callback(null);
                    }
                }, error: function (err) {
                    console.log("error during searching location: ", err);
                    callback(null);
                }
            });
        };

        this.getWeatherDetails = function (geoData, callback) {
            jQuery.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?",
                dataType: "jsonp",
                data: {
                    lat: geoData.latitude,
                    lon: geoData.longitude
                },
                success: function (data) {
                    callback(data);
                }, error: function (err) {
                    console.log("error during receiving weather data: ", err);
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

        this.updateOrSaveLocationDetails = function (data) {
            $http.post("/addlocationdata", data)
                .error(function (error) {
                    console.log("error during saving information: ", error.message);
                });
        };

        this.getLastSearchLocation = function (callback) {
            $http.get("/getLastSearchLocation")
                .success(function (location) {
                        callback(location);
                }).
                error(function (error) {
                    console.log("error during getLastSearchLocation: ", error.message);
                    callback(error);
                });
        };

        this.showCurrentLocationInfo = function (Userip, callback) {
            jQuery.ajax({
                url: "http://api.ipaddresslabs.com/iplocation/v1.7/locateip",
                dataType: 'jsonp',
                data: {
                    key: 'SAKZ66Z99U4NH5AS84HZ',
                    ip: Userip,
                    format: 'json'
                },
                success: function (geoData) {
                    callback({
                        fullName:geoData.geolocation_data.city+', '+geoData.geolocation_data.region_name+', '+geoData.geolocation_data.country_name,
                        latitude: geoData.geolocation_data.latitude,
                        longitude: geoData.geolocation_data.longitude
                    });
                }, error: function (err) {
                    console.log(err.message);
                    callback(null);
                }

            });
        };

        this.getProfileData = function (userId, callback) {
            $http.get("/getProfileData/" + userId)
                .success(function (userData) {
                    if (!userData)
                        callback(null);
                    else
                        callback(userData);
                }).
                error(function (error) {
                    console.log(error.message);
                    callback(null);
                });
        };

        var getLngLat = function (searchLocation,geoData,callback) {
            var geoDataLength=geoData.length;
            if (geoDataLength > 1) {
                var locationData={};
                var isFound=false;
                var fullName=jQuery("#city").val();
                var adminName1 = (searchLocation.length) > 3 ? searchLocation[2] : (searchLocation.length) > 1 ? searchLocation[1]:'';
                var countryName=searchLocation[searchLocation.length - 1];
                for(var i=0;i<geoDataLength;i++){
                    if((geoData[i].adminName1==adminName1 || geoData[i].adminCode1==adminName1) && geoData[i].countryName==countryName){
                        isFound=true;
                        locationData={
                            geoNameId: geoData[i].geonameId,
                            locationName:geoData[i].toponymName,
                            fullName: fullName,
                            latitude: geoData[i].lat,
                            longitude: geoData[i].lng
                        };
                        break;
                    }
                }
                if(isFound){
                    callback(locationData);
                }
                else{
                    callback(geoData[0]);
                }
            }else
                callback(geoData[0]);
        }
    }]);
