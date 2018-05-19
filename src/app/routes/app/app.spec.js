import angular from 'angular';

import RoutesModule from './app.module.js';

beforeEach(angular.mock.module(RoutesModule));

describe('Routes Configuration', () => {
    it('should have loaded the default route.', angular.mock.inject(($rootScope, $state) => {
        // This test could be better but is OK for now.
        expect($state.current.url).not.toBe('/');
        $rootScope.$digest();
        expect($state.current.url).toBe('/');
    }));
});
