import angular from 'angular';

import HttpModule from './Http.module.js';

beforeEach(angular.mock.module(HttpModule));

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

            expect(Http._pendingRequests).toEqual({
                get: jasmine.any(Map),
                put: jasmine.any(Map),
                patch: jasmine.any(Map),
                delete: jasmine.any(Map)
            });
            expect(Http._pendingRequests.get.size).toBe(0);
            expect(Http._pendingRequests.put.size).toBe(0);
            expect(Http._pendingRequests.patch.size).toBe(0);
            expect(Http._pendingRequests.delete.size).toBe(0);
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
            Http._pendingRequests.get.set(testUrl, 'cached promise');
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
            expect(Http._pendingRequests.get.has(testUrl)).toBe(true);
            expect(Http._pendingRequests.get.get(testUrl)).toBe(promise);
        });

        it('should remove a cached promise once it resolves or rejects.', () => {
            let testUrl = '/test/url',
                spyOnHttp = spyOn($http, 'get');

            spyOnHttp.and.returnValue($q.resolve());
            Http.get(testUrl);
            expect(Http._pendingRequests.get.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.get.has(testUrl)).toBe(false);

            spyOnHttp.and.returnValue($q.reject().catch(angular.noop));
            Http.get(testUrl);
            expect(Http._pendingRequests.get.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.get.has(testUrl)).toBe(false);
        });
    });

    describe('post', () => {
        let $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
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
        let $rootScope, $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
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

        it('should return a pending $http.put promise to the same URL from the cache, if present.', () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                promise = {
                    then: () => promise,
                    catch: () => promise,
                    finally: () => promise
                };

            Http._pendingRequests.put.set(testUrl, promise);
            expect(Http.put(testUrl, mockData)).toBe(promise);
        });

        it(`should call itself with the arguments provided and return the promise,
        if the data provided was valid, after the pending request
        to the same URL in the cache resolves.`, () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                promise = {
                    then: () => promise,
                    catch: () => promise,
                    finally: () => promise
                };

            Http._pendingRequests.put.set(testUrl, $q.resolve());
            Http.put(testUrl, mockData)
                .then((result) => expect(result).toBe(promise))
                .catch(() => fail());

            spyOn(Http, 'put').and.returnValue(promise);

            expect(Http.put).not.toHaveBeenCalled();
            $rootScope.$digest();
            expect(Http.put).toHaveBeenCalledWith(testUrl, mockData);
        });

        it(`should return the rejected promise, if the data provided was valid,
        after the pending request to the same URL in the cache rejects.`, () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                promise = {
                    then: () => promise,
                    catch: () => promise,
                    finally: () => promise
                };

            Http._pendingRequests.put.set(testUrl, $q.reject('reason'));
            Http.put(testUrl, mockData)
                .then(() => fail())
                .catch((result) => expect(result).toBe('reason'));

            spyOn(Http, 'put').and.returnValue(promise);

            expect(Http.put).not.toHaveBeenCalled();
            $rootScope.$digest();
            expect(Http.put).not.toHaveBeenCalled();
        });

        it(`should call $http.put with the arguments provided and return the promise,
        if the data provided was valid, and there is no pending request to the same
        url in the cache.`, () => {
            let testUrl = '/test/url',
                mockData = { id: 1 };

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn($http, 'put').and.returnValue(promise);

            let returnValue = Http.put(testUrl, mockData);
            expect($http.put).toHaveBeenCalledWith(testUrl, mockData);
            expect(returnValue).toBe(promise);
        });

        it('should cache the promise returned by $http.put.', () => {
            let testUrl = '/test/url',
                mockData = { id: 1 };

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };

            spyOn($http, 'put').and.returnValue(promise);
            Http.put(testUrl, mockData);
            expect(Http._pendingRequests.put.has(testUrl)).toBe(true);
            expect(Http._pendingRequests.put.get(testUrl)).toBe(promise);
        });

        it('should remove a cached promise once it resolves or rejects.', () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                spyOnHttp = spyOn($http, 'put');

            spyOnHttp.and.returnValue($q.resolve());
            Http.put(testUrl, mockData);
            expect(Http._pendingRequests.put.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.put.has(testUrl)).toBe(false);

            spyOnHttp.and.returnValue($q.reject().catch(angular.noop));
            Http.put(testUrl, mockData);
            expect(Http._pendingRequests.put.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.put.has(testUrl)).toBe(false);
        });
    });

    describe('patch', () => {
        let $rootScope, $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should return a pending $http.patch promise to the same URL from the cache, if present.', () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                promise = {
                    then: () => promise,
                    catch: () => promise,
                    finally: () => promise
                };

            Http._pendingRequests.patch.set(testUrl, promise);
            expect(Http.patch(testUrl, mockData)).toBe(promise);
        });

        it('should reject if the data provided does not have an integer id field.', () => {
            Http.patch('/test/url', { id: '1' })
                .then(fail)
                .catch((rejection) => {
                    expect(rejection).toBeDefined();
                });
        });

        it(`should call itself with the arguments provided and return the promise,
        if the data provided was valid, after the pending request
        to the same URL in the cache resolves.`, () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                promise = {
                    then: () => promise,
                    catch: () => promise,
                    finally: () => promise
                };

            Http._pendingRequests.patch.set(testUrl, $q.resolve());
            Http.patch(testUrl, mockData)
                .then((result) => expect(result).toBe(promise))
                .catch(() => fail());

            spyOn(Http, 'patch').and.returnValue(promise);

            expect(Http.patch).not.toHaveBeenCalled();
            $rootScope.$digest();
            expect(Http.patch).toHaveBeenCalledWith(testUrl, mockData);
        });

        it(`should return the rejected promise, if the data provided was valid,
        after the pending request to the same URL in the cache rejects.`, () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                promise = {
                    then: () => promise,
                    catch: () => promise,
                    finally: () => promise
                };

            Http._pendingRequests.patch.set(testUrl, $q.reject('reason'));
            Http.patch(testUrl, mockData)
                .then(() => fail())
                .catch((result) => expect(result).toBe('reason'));

            spyOn(Http, 'patch').and.returnValue(promise);

            expect(Http.patch).not.toHaveBeenCalled();
            $rootScope.$digest();
            expect(Http.patch).not.toHaveBeenCalled();
        });

        it(`should call $http.patch with the arguments provided and return the promise,
        if the data provided was valid, and there is no pending request to the same
        url in the cache.`, () => {
            let testUrl = '/test/url',
                mockData = { id: 1 };

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn($http, 'patch').and.returnValue(promise);

            let returnValue = Http.patch(testUrl, mockData);
            expect($http.patch).toHaveBeenCalledWith(testUrl, mockData);
            expect(returnValue).toBe(promise);
        });

        it('should cache the promise returned by $http.patch.', () => {
            let testUrl = '/test/url',
                mockData = { id: 1 };

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };

            spyOn($http, 'patch').and.returnValue(promise);
            Http.patch(testUrl, mockData);
            expect(Http._pendingRequests.patch.has(testUrl)).toBe(true);
            expect(Http._pendingRequests.patch.get(testUrl)).toBe(promise);
        });

        it('should remove a cached promise once it resolves or rejects.', () => {
            let testUrl = '/test/url',
                mockData = { id: 1 },
                spyOnHttp = spyOn($http, 'patch');

            spyOnHttp.and.returnValue($q.resolve());
            Http.patch(testUrl, mockData);
            expect(Http._pendingRequests.patch.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.patch.has(testUrl)).toBe(false);

            spyOnHttp.and.returnValue($q.reject().catch(angular.noop));
            Http.patch(testUrl, mockData);
            expect(Http._pendingRequests.patch.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.patch.has(testUrl)).toBe(false);
        });
    });

    describe('delete', () => {
        let $rootScope, $q, $http, Http;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $http = $injector.get('$http');
            Http = $injector.get('Http');
        }));

        it('should return a pending $http.delete promise to the same URL from the cache, if present.', () => {
            let testUrl = '/test/url';
            Http._pendingRequests.delete.set(testUrl, 'cached promise');
            expect(Http.delete(testUrl)).toBe('cached promise');
        });

        it(`should call $http.delete with the arguments provided, and return the promise,
        if there is no pending request to the same URL in the cache.`, () => {
            let testUrl = '/test/url';

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn($http, 'delete').and.returnValue(promise);

            let returnValue = Http.delete(testUrl);
            expect($http.delete).toHaveBeenCalledWith(testUrl);
            expect(returnValue).toBe(promise);
        });

        it('should cache the promise returned by $http.delete.', () => {
            let testUrl = '/test/url';

            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };

            spyOn($http, 'delete').and.returnValue(promise);
            Http.delete(testUrl);
            expect(Http._pendingRequests.delete.has(testUrl)).toBe(true);
            expect(Http._pendingRequests.delete.get(testUrl)).toBe(promise);
        });

        it('should remove a cached promise once it resolves or rejects.', () => {
            let testUrl = '/test/url',
                spyOnHttp = spyOn($http, 'delete');

            spyOnHttp.and.returnValue($q.resolve());
            Http.delete(testUrl);
            expect(Http._pendingRequests.delete.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.delete.has(testUrl)).toBe(false);

            spyOnHttp.and.returnValue($q.reject().catch(angular.noop));
            Http.delete(testUrl);
            expect(Http._pendingRequests.delete.has(testUrl)).toBe(true);
            $rootScope.$digest();
            expect(Http._pendingRequests.delete.has(testUrl)).toBe(false);
        });
    });
});
