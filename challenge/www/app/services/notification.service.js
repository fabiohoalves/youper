
angular.module('services', ['firebase'])
.factory('NotificationService', function ($firebaseObject) {
    var ref = firebase.database().ref();
return {
        getParent: function(){
            return $firebaseObject(ref);
        },
        getChildren: function(name){
            return $firebaseObject(ref.child(name).orderByKey());
        },
        getChild: function (name, key) {
            return $firebaseObject(ref.child(name).child(key));
        },
    }
});

