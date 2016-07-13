import angular from 'angular';
import App from './app';

beforeEach(angular.mock.module(App));

describe('App Component', () => {
    describe('View', () => {
        let $rootScope, $compile;
        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile', () => {
            let scope = $rootScope.$new(),
                element = $compile('<app></app>')(scope);

            scope.$digest();
            expect(element.html().trim()).toEqual('Hello World');
        });
    });

    describe('Controller', () => {
        let $log, $componentController;
        beforeEach(angular.mock.inject(($injector) => {
            $log = $injector.get('$log');
            $componentController = $injector.get('$componentController');
        }));

        it('should exist.', () => {
            let controller = $componentController('app');
            expect(controller).toBeDefined();
        });

        it('should log to the logger.', () => {
            spyOn($log, 'log').and.callFake(angular.noop);
            $componentController('app');

            expect($log.log).toHaveBeenCalledWith('Loaded!');
        });
    });
});
