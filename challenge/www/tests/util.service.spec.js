
describe("UtilService", function() {
    var service;
    beforeEach(function() {
        module("utils");
        inject(function ($injector) {
            service = $injector.get('UtilService');
        });
    });

    it('should calc 0 minute for time', function() {
        expect(service.getDateString(new Date())).toBe('0 minute ');
    });

    it('should calc 1 minute for time', function() {
        var time = new Date();
        var newTime = new Date();
        newTime.setMinutes(time.getMinutes() - 1);
        expect(service.getDateString(newTime)).toBe('1 minute ');
    });

    it('should calc 2 minutes for time', function() {
        var time = new Date();
        var newTime = new Date();
        newTime.setMinutes(time.getMinutes() - 2);
        expect(service.getDateString(newTime)).toBe('2 minutes ');
    });

    it('should calc 1 hour for time', function() {
        var time = new Date();
        var newTime = new Date();
        newTime.setHours(time.getHours() - 1);
        expect(service.getDateString(newTime)).toBe('1 hour, 0 minute ');
    });

    it('should calc 2 hours for time', function() {
        var time = new Date();
        var newTime = new Date();
        newTime.setHours(time.getHours() - 2);
        expect(service.getDateString(newTime)).toBe('2 hours, 0 minute ');
    });

    it('should calc 1 day for time', function() {
        var time = new Date();
        var newTime = new Date();
        newTime.setDate(time.getDate() - 1)
        expect(service.getDateString(newTime)).toBe('1 day, 0 hour, 0 minute ');
    });

    it('should calc 2 day for time', function() {
        var time = new Date();
        var newTime = new Date();
        newTime.setDate(time.getDate() - 2)
        expect(service.getDateString(newTime)).toBe('2 days, 0 hour, 0 minute ');
    });

});
