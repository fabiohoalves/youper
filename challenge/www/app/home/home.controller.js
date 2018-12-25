angular.module("home")
.controller('HomeController', ['$scope', '$state', '$stateParams', HomeController]);


function HomeController($scope, $state) {

  $scope.getNotifications = function() {
    $state.go("notifications");
  }
}

