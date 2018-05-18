import angular from 'angular';

import AppModule from './app.module.js';

beforeEach(angular.mock.module(AppModule));

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

            it(`should set a flag to indicate that no further loading is expected (since as of this writing,
            there are no states to load).`, () => {
                let AppController = $componentController('app');

                expect(AppController.isLoading).toBe(false);
            });

            it('should log a message to the logger.', () => {
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
                it('should listen for the route change events, in order to properly update the application state.',
                angular.mock.inject(($transitions) => {
                    spyOn($transitions, 'onStart').and.callFake(angular.noop);
                    AppController.$onInit();

                    expect($transitions.onStart).toHaveBeenCalledWith({}, jasmine.any(Function));
                }));

                describe('route changes', () => {
                    it('should set the loading flag on the instance to true.',
                    angular.mock.inject(($q, $transitions) => {
                        let transitionStartCallback;
                        spyOn($transitions, 'onStart').and.callFake((criteria, callback) => {
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

                describe('route change successful', () => {
                    it('should set the loading flag on the instance to false.',
                    angular.mock.inject(($rootScope, $q, $transitions) => {
                        let transitionStartCallback;
                        spyOn($transitions, 'onStart').and.callFake((criteria, callback) => {
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

                describe('route change unsuccessful', () => {
                    it('should set the loading flag on the instance to false.',
                    angular.mock.inject(($rootScope, $q, $transitions) => {
                        let transitionStartCallback;
                        spyOn($transitions, 'onStart').and.callFake((criteria, callback) => {
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
});
