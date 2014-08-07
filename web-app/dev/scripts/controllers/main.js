'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
    .controller('mainCtrl', ['$scope', function ($scope) {


        jQuery(function () {

            var options = {
                types: ['(cities)']
            };

            $("#city").geocomplete(options);

        });
    }]);