angular.module("notifications")
.controller('NotificationsController', ['$scope', '$http', '$timeout', '$state', 'CacheFactory', 'md5', NotificationsController]);

function NotificationsController($scope, $http, $timeout, $state, CacheFactory, md5) {

    createCache();

    getNotificationsData();

    function findNotification(notificationId) {

        var notificationsCache = CacheFactory.get('notificationsCache');

        if (notificationsCache.get(notificationId) == undefined){
            return false;
        }
        return true;
    }

    function createHashMd5(notification) {
        return md5.createHash(JSON.stringify(notification.id
            || notification.title
            || notification.description
            || notification.information)
            || '');
    }

    function addNotificationsCache(notifications) {

        var notificationsCache = CacheFactory.get('notificationsCache');

        for(var i in notifications)
        {
            notification = notifications[i];
            hash = createHashMd5(notification);

            if (findNotification(notification.id)) {
                if (hash != notificationsCache.get(notification.id).hash){
                    removeNotification(notification.id);
                } else {
                    return;
                }
            }

            notification.hash = hash;
            notification.date = new Date();
            notification.read = false;
            notificationsCache.put(notification.id, notification);
        }

        recycleCache(notifications);
    }

    function removeNotification(notificationId) {

        var notificationsCache = CacheFactory.get('notificationsCache');

        if (findNotification(notificationId)) {
            notificationsCache.remove(notification.id.toString());
        }
    }

    function getNotificationsCache() {

        var notificationsCache = CacheFactory.get('notificationsCache');

        notificationsData = [];

        for (var i in notificationsCache.keySet()) {
            notificationsData.push(notificationsCache.get(i));
        }

        return notificationsData;
    }


    function recycleCache(notifications) {

        var notificationsCache = CacheFactory.get('notificationsCache');

        if (notificationsCache == undefined || notifications == undefined)
            return;

        keys = notificationsCache.keys();
        if (keys == undefined)
            return;

        for (var k of keys) {
             found = false;

             for (var j in notifications) {
                 if (notificationsCache.get(k).id == notifications[j].id) {
                     found = true;
                 }
             }

             if (!found) {
                removeNotification(notificationsCache.get(k));
             }
        }
    }

    function createCache() {

        var notificationsCache = CacheFactory.get('notificationsCache');

        if (notificationsCache == undefined) {
            CacheFactory.createCache("notificationsCache", {storageMode: "localStorage", maxAge: 5000, deleteOnExpire: "aggressive"});
        }
    }

    function getNotificationsData(){

        $scope.reload = function () {
            $http.get('http://localhost:3000/notification').
                success(function (data) {
                    addNotificationsCache(data)
                    $scope.notifications = getNotificationsCache();
            });

            $timeout(function(){
                $scope.reload();
            },10000)
        };

        $scope.reload();
    }

    $scope.getNotificationDetail = function(notification) {
        $state.go("notification-detail", {id: notification.id});
    }

    $scope.getHome = function() {
        $state.go("home");
    }
}
