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

            it('should not have any listeners initialized.', () => {
                let AppController = $componentController('app');

                expect(AppController.listeners.length).toBe(0);
            });

            it(`should set a flag to not show app shell decorations by default, to avoid flickering in the
            case that the initially rendered view does not have them enabled.`, () => {
                let AppController = $componentController('app');

                expect(AppController.showDecorations).toBeFalsy();
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
                it('should listen for the $stateChangeStart event.', angular.mock.inject(($rootScope) => {
                    spyOn($rootScope, '$on').and.callFake(angular.noop);
                    AppController.$onInit();

                    expect($rootScope.$on).toHaveBeenCalledWith('$stateChangeStart', jasmine.any(Function));
                }));

                it('should store references to all watcher deregistration functions in a list, on the instance object.', () => {
                    AppController.$onInit();

                    expect(AppController.listeners.length).toBe(1);
                });

                it(`should toggle a flag for app decorations on the instance whenever the $stateChangeStart event fires,
                using the new state\'s configuration (or true if not specified).`, angular.mock.inject(($rootScope) => {
                    AppController.$onInit();

                    $rootScope.$broadcast('$stateChangeStart');
                    expect(AppController.showDecorations).toBe(true);

                    $rootScope.$broadcast('$stateChangeStart', {});
                    expect(AppController.showDecorations).toBe(true);

                    $rootScope.$broadcast('$stateChangeStart', { data: { showAppShellDecorations: undefined }});
                    expect(AppController.showDecorations).toBe(true);

                    $rootScope.$broadcast('$stateChangeStart', { data: { showAppShellDecorations: true }});
                    expect(AppController.showDecorations).toBe(true);

                    $rootScope.$broadcast('$stateChangeStart', { data: { showAppShellDecorations: false }});
                    expect(AppController.showDecorations).toBe(false);
                }));
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
