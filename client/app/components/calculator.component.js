/**
 * Calculator Component
 * @author: smartameer
 */

(function (ng) {

    'use strict';

    ng.module('calculator')
        .component('myCalculator', {
            templateUrl: '/app/calculator.html',
            controller: 'CalculatorController',
            controllerAs: 'cc'
        })
})(angular)
