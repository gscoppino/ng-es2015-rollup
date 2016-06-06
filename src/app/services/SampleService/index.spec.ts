import angular from 'angular';
import SampleServiceModule from './index.ts';

beforeEach(module(SampleServiceModule));

describe('SampleService', () => {
    let $rootScope, $log, $q, SampleService;

    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $log = $injector.get('$log');
        $q = $injector.get('$q');
    }));

    describe('Constructor', () => {
        it('should set dependencies on the instance object.', inject(($injector) => {
            spyOn(Object, 'assign').and.callFake(angular.noop);
            SampleService = $injector.get('SampleService');
            expect(Object.assign).toHaveBeenCalledWith(SampleService, { $log: $log, $q: $q });
        }));
    });

    describe('Methods', () => {
        beforeEach(inject(($injector) => {
            SampleService = $injector.get('SampleService');
        }));

        describe('resolve', () => {
            it('should return a promise.', () => {
                SampleService.resolve()
                    .then(value => expect(value).toEqual(42))
                    .catch(()=> { fail('The value was not resolved.' ); });
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
