describe("Testing Modules", function() {
    var md;
    beforeEach(function() {
        md = angular.module("starter");
    });
    describe("starter Module:", function() {
        it("should be registered", function() {
            expect(md).not.toBeNull();
        });
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
        it("should have home as a dependency", function() {
          expect(hasModule('home')).not.toBeNull();
        });
        it("should have services as a dependency", function() {
          expect(hasModule('services')).not.toBeNull();
        });
        it("should have controllers as a dependency", function() {
          expect(hasModule('controllers')).not.toBeNull();
        });
        it("should have utils as a dependency", function() {
          expect(hasModule('utils')).not.toBeNull();
        });
    });
});
