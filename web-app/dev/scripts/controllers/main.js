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
        jQuery(function(){

            var options = {
                //map: ".map_canvas",
                location: "NYC"
            };
console.log('in jquery function');
            $("#city").geocomplete(options);

        });
    }]);