angular.module('starter')

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

    // it can't be home because home is abstract
  // home.leagues is part of the myHome module
  $urlRouterProvider.otherwise('/home');

});
