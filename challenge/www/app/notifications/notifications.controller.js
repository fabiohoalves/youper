angular.module("notifications")
.controller('NotificationsController', ['$scope', 'NotificationService', function($scope, NotificationService) {
    $scope.notifications;
    NotificationService.query(function(data) {
        console.log('teste');
        $scope.notifications = data;
    });
  }]);

