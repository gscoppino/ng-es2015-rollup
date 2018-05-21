import angular from 'angular';

import { RouterConfigModule } from './routes.module.js';

let $locationProvider;

beforeEach(angular.mock.module(RouterConfigModule, (_$locationProvider_) => {
    $locationProvider = _$locationProvider_;
}));

describe('Routes Configuration', () => {
    it('should be in HTML5 mode.', () => {
        expect($locationProvider.html5Mode().enabled).toBe(true);
    });

    it('should have loaded the default route.', angular.mock.inject(($rootScope, $state) => {
        // This test could be better but is OK for now.
        expect($state.current.url).not.toBe('/');
        $rootScope.$digest();
        expect($state.current.url).toBe('/');
    }));
});
