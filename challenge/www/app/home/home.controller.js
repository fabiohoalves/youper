(function () {
    'use strict';

angular.module("home")
.controller('HomeController', ['$scope', '$state', 'NotificationService', '$cordovaCamera', '$ionicPlatform',  HomeController]);

function HomeController($scope, $state, NotificationService, $cordovaCamera, $ionicPlatform) {

    var profilePath = 'profile/images/';
    var storage = NotificationService.getStorage();

    $scope.isPhoto = false;
    $scope.$log = null;

    $scope.isBrowser = function() {
        return $ionicPlatform.is('browser');
    }

    $scope.getName = function() {
        if(ionic.Platform.device().uuid == undefined) {
            return 'browser';
        } else {
            return ionic.Platform.device().uuid;
        }
    }

    function download(){
        var url;
        storage.ref().child(profilePath + $scope.getName() + ".png").getDownloadURL().then(function(url) {
            loadPhotoProfile(url);
        }).catch(function(error) {
          //
        });
    }

    download();

    function loadPhotoProfile(img){
        $scope.$apply(function() {
            $scope.imgURI = img;
            $scope.isPhoto = true;
        });
        NotificationService.addImageCache($scope.getName(), img);
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
            upload(reader.result);
        };
    }

    function upload(img) {
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
                targetWidth: 36,
                targetHeight: 36,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                var img = 'data:image/png;base64,' + imageData
                $scope.imgURI = img;
                $scope.isPhoto = true;
                upload(img);
                NotificationService.saveImageCache($scope.getName(), img);
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
    return {
        download: download,
        upload: upload
    }
}
})();
