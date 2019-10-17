/**
 * Calculator
 * @author: smartameer
 */

(function () {
    angular
        .module('calculator', [
            'ngMessages',
            'ngMaterial'
        ]);
})();


(function () {
    angular
        .module('calculator')
        .constant('CONST', {
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
        });
})();


(function () {
    var CalculatorController = function ($scope, $http, $timeout, $log, CONST) {
        var vm = this;
        vm.title = "Multiply";
        vm.integerPattern = /^\d*$/;
        vm.data = {
            fnum: '',
            snum: '',
        };
        vm.savedStatus = -1; // idle
        vm.output = -1;

        vm.setResult = function (data) {
            vm.output = data;
            $scope.$apply();
            vm.savedStatus = CONST.STATUS.PROGRESS;
            $http({
                url: CONST.BASE_API + CONST.API.SAVE_DATA.URL,
                method: CONST.API.SAVE_DATA.METHOD,
                data: angular.extend({}, {
                    input1: vm.data.fnum,
                    input2: vm.data.snum,
                    result: data
                })
            }).then(function (resp) {
                if (resp.status === 202) {
                    $log.debug('Saved');
                    vm.savedStatus = CONST.STATUS.OK; // final
                    vm.clearSavedStatus();
                } else {
                    vm.savedStatus = CONST.STATUS.ERROR;
                }
            }).catch(function (error) {
                $log.info('No Records');
            });
        };

        vm.clearSavedStatus = function () {
            $timeout(function () {
                vm.savedStatus = CONST.STATUS.INITIAL;
            }, 3000);
        };

        vm.reset = function () {
            vm.data = {
                fnum: '',
                snum: '',
            };
            vm.output = -1;
            vm.clearSavedStatus();
            $scope.calcForm.$setPristine(true);
            $scope.calcForm.$setUntouched(true);
        };

        vm.init = function () {
            $http({
                url: CONST.BASE_API + CONST.API.GET_DATA.URL,
                method: CONST.API.GET_DATA.METHOD
            }).then(function (resp) {
                vm.data.fnum = resp.data.input1;
                vm.data.snum = resp.data.input2;
                vm.output = resp.data.result;
            }).catch(function (error) {
                $log.info('No Records');
            });
        };

        vm.init();
    };

    CalculatorController.$inject = ['$scope', '$http', '$timeout', '$log', 'CONST'];

    angular
        .module('calculator')
        .component('myCalculator', {
            templateUrl: '/app/calculator.html',
            controller: CalculatorController,
            controllerAs: 'cc'
        });
})();


(function () {
    var MultiplyDirective = function () {
        var multiply = function (x, y) {
            return x * y;
        };

        return {
            restrict: 'A',
            scope: {
                method: '&multiply',
                numbers: '='
            },
            link: function (scope, element) {
                element.bind('click', function (event) {
                    event.preventDefault();
                    var result = multiply(scope.numbers.fnum, scope.numbers.snum);
                    scope.method()(result);
                });
            }
        };
    };

    angular
        .module('calculator')
        .directive('multiply', MultiplyDirective);
})();
