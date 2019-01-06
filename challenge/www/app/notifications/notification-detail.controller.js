angular.module("notifications")
.controller('NotificationDetailController', ['$scope', '$state', '$stateParams', 'CacheFactory', 'NotificationService', NotificationDetailController]);

function NotificationDetailController ($scope, $state, $stateParams, CacheFactory, NotificationService) {

    var notificationsCache = CacheFactory.get('notificationsCache');

    if ($stateParams.obj == null) {
        $stateParams.obj = NotificationService.getChild("notifications", $stateParams.id);
    }

    if (notificationsCache != undefined) {
        notificationsCache.put($stateParams.id, {read : true, date : $stateParams.date});
        $scope.notification = $stateParams.obj;
        $scope.date = $stateParams.date;
    } else {
        $state.go("notifications");
    }

    $scope.getNotifications = function() {
        $state.go("notifications");
    }
}

