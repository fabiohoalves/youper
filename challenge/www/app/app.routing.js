angular.module('starter')

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

    // it can't be home because home is abstract
  // home.leagues is part of the myHome module
  $urlRouterProvider.otherwise('/home');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAJMUm9iZRDh9KRch3HishOI00Ia-vgzdo",
    authDomain: "youper-challenge.firebaseapp.com",
    databaseURL: "https://youper-challenge.firebaseio.com",
    projectId: "youper-challenge",
    storageBucket: "youper-challenge.appspot.com",
    messagingSenderId: "684503495517"
  };
  if (!firebase.apps.length) { firebase.initializeApp(config);}


});
