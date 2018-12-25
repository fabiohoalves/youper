angular.module("notifications")
.controller('NotificationsController', function($scope) {
  $scope.notifications = [
    {id: 1, title: "New feature 1!", description: "Now you can customize...", information: "Just click on the avatar, take or select a picture and save", image: null, route: "",  labelButton: "Got it", date: "10/12/2018", read: false},
    {id: 2, title: "New feature 2!", description: "Now you can customize...", information: "", image: null, route: "",  labelButton: "Got it", date: "10/12/2018", read: false},
    {id: 3, title: "New feature 3!", description: "Now you can customize...", information: "", image: null, route: "",  labelButton: "Got it", date: "10/12/2018", read: false}
  ];
});

