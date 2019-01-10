angular.module('services', ['firebase'])
.factory('NotificationService', function ($firebaseArray, CacheFactory) {

    var evt = {
        ADDED: 'child_added',
        REMOVED: 'child_removed',
        MOVED: 'child_moved',
        CHANGED: 'child_changed',
    };

    var notificationsCache = CacheFactory.get('notificationsCache');
    var ref = firebase.database().ref();

    $firebaseArray(ref.child('notifications').orderByKey()).$watch(function(event) {
        if(event.event == evt.ADDED){
            addItemCache(event.key);
        }else if (event.event == evt.REMOVED || event.event == evt.MOVED){
            removeItemCache(event.key);
        } else {
            updateItemCache(event.key, new Date(), false);
        }
        hasNotificationToRead();
    })

    function hasNotificationToRead() {
        // when add items in cache, verify if there are items not read
        count = notificationsCache.values().map(x => x.read).filter(isRead => isRead == false);
        return count.length > 0;
    }

    function hasItemCache(key) {
        return (notificationsCache != undefined && notificationsCache.get(key) != undefined);
    }

    function addItemCache(key) {
        if (!hasItemCache) {
            notificationsCache.put(key, {read : false, date : new Date()});
        }
    }

    function getValueCache(key, name) {
        if (hasItemCache(key)) {
            return notificationsCache.get(key)[name];
        }
    }

    function removeItemCache(key) {
        if (hasItemCache(key))
            notificationsCache.remove(key);
    }

    function updateItemCache(key, date, isRead) {
        notificationsCache.put(key, {read : isRead, date : date});
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
        updateItemCache: updateItemCache
    }
});

