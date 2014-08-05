'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
    .controller('mainCtrl',['$scope',function ($scope) {
        console.log(">>>>>>>>>>>main page called>>>>>>>>>>>");
        jQuery.ajax({
            url: "http://api.geonames.org/searchJSON?",
            dataType: 'jsonp',
            data: {
                featureClass: "P",
                style: "full",
                maxRows: 12,
                name_startsWith: $('#city').val(),
                username:'vineetasharma'
            },
            success: function( data ) {
                //Display city name, state name, country name
                for(var d in data.geonames){
                    console.log(data.geonames[d].countryName);
                }
            }
        });
    }]);