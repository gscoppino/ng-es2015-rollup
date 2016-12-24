import angular from 'angular';

import SampleServiceModule from './SampleService.module.js';

beforeEach(angular.mock.module(SampleServiceModule));

describe('SampleService', () => {
    let $rootScope, $log, $q;

    beforeEach(angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $log = $injector.get('$log');
        $q = $injector.get('$q');
    }));

    describe('Constructor', () => {
        let SampleService;

        it('should set dependencies on the instance object.', angular.mock.inject(($injector) => {
            spyOn(Object, 'assign').and.callFake(angular.noop);

            SampleService = $injector.get('SampleService');
            expect(Object.assign).toHaveBeenCalledWith(SampleService, { $log, $q });
        }));
    });

    describe('Methods', () => {
        let SampleService;

        beforeEach(angular.mock.inject(($injector) => {
            SampleService = $injector.get('SampleService');
        }));

        describe('resolve', () => {
            it('should return a promise that resolves with the value "42".', () => {
                SampleService.resolve()
                    .then(value => expect(value).toEqual(42))
                    .catch(()=> { fail('The value was not resolved.'); });

                $rootScope.$digest();
            });
        });

        describe('log', () => {
            it('should log a message.', () => {
                spyOn($log, 'log').and.callFake(angular.noop);
                SampleService.log();
                expect($log.log).toHaveBeenCalledWith(jasmine.any(String));
            });
        });
    });
});
