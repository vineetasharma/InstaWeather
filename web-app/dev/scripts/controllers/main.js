/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('mainCtrl', ['$scope', function ($scope) {
        console.log('main.js called');

        /*login pop up*/
        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };
    }]);
