angular.module('yoApp')
    .service('HomeService', function () {
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
                    callback(data);
                }
               ,error: function(err) {
                    callback(null);
                }
            });
        };
        this.getWeatherDeatails=function(result) {
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
                }
                , error: function (err) {
                    console.log(err);
                }
            });
        }
    });