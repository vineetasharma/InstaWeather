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
      .when('/home', {
        templateUrl: '../views/home.html',
        controller: 'homeCtrl'
      })
        .when('/about',{
            templateUrl: '../views/about.html',
            controller: 'AboutCtrl'
        })
        .when('/contact',{
            templateUrl: '../views/contact.html',
            controller: 'contactCtrl'
        })
        .otherwise({
        redirectTo: '/home'
      });
  });
