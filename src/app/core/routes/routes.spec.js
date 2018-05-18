import angular from 'angular';

import RoutesModule from './routes.module.js';

beforeEach(angular.mock.module(RoutesModule));

describe('Routes Configuration', () => {
    it('should be in HTML5 mode.', angular.mock.inject(($location) => {
        try {
            // This function throws an exception if used as a setter, when not in HTML5 mode.
            // This is not the best way to do the test since it relies on knowledge of how this particular
            // function in the Angular API is written (the fact that it will throw an exception is not documented).
            $location.state({});
        } catch (exception) {
            fail();
        }
    }));

    it('should have loaded the default route.', angular.mock.inject(($rootScope, $state) => {
        // This test could be better but is OK for now.
        expect($state.current.url).not.toBe('/');
        $rootScope.$digest();
        expect($state.current.url).toBe('/');
    }));
});
