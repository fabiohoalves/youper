(function () {
    'use strict';

angular.module("home")
.controller('HomeController', ['$scope', '$state', 'NotificationService', '$cordovaCamera', '$ionicPlatform', '$log', HomeController]);

function HomeController($scope, $state, NotificationService, $cordovaCamera, $ionicPlatform, $log) {

    var profilePath = 'profile/images/';
    var storage = NotificationService.getStorage();
   // var hash = uuid.v4();

    $scope.isPhoto = false;
    $scope.$log = null;

    $scope.isBrowser = function() {
        return $ionicPlatform.is('browser');
    }

    $scope.getName = function() {
        if ($scope.isBrowser()) {
            return 'teste';
        } else {
            return ionic.Platform.device();
        }
    }

    $scope.download = function(){
        storage.ref().child(profilePath + $scope.getName() + ".png").getDownloadURL().then(function(url) {
            loadPhotoProfile(url);
        }).catch(function(error) {
            $scope.$log = error;
        });
    }

    $scope.download();

    function loadPhotoProfile(img){
        $scope.$apply(function() {
            $scope.imgURI = img;
            $scope.isPhoto = true;
        });
    }

    function handleFileSelect(evt) {

        var files = evt.target.files; // FileList object
        // use the 1st file from the list
        var f = files[0];

        var reader = new FileReader();
        reader.readAsDataURL(f)

        // Closure to capture the file information.
        reader.onloadend = function(e) {
            loadPhotoProfile(reader.result);
            $scope.upload(reader.result);
        };
    }

    $scope.upload = function(img) {
        var photoRef = storage.ref().child(profilePath + $scope.getName() + ".png");
        photoRef.putString(img, 'data_url').then(function(snapshot) {

        }, function (err) {
            $scope.$log = err;
        });
    }

    $scope.getPhotoBrowser = function() {
        var input = document.createElement('input');
        input.addEventListener('change', handleFileSelect, false);
        input.type = 'file';
        input.click()
    }

    $scope.getPhoto = function () {
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.PNG,
                targetWidth: 48,
                targetHeight: 48,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                loadPhotoProfile('data:image/png;base64,' + imageData);
                $scope.upload('data:image/png;base64,' + imageData);
            }, function (err) {
                $scope.$log = err;
            });
    }

    $scope.goToNotifications = function() {
        $state.go('notifications');
    }

    $scope.hasNotificationToRead = function () {
        return NotificationService.hasNotificationToRead();
    }
}
})();
