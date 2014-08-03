'use strict';

/**
 * @ngdoc overview
 * @name yoApp
 * @description
 * # yoApp
 *
 * Main module of the application.
 */
angular
  .module('yoApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/main.html',
        controller: 'mainCtrl'
      })
        .when('/about',{
            templateUrl: '../views/about.html',
            controller: 'aboutCtrl'
        })
        .when('/contact',{
            templateUrl: '../views/contact.html',
            controller: 'contactCtrl'
        })
         .when('/profile',{
            templateUrl: '../views/profile.html',
            controller: 'profileCtrl'
        })
        .otherwise({
        redirectTo: '/'
      });
  });
