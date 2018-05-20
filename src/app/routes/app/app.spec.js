import angular from 'angular';
import { AppRouterModule } from './app.module.js';

beforeEach(angular.mock.module(AppRouterModule));

describe('Routes Configuration', () => {
    it('should have loaded the default route.', angular.mock.inject(($rootScope, $state) => {
        // This test could be better but is OK for now.
        expect($state.current.url).not.toBe('/');
        $rootScope.$digest();
        expect($state.current.url).toBe('/');
    }));
});

describe('App Shell Component', () => {
    describe('View', () => {
        let $rootScope, $compile;
        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<app-shell></app-shell>')(scope);

            scope.$digest();
            expect(element.html().trim().length).toBeGreaterThan(0);
        });
    });
});