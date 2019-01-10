angular.module("home")
.controller('HomeController', ['$scope', '$state', '$cordovaCamera', '$ionicPlatform', 'NotificationService', HomeController]);

function HomeController($scope, $state, $cordovaCamera, $ionicPlatform, NotificationService) {

    var profilePath = 'profile/images/';
    var storage = NotificationService.getStorage();

    $scope.isPhoto = false;

    download();

    function download(){
        storage.ref().child(profilePath + "teste" + ".png").getDownloadURL().then(function(url) {
            loadPhotoProfile(url);
        }).catch(function(error) {
            console.log(error);
            // Handle any errors
        });
    }

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
            upload(photoProfile);
        };
    }

    function upload(img) {
        var photoRef = storage.ref().child(profilePath + "teste" + ".png");
        photoRef.putString(img, 'data_url').then(function(snapshot) {

        }, function (err) {
            // remove picture
            // An error occured. Show a message to the use
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
                upload(photoProfile);
            }, function (err) {
                // An error occured. Show a message to the user

            });
    }

    $scope.isBrowser = function() {
        return $ionicPlatform.is('browser');
    }

    $scope.getNotifications = function() {
        $state.go('notifications');
    }

    $scope.hasNotificationToRead = function () {
        return NotificationService.hasNotificationToRead();
    }
}

