describe('Multiplication Directive', function () {
    var compil, element, result, scope;

    beforeEach(module('calculator'));
    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile
        scope = $rootScope.$new()
        result = 0;

        scope.multiply = function(res) {
            result = res;
        }
        scope.data = {
            input1: 10,
            input2: 10
        }
        element = compile('<button multiply="multiply" numbers="data"></button>')(scope);
        scope.$apply();
    }));

    it('should expect some-value as 5', function () {
        element.triggerHandler('click')
        scope.$digest();
        expect(result).toEqual(100);
    });
})
