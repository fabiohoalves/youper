describe("HomeController", function() {
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
});
