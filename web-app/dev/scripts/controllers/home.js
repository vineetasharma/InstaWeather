/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('homeCtrl',[ '$scope',function ($scope) {
        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };
    }]);