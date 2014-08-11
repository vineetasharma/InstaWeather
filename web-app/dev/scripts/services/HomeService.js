angular.module('yoApp')
    .service('HomeService',['$http', function ($http) {
       this.getDeatails=function(callback) {
            jQuery.ajax({
                url: "http://ws.geonames.org/searchJSON",
                dataType: "jsonp",
                data: {
                    featureClass: "P",
                    style: "full",
                    name_equals: (jQuery("#city").val().toString().split(','))[0],
                    username: 'vineetasharma'
                },
                success: function (data) {
                    $http.post("/addlocationdata",data)
                        .success(function () {
                            console.log("Information sucessfully added");
                        }).
                        error(function (error) {
                            console.log("error during saving information: ",error.message);
                        });
                    callback(data);
                }
               ,error: function(err) {
                    callback(null);
                }
            });
        };
        this.getWeatherDeatails=function(result,callback) {
            jQuery.ajax({
                url: "http://api.geonames.org/findNearByWeatherJSON?",
                dataType: "jsonp",
                data: {
                    lat:result.geonames[0].lat,
                    lng:result.geonames[0].lng,
                    username: 'vineetasharma'
                },
                success: function (data) {
                    console.log(result);
                    console.log(data);
                   callback(data);
                }
                , error: function (err) {
                    console.log(err);
                    callback(null);
                }
            });
        }
        /*this.getRecentSearchPlacesDeatails=function() {


        }*/
    }]);