
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
        getDateString: function (date){
            var today = new Date();
            var diffMs = (today.getTime() - new Date(date)  );
            var diffDays = Math.floor(diffMs / 86400000);
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            nameDay = diffDays > "1" ?  " days, " : " day, ";
            nameHour = diffHrs > "1" ?  " hours, " : " hour, ";
            nameMinute = diffMins > "1" ?  " minutes " : " minute ";
            stringDate = diffDays != "0" ? diffDays + nameDay : "";
            stringDate = diffDays == "0" && diffHrs == "0" ? diffMins + nameMinute : diffHrs + nameHour + diffMins + nameMinute;
            return stringDate;
        }

    }
});

