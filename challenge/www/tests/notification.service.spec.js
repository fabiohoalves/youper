describe("Testing Notification Service", function() {

    var md, firebase, controller, firebaseArray, cache, createCache;

    beforeEach(function() {
        md = angular.module("services");
    });

    describe("Dependencies:", function() {
        var deps;
        var hasModule = function(m) {
          return deps.indexOf(m) >= 0;
        };

        beforeEach(function() {
          deps = md.value('appName').requires;
        });

        //you can also test the module's dependencies
        it("should have firebase as a dependency", function() {
          expect(hasModule('firebase')).not.toBeNull();
          firebase = angular.module("firebase");
        });

    });
});
