(function () {
    'use strict';

angular.module("notifications")
.controller('NotificationDetailController', ['$scope', '$state', '$stateParams', 'UtilService', 'NotificationService', NotificationDetailController]);

function NotificationDetailController ($scope, $state, $stateParams, UtilService, NotificationService) {

    var notification = new Object();

    var currentDate = NotificationService.getValueCache($stateParams.id, 'date');

    $scope.date = UtilService.getDateString(currentDate);

    NotificationService.getChild("notifications", $stateParams.id).$loaded().then(function(child) {
        child.forEach(function(item) {
           notification[item.$id] = item.$value;
        })
    }).catch(function(error) {
        $state.go("notifications");
    });

    $scope.notification = notification;

    NotificationService.updateItemCache($stateParams.id, currentDate, true);

    $scope.getNotifications = function() {
        $state.go("notifications");
    }
}
})();
