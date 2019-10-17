describe('Calculator Application Controller', function() {

    beforeEach(module('calculator'))

    var timeout, q, scope, controller, http, log, constants

    beforeEach(inject(function($rootScope, $controller, $timeout, $q, $httpBackend, $log, CONST) {
        timeout = $timeout
        q = $q
        scope = $rootScope.$new()
        log = $log
        constants = CONST
        http = $httpBackend
        controller = $controller('CalculatorController', {
            $scope: scope,
            $http: http,
            $timeout: timeout,
            $log: log,
            CONST: constants
        })
    }))

})
