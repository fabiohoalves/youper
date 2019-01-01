angular.module("notifications")
.controller('NotificationDetailController', ['$scope', '$state', '$stateParams', 'CacheFactory', NotificationDetailController]);

function NotificationDetailController ($scope, $state, $stateParams, CacheFactory) {

    notificationsCache = CacheFactory.get('notificationsCache');

    findNotification();

    // procurar registro no cache
    function findNotification() {
        if (notificationsCache.get($stateParams.id) !== undefined){
            $state.go("notifications");
        }
        return $scope.notification = notificationsCache.get($stateParams.id);
    }

}

