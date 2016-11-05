import angular from 'angular';
import Http from './Http';

beforeEach(angular.mock.module(Http));

describe('Http Service', () => {
    let Http;

    describe('Constructor', () => {
        it('should use Object.assign', angular.mock.inject(($injector) => {
            spyOn(Object, 'assign').and.callThrough();
            Http = $injector.get('Http');
            expect(Object.assign).toHaveBeenCalledWith(Http, jasmine.any(Object));
        }));

        it('should have no pending requests.', angular.mock.inject(($injector) => {
            Http = $injector.get('Http');

            expect(Http.pendingRequests).toEqual({
                get: jasmine.any(Map),
                put: jasmine.any(Map),
                patch: jasmine.any(Map),
                delete: jasmine.any(Map)
            });
            expect(Http.pendingRequests.get.size).toBe(0);
            expect(Http.pendingRequests.put.size).toBe(0);
            expect(Http.pendingRequests.patch.size).toBe(0);
            expect(Http.pendingRequests.delete.size).toBe(0);
        }));
    });
});