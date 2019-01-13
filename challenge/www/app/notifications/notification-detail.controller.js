(function () {
    'use strict';

angular.module("notifications")
.controller('NotificationDetailController', ['$scope', '$state', '$stateParams', 'UtilService', 'NotificationService', NotificationDetailController]);

function NotificationDetailController ($scope, $state, $stateParams, UtilService, NotificationService) {

    var storage = NotificationService.getStorage();

    var notificationPath = 'notifications/images/';

    var notification = new Object();

    var currentDate = NotificationService.getValueCache($stateParams.id, 'date');

    $scope.date = UtilService.getDateString(currentDate);

    var url;

    NotificationService.getChild("notifications", $stateParams.id).$loaded().then(function(child) {
        child.forEach(function(item) {
           notification[item.$id] = item.$value;
        });

        storage.ref().child(notificationPath + notification.imageSrc).getDownloadURL().then(function(url) {
            loadImg(url);
        }).catch(function(error) {
           url = NotificationService.getImageCache(notification.imageSrc);
           if (url != undefined){
                loadImg(url);
           }
        });
    }).catch(function(error) {
        $state.go("notifications");
    });

    function loadImg(img){
        $scope.$apply(function() {
            $scope.imgURI = img;
        });
        NotificationService.addImageCache(notification.imageSrc, img);
    }

    $scope.notification = notification;

    NotificationService.updateItemCache($stateParams.id, currentDate, true);

    $scope.getNotifications = function() {
        $state.go("notifications");
    }
}
})();
