(function () {
    'use strict';

angular.module("notifications")
.controller('NotificationsController', ['$scope', '$state', '$ionicLoading', 'NotificationService', 'UtilService', NotificationsController]);

function NotificationsController($scope, $state, $ionicLoading,  NotificationService, UtilService) {

    $scope.getNotifications = function() {

        $ionicLoading.show();

        $scope.notifications =  NotificationService.getChildren("notifications");

        $scope.notifications.$loaded().then(function() {
            $ionicLoading.hide();
        });
    }

    $scope.getNotifications();

    $scope.getNotificationDetail = function(notification) {
        $state.go("notification-detail", {id: notification.$id, notification: notification});
    }

    $scope.getHome = function() {
        $state.go("home");
    }

    $scope.isRead = function(id) {
        return NotificationService.getValueCache(id, 'read');
    }

    $scope.getDate = function(id) {
        return UtilService.getDateString(NotificationService.getValueCache(id, 'date'));
    }

}
})()
