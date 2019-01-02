angular.module("notifications")
.controller('NotificationDetailController', ['$scope', '$state', '$stateParams', 'CacheFactory', NotificationDetailController]);

function NotificationDetailController ($scope, $state, $stateParams, CacheFactory) {

    var notificationCache = undefined;
    var notificationsCache = CacheFactory.get('notificationsCache');

    if (notificationsCache != undefined) {
        notificationCache = notificationsCache.get($stateParams.id);

        if (notificationCache != undefined){
            $scope.notification = notificationCache;
            notificationCache.read = true;
            notificationsCache.put(notificationCache.id, notificationCache);
        } else {
            $state.go("notifications")
        }
    } else {
        $state.go("notifications")
    }

    $scope.getNotifications = function() {
        $state.go("notifications");
    }
}

