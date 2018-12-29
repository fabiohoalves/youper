
angular.module("starter")
.factory('NotificationService', function($resource) {
    return $resource('http://localhost:3000/notification', 3000);
  });
