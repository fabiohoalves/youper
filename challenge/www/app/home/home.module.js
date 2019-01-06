angular.module("home",[])
  .config(function($stateProvider, $urlRouterProvider){
      $stateProvider
      .state('home', {
          url: "/home",
          templateUrl: "app/home/home.html",
          controller: 'HomeController'
      });
  });
