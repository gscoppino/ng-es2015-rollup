import angular from 'angular';

import { AppModule } from './app.module.js';

beforeEach(angular.mock.module(AppModule));

/** @test {AppModule} */
describe('App Component', () => {
    describe('View', () => {
        let $rootScope, $compile;
        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<app></app>')(scope);

            scope.$digest();
            expect(element.html().trim().length).toBeGreaterThan(0);
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

        describe('Constructor', () => {
            it('should assign dependencies onto the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);
                $componentController('app');

                expect(Object.assign).toHaveBeenCalled();
            });

            it('should initialize the loading status flag to false.', () => {
                let AppController = $componentController('app');

                expect(AppController.isLoading).toBe(false);
            });

            it('should log a message with the $log service.', () => {
                spyOn($log, 'log').and.callFake(angular.noop);
                $componentController('app');

                expect($log.log).toHaveBeenCalled();
            });
        });

        describe('Methods', () => {
            let AppController;

            beforeEach(() => {
                AppController = $componentController('app');
            });

            describe('$onInit', () => {
                it('should listen for route change events.',
                    angular.mock.inject(($transitions) => {
                        spyOn($transitions, 'onStart')
                            .and
                            .callFake(angular.noop);

                        AppController.$onInit();

                        expect($transitions.onStart)
                            .toHaveBeenCalledWith({}, jasmine.any(Function));
                    }));
            });
        });

        describe('Events', () => {
            let AppController;

            beforeEach(() => {
                AppController = $componentController('app');
            });

            describe('Route Change Started', () => {
                it('should set the loading status flag to true.',
                    angular.mock.inject(($q, $transitions) => {
                        let transitionStartCallback;
                        spyOn($transitions, 'onStart')
                            .and
                            .callFake((criteria, callback) => {
                                transitionStartCallback = callback;
                            });

                        AppController.$onInit();

                        AppController.isLoading = false;
                        transitionStartCallback({
                            promise: $q(angular.noop)
                        });

                        expect(AppController.isLoading).toBe(true);
                    }));
            });

            describe('Route Change Finished (Success)', () => {
                it('should set the loading status flag to false.',
                    angular.mock.inject(($rootScope, $q, $transitions) => {
                        let transitionStartCallback;
                        spyOn($transitions, 'onStart')
                            .and
                            .callFake((criteria, callback) => {
                                transitionStartCallback = callback;
                            });

                        AppController.$onInit();

                        AppController.isLoading = true;
                        transitionStartCallback({
                            promise: $q.resolve()
                        });

                        expect(AppController.isLoading).toBe(true);
                        $rootScope.$digest();
                        expect(AppController.isLoading).toBe(false);
                    }));
            });

            describe('Route Change Finished (Fail)', () => {
                it('should set the loading status flag to false.',
                    angular.mock.inject(($rootScope, $q, $transitions) => {
                        let transitionStartCallback;
                        spyOn($transitions, 'onStart')
                            .and
                            .callFake((criteria, callback) => {
                                transitionStartCallback = callback;
                            });

                        AppController.$onInit();

                        AppController.isLoading = true;
                        transitionStartCallback({
                            promise: $q.reject().catch(angular.noop)
                        });

                        expect(AppController.isLoading).toBe(true);
                        $rootScope.$digest();
                        expect(AppController.isLoading).toBe(false);
                    }));
            });
        });
    });
});
