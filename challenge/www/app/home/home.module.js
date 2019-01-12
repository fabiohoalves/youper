angular.module("home", ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
      $stateProvider
      .state('home', {
          url: "/home",
          templateUrl: "app/home/home.html",
          controller: 'HomeController'
      });
  });
