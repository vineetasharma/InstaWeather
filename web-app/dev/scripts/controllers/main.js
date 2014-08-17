/**
 * Created by sandeepchhapola on 30/7/14.
 */
angular.module('yoApp')
    .controller('mainCtrl', ['$scope','MainService', function ($scope,MainService) {

        /*login pop up*/
        $scope.signIn = function () {
            jQuery('#signin').modal({
                keyboard: true
            });
        };

        $scope.showPromptEmail = function () {
            jQuery('#promptemail').modal({
                keyboard: true
            });
        };

        $scope.addEmail=function(userId,email){
            if(isValidEmail(email)){
                MainService.addEmail(userId,email);
            }
            else{
                console.log("invalid:",email);
            }
        };
        var isValidEmail=function (email) {
            // First check if any value was actually set
            if (email.length == 0) return false;
            // Now validate the email format using Regex
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
            return re.test(email);
        }
    }]);
