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

    describe('get', () => {
        let $rootScope, $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should return a pending $http.get promise to the same URL from the cache, if present.', () => {
            let testUrl = '/test/url';
            Http.pendingRequests.get.set(testUrl, 'cached promise');
            expect(Http.get(testUrl)).toBe('cached promise');
        });

        it(`should call $http.get with the arguments provided, and return the promise,
        if there is no pending request to the same URL in the cache.`, () => {
            let testUrl = '/test/url';

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn($http, 'get').and.returnValue(promise);

            let returnValue = Http.get(testUrl);
            expect($http.get).toHaveBeenCalledWith(testUrl);
            expect(returnValue).toBe(promise);
        });

        it('should cache the promise returned by $http.get.', () => {
            let testUrl = '/test/url';

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };

            spyOn($http, 'get').and.returnValue(promise);
            Http.get(testUrl);
            expect(Http.pendingRequests.get.has(testUrl)).toBe(true);
            expect(Http.pendingRequests.get.get(testUrl)).toBe(promise);
        });

        it('should remove a cached promise once it resolves or rejects.', () => {
            let testUrl = '/test/url',
                spyOnHttp = spyOn($http, 'get');

            spyOnHttp.and.returnValue($q.resolve());
            Http.get(testUrl);
            expect(Http.pendingRequests.get.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http.pendingRequests.get.has(testUrl)).toBe(false);

            spyOnHttp.and.returnValue($q.reject());
            Http.get(testUrl);
            expect(Http.pendingRequests.get.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http.pendingRequests.get.has(testUrl)).toBe(false);
        });
    });

    describe('post', () => {
        let $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should reject if the data provided has an id field.', () => {
            Http.post('/test/url', { id: 1 })
                .then(fail)
                .catch((rejection) => {
                    expect(rejection).toBeDefined();
                });
        });

        it(`should call $http.post with the arguments provided and return the promise,
        if the data provided was valid.`, () => {
            spyOn($http, 'post').and.returnValue('the result');

            let returnValue = Http.post('/test/url', {});
            expect($http.post).toHaveBeenCalledWith('/test/url', {});
            expect(returnValue).toBe('the result');
        });
    });

    describe('put', () => {
        let $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should reject if the data provided does not have an integer id field.', () => {
            Http.put('/test/url', { id: '1' })
                .then(fail)
                .catch((rejection) => {
                    expect(rejection).toBeDefined();
                });
        });
    });

    describe('patch', () => {
        let $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should reject if the data provided does not have an integer id field.', () => {
            Http.patch('/test/url', { id: '1' })
                .then(fail)
                .catch((rejection) => {
                    expect(rejection).toBeDefined();
                });
        });
    });

    describe('delete', () => {
        let $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should return a pending $http.delete promise to the same URL from the cache, if present.', () => {
            let testUrl = '/test/url';
            Http.pendingRequests.delete.set(testUrl, 'cached promise');
            expect(Http.delete(testUrl)).toBe('cached promise');
        });
    });
});