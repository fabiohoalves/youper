angular.module("notifications",[])
  .config(function($stateProvider, $urlRouterProvider){
      $stateProvider
      .state('notifications', {
          url: "/notifications",
          templateUrl: "app/notifications/notifications.html",
          controller: 'NotificationsController'
      })

      .state('notification-detail',{
        url: "/notifications/:id",
        templateUrl: "app/notifications/notification-detail.html",
        controller: 'NotificationDetailController'
      });
  });
