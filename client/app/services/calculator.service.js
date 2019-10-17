/**
 * Calculator Service
 * @author smartameer
 */

(function (ng) {
    var CalculateService = function ($http, $log, CONST) {
        var saveData = function (data, callback) {
            $http({
                url: CONST.BASE_API + CONST.API.SAVE_DATA.URL,
                method: CONST.API.SAVE_DATA.METHOD,
                data: data
            }).then(function (resp) {
                if (ng.equals(resp.status, 202)) {
                    $log.info('Record Saved')
                    return callback(null, resp)
                }
                return callback({ errorMessage: 'INVALID REQUEST' }, null)
            }).catch(function (error) {
                $log.info('Unable to save')
                return callback(error, null)
            })
        }

        var getData = function (callback, limit) {
            $http({
                url: CONST.BASE_API + CONST.API.GET_DATA.URL,
                method: CONST.API.GET_DATA.METHOD,
                params: { limit: limit || 1}
            }).then(function (resp) {
                $log.info('Found a record')
                if (ng.equals(resp.status, 200) &&
                    !ng.equals(resp.data, null)) {
                    return callback(null, resp.data)
                }
                return callback({ errorMessage: 'INVALID REQUEST' }, null)
            }).catch(function (error) {
                $log.info('No Record')
                return callback(error, null)
            })
        }

        return {
            getData: getData,
            saveData: saveData
        }
    }

    CalculateService.$inject = [
        '$http',
        '$log',
        'CONST'
    ]

    ng.module('calculator')
        .factory('CalculateService', CalculateService)
})(angular)
