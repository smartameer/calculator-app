/**
 * Calculator Module
 * @author: smartameer
 */

(function (ng) {
    'use strict';

    ng.module('calculator', [
        'ngMessages',
        'ngMaterial'
    ]).config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .dark();
    })
})(angular)
