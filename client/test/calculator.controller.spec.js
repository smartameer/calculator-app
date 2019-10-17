describe('Calculator Application Controller', function() {

    beforeEach(module('calculator'))

    var timeout, scope, controller, log, constants, service

    beforeEach(inject(function($rootScope, $controller, $timeout, $log, _CalculateService_, CONST) {
        timeout = $timeout
        scope = $rootScope.$new()
        log = $log
        constants = CONST
        service = _CalculateService_
        controller = $controller('CalculatorController', {
            $scope: scope,
            $timeout: timeout,
            $log: log,
            CONST: constants,
            CalculateService: service
        })
    }))

    afterEach(function() {

    })

    it('Should have defined values', function() {
        expect(controller.savedStatus).toEqual(constants.STATUS.INITIAL)
        expect(controller.result).toEqual(-1)
        expect(controller.data).toEqual({
            input1: '',
            input2: ''
        })
        expect(controller.integerPattern).toEqual(/^\d*$/)
        expect(controller.setResult).toBeDefined()
        expect(controller.clearSavedStatus).toBeDefined()
        expect(controller.reset).toBeDefined()
        expect(controller.init).toBeDefined()
    })

    it('should have called CalculateService getData', function () {
        spyOn(service, 'getData').and.callThrough();
        controller.init();
        expect(service.getData).toHaveBeenCalled()
    })

    it('should have called CalculateService saveData', function () {
        spyOn(service, 'saveData').and.callThrough()
        controller.data = {
            input1: 10,
            input2: 20
        }
        controller.setResult(200)
        expect(service.saveData).toHaveBeenCalled()
        expect(service.saveData).toHaveBeenCalledWith({
            input1: 10,
            input2: 20,
            result: 200
        }, jasmine.any(Function))
    })

    it('should have reset the data', function () {
        scope.calcForm = {
            $setPristine: function() { return },
            $setUntouched: function() { return }
        }
        controller.data = {
            input1: 0,
            input2: 1
        }
        controller.reset()
        expect(controller.data).toEqual({
            input1: '',
            input2: ''
        })
    })
})
