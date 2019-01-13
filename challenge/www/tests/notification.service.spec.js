describe("Testing Notification Service", function() {

    var md, notificationService;

    describe("Initialize Notification Service and Dependencys", function() {
        beforeEach(function() {
            md = angular.module("services");
        });
        var hasModule = function(m) {
            return deps.indexOf(m) >= 0;
        };
        beforeEach(function() {
            deps = md.value('appName').requires;
        });

        it("should have module services", function() {
            expect(md).not.toBeNull();
        });

        //you can also test the module's dependencies
        it("should have firebase as a dependency", function() {
            expect(hasModule('firebase')).not.toBeNull();
        });

    });

    beforeEach(module('services', function($provide) {

        $firebaseArray = jasmine.createSpy('$firebaseArray');

        $provide.factory('$firebaseArray', function(){return $firebaseArray;});

        $provide.factory('CacheFactory', function(){
            return {
                get: function (cacheName) {
                    return {
                        get: function (key) { return key},
                        put: function (key, value) {
                            return key
                        },
                    };
                }
            }
        });
    }));

    describe("NotificationService Cache", function() {

        beforeEach(inject(function($injector) {
            notificationService = $injector.get('NotificationService');
        }));

        it('can get an instance of NotificationService', function(){
            expect(notificationService).toBeDefined();
        });

        it('should has item cache', function(){
            expect(notificationService.hasItemCache()).toBe(false);
        });

        it('should add item cache', function(){
            notificationService.addItemCache(1);
            expect(notificationService.hasItemCache(1)).toBe(true);
        });

        it('should has update item cache', function(){
            notificationService.addItemCache(1);
            notificationService.updateItemCache(2, new Date(), true);
            expect(notificationService.hasItemCache(1)).toBe(true);
        });
    });

});


