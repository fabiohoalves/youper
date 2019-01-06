angular.module("notifications")
.controller('NotificationsController', ['$scope', '$state', '$ionicLoading', 'NotificationService', 'CacheFactory', NotificationsController]);

function NotificationsController($scope, $state, $ionicLoading,  NotificationService, CacheFactory) {

    var notificationsCache = CacheFactory.get('notificationsCache');

    getNotificationsData();

    function getNotificationsData(){

        $ionicLoading.show();

        var notificationsObject = NotificationService.getParent();

        notificationsObject.$bindTo($scope, "data");

        var notifications = NotificationService.getChildren("notifications");

        notifications.$loaded().then(function() {

            angular.forEach(notifications, function(value, key) {

                addItemCache(key);
            });

            $ionicLoading.hide();

        });

    }

    function getItemCache(key, value){
        if (notificationsCache != undefined)
            return notificationsCache.get(key)[value];
        return '';
    }

    function addItemCache(key) {
        if (notificationsCache != undefined && notificationsCache.get(key) == undefined) {
            notificationsCache.put(key, {read : false, date : new Date()});
        }
    }

    $scope.getNotificationDetail = function(key, notification) {
        $state.go("notification-detail", {id: key, notification: notification});
    }

    $scope.getHome = function() {
        $state.go("home");
    }

    $scope.isRead = function(key) {
        return getItemCache(key, 'read');
    }

    $scope.getDate = function(key) {
        return NotificationService.getDateString(getItemCache(key, 'date'));
    }

}
