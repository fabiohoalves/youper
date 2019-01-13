(function () {
    'use strict';

angular.module('services', ['firebase'])
.service('NotificationService', ['$firebaseArray', 'CacheFactory', NotificationService])

function NotificationService($firebaseArray, CacheFactory) {

    var evt = {
        ADDED: 'child_added',
        REMOVED: 'child_removed',
        MOVED: 'child_moved',
        CHANGED: 'child_changed',
    };

    var notificationsCache = CacheFactory.get('notificationsCache');
    var ref = firebase.database().ref();

    // use when need remove all register of storage
   // removeAll()


    var controlItemns = function(event) {
        if(event.event == evt.ADDED){
            addItemCache(event.key);
        }else if (event.event == evt.REMOVED || event.event == evt.MOVED){
            removeItemCache(event.key);
        } else {
            updateItemCache(event.key, new Date(), false);
        }
        hasNotificationToRead();
    };

    if ($firebaseArray(ref.child('notifications').orderByKey()) != undefined) {
        $firebaseArray(ref.child('notifications').orderByKey()).$watch(controlItemns);
    }

    function hasNotificationToRead() {
        // when add items in cache, verify if there are items not read
        var count = notificationsCache.values().map(x => x.read).filter(isRead => isRead == false);
        return count.length > 0;
    }

    function hasItemCache(key) {
        return (notificationsCache != undefined && notificationsCache.get(key) != undefined);
    }

    function addImageCache(key, img) {
         notificationsCache.put(key, img);
    }

    function addItemCache(key) {
        if (!hasItemCache(key))
            notificationsCache.put(key, {read : false, date : new Date()});
    }

    function getValueCache(key, name) {
        if (hasItemCache(key))
            return notificationsCache.get(key)[name];
    }

    function getImageCache(key) {
        return notificationsCache.get(key);
    }

    function removeItemCache(key) {
        if (hasItemCache(key)) notificationsCache.remove(key);
    }

    function updateItemCache(key, date, isRead) {
        notificationsCache.put(key, {read : isRead, date : date});
    }

    function removeAll(){
        return notificationsCache.removeAll();
    }


return {
        getChildren: function(name){
            return $firebaseArray(ref.child(name).orderByKey());
        },
        getChild: function (name, key) {
            return $firebaseArray(ref.child(name).child(key));
        },
        getStorage: function() {
            return firebase.storage();
        },

        hasNotificationToRead: hasNotificationToRead,
        getValueCache: getValueCache,
        getImageCache: getImageCache,
        hasItemCache: hasItemCache,
        updateItemCache: updateItemCache,
        addItemCache: addItemCache,
        addImageCache: addImageCache
    }
};
})()
