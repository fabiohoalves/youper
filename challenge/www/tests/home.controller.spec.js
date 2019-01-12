describe("HomeController", function() {
    var scope, config, controller, ionicPlatform, cordovaCamera;
    var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAQUXKiwSYA8wAAAAs0lEQVRo3u3YQQqEMBBE0W7vf2dduJABEU2qSMH8f4DwMGpHq4iIiIiInmrPsvteVdUdAjo5Y6R2ckZI7eV8J21uztItu+Ms3DIFRwjScGQgFUcE0nEkICVHANJypkFqziRIz5kCOTgTIA9nGOTiDIJ8HPm0Z8tib+rAxz7wxRg4OgKHa+DxI/CAFniEDTzkB34GBX4oakjiab94dLy5Sst/x/ySIn5YXaQ2rU5ERERE/9wBhkNEKNwNzQkAAAAASUVORK5CYII='

    beforeEach(function(){

        module('home')
        module("firebase");

        config = {
            apiKey: "AIzaSyAJMUm9iZRDh9KRch3HishOI00Ia-vgzdo",
            authDomain: "youper-challenge.firebaseapp.com",
            databaseURL: "https://youper-challenge.firebaseio.com",
            projectId: "youper-challenge",
            storageBucket: "youper-challenge.appspot.com",
            messagingSenderId: "684503495517"
        };

    });

    // Create mocked $state.
    beforeEach(function() {

        var self = this;

        module(function($provide) {
            $provide.service('$state', function() {

                this.expectedTransitions = [];
                this.current = {};
                this.params = {};
                this.transitionTo = function(stateName, params) {

                    if (this.expectedTransitions.length > 0) {
                        var expectedState = this.expectedTransitions.shift();
                        if (expectedState !== stateName) {
                            throw Error('Expected transition to state: ' + expectedState + ' but transitioned to ' + stateName);
                        }
                    } else {
                            throw Error('No more transitions were expected! Tried to transition to ' + stateName);
                    }

                    this.current.name = stateName;
                    this.params = params || {};
                    return self.$q.resolve();
                };
                this.go = this.transitionTo;
                this.expectTransitionTo = function(stateName) {
                    this.expectedTransitions.push(stateName);
                };
                this.ensureAllTransitionsHappened = function() {
                    if (this.expectedTransitions.length > 0) {
                        throw Error('Not all transitions happened!');
                    }
                };
            });
        });
    });


    //override injected value in controller
    beforeEach(module('services', function($provide) {

        $provide.factory('NotificationService', function(){
            return {
                getStorage: function () {
                    return firebase.storage();
                },
            }
        });

        $provide.factory('$cordovaCamera', function(){return cordovaCamera;});

        $provide.factory('$ionicPlatform', function(){
            return {
                is: function () {
                    return 'browser';
                },
            }
        });
    }));


    beforeEach(
        inject(function(_$controller_, _$q_, _$rootScope_, _$state_) {
        var self = this;

        scope = _$rootScope_.$new();
        self.$q = _$q_;
        self.$state = _$state_;
        self.params = {};
        self.$transition$ = {
            params: function() {
            return self.params;
            }
        };

        controller = _$controller_('HomeController', {
            $scope: scope,
            $state: _$state_,
            $cordovaCamera: cordovaCamera,
            $ionicPlataform: ionicPlatform
        });

    }));

    it('should have a Home controller', function() {
        expect(controller).not.toBeNull();
    });

  /*  it('should have a scope', function() {
        expect(scope).not.toBeNull();
    });

    it('should send img to storage firebase', function() {
        scope.upload(img);
        expect(scope.$log).toBeNull();
    });

    it('should download img to storage firebase', function() {
        scope.download();
        expect(scope.$log).toBeNull();
    }); */

});
