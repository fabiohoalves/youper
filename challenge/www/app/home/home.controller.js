angular.module("home")
.controller('HomeController', ['$scope', '$state', '$cordovaCamera', '$ionicPlatform', 'UtilService', 'NotificationService', HomeController]);

function HomeController($scope, $state, $cordovaCamera, $ionicPlatform, UtilService, NotificationService) {

    var reader = new FileReader();
    $scope.isPhoto = false;

    $scope.getNotifications = function() {
        $state.go('notifications');
    }

    function handleFileSelect(evt) {

        var files = evt.target.files; // FileList object

        // use the 1st file from the list
        f = files[0];

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
    }

    $scope.getPhotoBrowser = function() {
        var input = document.createElement('input');
        input.addEventListener('change', handleFileSelect, false);
        input.type = 'file';
        input.click()

        $scope.imgURI = reader.result;
        $scope.isPhoto = true;
    }

    $scope.getPhoto = function () {

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
                $scope.imgURI = 'data:image/jpeg;base64,' + imageData;
                $scope.isPhoto = true;
                ref = NotificationService.getStorage();
            }, function (err) {
                // An error occured. Show a message to the user

            });

    }

    $scope.isBrowser = function() {
        return $ionicPlatform.is('browser');
    }

}

