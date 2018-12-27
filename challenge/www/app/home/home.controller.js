angular.module("home")
.controller('HomeController', ['$scope', '$state', '$cordovaCamera', HomeController]);

function HomeController($scope, $state, $cordovaCamera) {

  $scope.isPhoto = false;

  $scope.getNotifications = function() {
    $state.go("notifications");
  }

  $scope.choosePhoto = function () {
    var options = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 48,
      targetHeight: 48,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

  $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.isPhoto = true;
    }, function (err) {
          // An error occured. Show a message to the user
    });
  }
}

