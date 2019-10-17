/**
 * Calculator Directive
 * @author smartameer
 */

(function (ng) {
    'use strict';

    var MultiplyDirective = function () {

        var multiply = function (x, y) {
            return x * y
        }

        return {
            restrict: 'A',
            scope: {
                method: '&multiply',
                numbers: '='
            },
            link: function (scope, element) {
                element.bind('click', function (event) {
                    event.preventDefault()
                    var result = multiply(scope.numbers.input1, scope.numbers.input2)
                    scope.method()(result)
                })
            }
        }
    }

    ng.module('calculator')
        .directive('multiply', MultiplyDirective)
})(angular)
