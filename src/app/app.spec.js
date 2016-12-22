import angular from 'angular';

import { directiveNormalize } from 'app/common/utils/utils.js';

import AppModule, { PROVIDERS as AppProviders } from './app.js';

beforeEach(angular.mock.module(AppModule));

describe('App Component', () => {
    describe('View', () => {
        let $rootScope, $compile,
            tag = directiveNormalize(AppProviders.AppComponent);

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile', () => {
            let scope = $rootScope.$new(),
                element = $compile(`<${tag}></${tag}>`)(scope);

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
            let controller = $componentController(AppProviders.AppComponent);
            expect(controller).toBeDefined();
        });

        describe('Constructor', () => {
            it('should assign dependencies onto the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);
                $componentController(AppProviders.AppComponent);

                expect(Object.assign).toHaveBeenCalled();
            });

            it('should not have any listeners initialized.', () => {
                let AppController = $componentController(AppProviders.AppComponent);

                expect(AppController.listeners.length).toBe(0);
            });

            it(`should set a flag to indicate that no further loading is expected (since as of this writing,
            there are no states to load).`, () => {
                let AppController = $componentController(AppProviders.AppComponent);

                expect(AppController.isLoading).toBe(false);
            });

            it('should log a message to the logger.', () => {
                spyOn($log, 'log').and.callFake(angular.noop);
                $componentController(AppProviders.AppComponent);

                expect($log.log).toHaveBeenCalled();
            });
        });

        describe('Methods', () => {
            let AppController;

            beforeEach(() => {
                AppController = $componentController(AppProviders.AppComponent);
            });

            describe('$onInit', () => {
                it('should listen for the route change events, in order to properly update the application state.',
                angular.mock.inject(($rootScope) => {
                    spyOn($rootScope, '$on').and.callFake(angular.noop);
                    AppController.$onInit();

                    expect($rootScope.$on).toHaveBeenCalledWith('$locationChangeStart', jasmine.any(Function));
                    expect($rootScope.$on).toHaveBeenCalledWith('$locationChangeSuccess', jasmine.any(Function));
                }));

                it('should store references to all watcher deregistration functions in a list, on the instance object.', () => {
                    AppController.$onInit();

                    expect(AppController.listeners.length).toBe(2);
                });
            });

            describe('Listeners', () => {
                let $rootScope;

                beforeEach(angular.mock.inject(($injector) => {
                    $rootScope = $injector.get('$rootScope');
                }));

                describe('route changes', () => {
                    it('should set the loading flag on the instance to true.', () => {
                        AppController.$onInit();

                        AppController.isLoading = false;
                        $rootScope.$broadcast('$locationChangeStart');
                        expect(AppController.isLoading).toBe(true);
                    });
                });

                describe('route change successful', () => {
                    it('should set the loading flag on the instance to false.', () => {
                        AppController.$onInit();

                        AppController.isLoading = true;
                        $rootScope.$broadcast('$locationChangeSuccess');
                        expect(AppController.isLoading).toBe(false);
                    });
                });
            });

            describe('$onDestroy', () => {
                it('should execute the deregistration functions for every listener that was initialized.', () => {
                    AppController.listeners = [jasmine.createSpy(), jasmine.createSpy(), jasmine.createSpy()];
                    AppController.$onDestroy();

                    AppController.listeners.forEach((listener) => expect(listener).toHaveBeenCalled());
                });
            });
        });
    });
});
