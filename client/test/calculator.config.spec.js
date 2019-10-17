/* global window */
describe('Calculator Application', function() {

    beforeEach(module('calculator'));

    it('should define the Config constant', inject(function(CONST) {
        expect(CONST).toBeDefined();
        expect(CONST.BASE_API).toBe('http://127.0.0.1:8080/api');
        expect(CONST.API.GET_DATA).toEqual({
            URL: '/getData',
            METHOD: 'GET'
        });
        expect(CONST.API.SAVE_DATA).toEqual({
            URL: '/saveData',
            METHOD: 'POST',
            PARAMS: {
                input1: null,
                input2: null,
                result: null
            }
        });
        expect(CONST.STATUS).toEqual({
            INITIAL: -1,
            OK: 1,
            PROGRESS: 0,
            ERROR: 2
        });
    }));
});
