angular.module("notifications")
.controller('NotificationDetailController', ['$scope', '$state', '$stateParams', 'CacheFactory', 'NotificationService', NotificationDetailController]);

function NotificationDetailController ($scope, $state, $stateParams, CacheFactory, NotificationService) {

    var notificationsCache = CacheFactory.get('notificationsCache');

    if ($stateParams.notification == null) {
        $stateParams.notification = NotificationService.getChild("notifications", $stateParams.id);
    }

    date = notificationsCache.get($stateParams.id)['date'];

    if (notificationsCache != undefined) {

        notificationsCache.put($stateParams.id, {read : true, date : date});

        $scope.notification = $stateParams.notification;

        $scope.date = NotificationService.getDateString(date);

    } else {
        $state.go("notifications");
    }

    $scope.getNotifications = function() {
        $state.go("notifications");
    }
}

