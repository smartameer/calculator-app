/**
 * Calculator Controller
 * @author: smartameer
 */

(function (ng) {
    'use strict';

    var CalculatorController = function ($scope, $timeout, CalculateService, CONST) {
        var vm = this
        vm.title = "Multiply"
        vm.integerPattern = /^\d*$/
        vm.data = {
            input1: '',
            input2: '',
        }
        vm.savedStatus = CONST.STATUS.INITIAL // idle
        vm.result = -1

        vm.setResult = function (data) {
            $scope.$apply()
            vm.savedStatus = CONST.STATUS.PROGRESS
            debugger;
            CalculateService.saveData(
                ng.extend({}, vm.data, { result: data }),
                function (error, response) {
                    if (ng.equals(error, null)) {
                        vm.savedStatus = CONST.STATUS.OK // final
                        vm.clearSavedStatus()
                        vm.result = data
                    } else {
                        vm.savedStatus = CONST.STATUS.ERROR
                    }
                })
        }

        vm.clearSavedStatus = function () {
            $timeout(function () {
                vm.savedStatus = CONST.STATUS.INITIAL
            }, 3000)
        }

        vm.reset = function () {
            vm.data = {
                input1: '',
                input2: '',
            }
            vm.result = -1
            vm.clearSavedStatus()
            $scope.calcForm.$setPristine(true)
            $scope.calcForm.$setUntouched(true)
        }

        vm.init = function () {
            CalculateService.getData(function (error, response) {
                if (ng.equals(error, null)) {
                    vm.data = {
                        input1: response.input1,
                        input2: response.input2
                    }
                    vm.result = response.result
                }
            })
        }

        vm.init()
    }

    CalculatorController.$inject = [
        '$scope',
        '$timeout',
        'CalculateService',
        'CONST'
    ]

    ng.module('calculator')
      .controller('CalculatorController', CalculatorController)
})(angular)


