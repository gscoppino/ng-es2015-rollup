import angular from 'angular';

import SampleComponent from './sample-component.js';

beforeEach(angular.mock.module(SampleComponent));

describe('sample-component', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile and link successfully.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<sample-component></sample-component>')(scope);

            scope.$digest();
            expect(element).toBeDefined();
        });
    });

    describe('Controller', () => {
        let $log, $componentController;

        beforeEach(angular.mock.inject(($injector) => {
            $log = $injector.get('$log');
            $componentController = $injector.get('$componentController');
        }));

        describe('Constructor', () => {
            let SampleComponentController;

            it('should set dependencies on the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);

                SampleComponentController = $componentController('sampleComponent');
                expect(Object.assign).toHaveBeenCalledWith(SampleComponentController, { $log });
            });
        });

        describe('Methods', () => {
            let SampleComponentController;

            beforeEach(() => {
                SampleComponentController = $componentController('sampleComponent');
            });

            describe('$onInit', () => {
                it('should log a message', () => {
                    spyOn($log, 'log').and.callFake(angular.noop);

                    SampleComponentController.$onInit();
                    expect($log.log).toHaveBeenCalled();
                });
            });

            describe('$onChanges', () => {
                it('should check if any changes are the first change.', () => {
                    let changeSpy = jasmine.createSpy();

                    SampleComponentController.$onChanges({
                        change1: { isFirstChange: changeSpy },
                        change2: { isFirstChange: changeSpy }
                    });

                    expect(changeSpy.calls.count()).toBe(2);
                });

                it('should log a message for each change that is not the first change.', () => {
                    spyOn($log, 'log').and.callFake(angular.noop);

                    SampleComponentController.$onChanges({
                        change1: { isFirstChange: ()=> true },
                        change2: { isFirstChange: ()=> false }
                    });

                    expect($log.log.calls.count()).toBe(1);
                });
            });

            describe('$doCheck', () => {
                it('should log a message', () => {
                    spyOn($log, 'log').and.callFake(angular.noop);

                    SampleComponentController.$doCheck();
                    expect($log.log).toHaveBeenCalled();
                });
            });

            describe('$onDestroy', () => {
                it('should log a message', () => {
                    spyOn($log, 'log').and.callFake(angular.noop);

                    SampleComponentController.$onDestroy();
                    expect($log.log).toHaveBeenCalled();
                });
            });

            describe('$doCheck', () => {
                it('should log a message', () => {
                    spyOn($log, 'log').and.callFake(angular.noop);

                    SampleComponentController.$doCheck();
                    expect($log.log).toHaveBeenCalled();
                });
            });
        });
    });
});
