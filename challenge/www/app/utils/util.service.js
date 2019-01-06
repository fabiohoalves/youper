angular.module('utils', [])
.factory('UtilService', function () {
  return {
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
        },
        imageToBase64: function(img) {
            var canvas, ctx, dataURL, base64;
            canvas = document.createElement("canvas");
            ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            console.log('passou');
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL("image/png");
            base64 = dataURL.replace(/^data:image\/png;base64,/, "");
            return base64;
        }
    }
});
