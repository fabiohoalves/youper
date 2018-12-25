angular.module("notifications")
.controller('NotificationDetailController', function($scope) {
  $scope.notification =
    {id: 1, title: "New feature 1!", description: "Now you can customize...",
      information: "Just click on the avatar, take or select a picture and save",
      image: null, route: "",  labelButton: "Got it", date: "10/12/2018", read: false};
});

