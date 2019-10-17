describe('CalculateService', function () {
    var CalculateService,
        log, http, constants;

    beforeEach(module('calculator'));
    beforeEach(function () {
        inject(function (_CalculateService_, _CONST_, $http, $log) {
            CalculateService = _CalculateService_;
            log = $log;
            http = $http;
            constants = _CONST_;
        })
    });

    describe('Get data', function () {
        it('should have methods defined', function() {
            expect(CalculateService.getData).toBeDefined()
            expect(CalculateService.getData).toEqual(jasmine.any(Function))
        })
        it('should callback with result', function () {
            var methods = {
                func: function(error, response) {
                    return true
                }
            }
            spyOn(log, 'info');
            CalculateService.getData(methods.func);
        });
    });

    describe('Save data', function () {
        it('should have methods defined', function() {
            expect(CalculateService.saveData).toBeDefined()
            expect(CalculateService.saveData).toEqual(jasmine.any(Function))
        })
        it('should callback with result', function () {
            var methods = {
                func: function(error, response) {
                    return true
                }
            }
            spyOn(log, 'info');
            CalculateService.saveData({
                input1: 1,
                input2: 2,
                result: 2
            }, methods.func);
        });
    });
});
