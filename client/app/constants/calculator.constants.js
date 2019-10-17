/**
 * Calculator Constants
 * @author smartameer
 */

(function (ng) {
    'use strict';

    var constants = {
        BASE_API: 'http://127.0.0.1:8080/api',
        API: {
            GET_DATA: {
                URL: '/getData',
                METHOD: 'GET'
            },
            SAVE_DATA: {
                URL: '/saveData',
                METHOD: 'POST',
                PARAMS: {
                    input1: null,
                    input2: null,
                    result: null
                }
            }
        },
        STATUS: {
            INITIAL: -1,
            OK: 1,
            PROGRESS: 0,
            ERROR: 2
        }
    }

    ng.module('calculator')
        .constant('CONST', constants)
})(angular);
