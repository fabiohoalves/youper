angular.module('utils', [])
.service('UtilService', function () {
  return {
        getDateString: function (date){
            var today = new Date();
            var diffMs = (today.getTime() - new Date(date));
            var diffDays = Math.floor(diffMs / 86400000);
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            var nameDay = diffDays > "1" ?  " days, " : " day, ";
            var nameHour = diffHrs > "1" ?  " hours, " : " hour, ";
            var nameMinute = diffMins > "1" ?  " minutes " : " minute ";
            var stringDate = ""
            var stringDate = diffDays != "0" ? diffDays + nameDay : "";
            var stringDate = diffDays == "0" && diffHrs == "0" ? diffMins + nameMinute : stringDate + diffHrs + nameHour + diffMins + nameMinute;
            return stringDate;
        }
    }
});
