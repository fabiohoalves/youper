angular.module("notifications")
.controller('NotificationsController', ['$scope', '$http', '$timeout', '$state', 'CacheFactory', NotificationsController]);


function NotificationsController($scope, $http, $timeout, $state, CacheFactory) {

    notificationsCache = CacheFactory.get('notificationsCache');

    // Verificar se existe cache
    createCache();

    getNotifications();

    // procurar registro no cache
    function findNotification(notificationId) {
        if (notificationsCache.get(notificationId) == undefined){
            return false;
        }
        return true;
    }

    // Incluir registro no cache
    function addNotification(notification) {
        if (!findNotification(notification.id)) {
            notificationsCache.put(notification.id, notification);
        }
    }

    // Deletar registro no cache
    function removeNotification(notification) {
        if (findNotification(notification.id)) {
            notificationsCache.remove(notification.id.toString());
        }
    }

    // Devolver array de cache
    function getNotificationsData(notifications) {

        notificationsData = [];

        addCache(notifications)

        for (var i in notifications) {
            notificationsData.push(notificationsCache.get(notifications[i].id));
        }

        recycleCache();

        return notificationsData;
    }

    function addCache(notifications) {
        for(var i in notifications)
        {
           addNotification(notifications[i]);
        }
    }

    // Verificar se existe registro no cache que não existe no servidor

    function recycleCache() {

    }

    function createCache() {
        if (notificationsCache == undefined) {
            CacheFactory.createCache("notificationsCache", {storageMode: "localStorage", maxAge: 5000, deleteOnExpire: "aggressive"});
            notificationsCache = CacheFactory.get('notificationsCache');
        }
    }

    function getNotifications(){

        $scope.reload = function () {
            $http.get('http://localhost:3000/notification').
                success(function (data) {
                    $scope.notifications = getNotificationsData(data);
            });

            $timeout(function(){
            $scope.reload();
            },3000)
        };

        $scope.reload();
    }


    $scope.getNotificationDetail = function(notification) {
        $state.go("notification-detail", {id: notification.id});
    }

}
