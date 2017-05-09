import angular from 'angular';

import { Http } from 'app/common/services/Http/Http.module.js';

import { ApiFactoryProvider, RESTApi } from './ApiFactory.module.js';

describe('Api Factory Module', () => {
    let $providerInjector;

    beforeEach(angular.mock.module(($injector) => {
        $providerInjector = $injector;
    }));

    describe('ApiFactoryProvider', () => {
        let instantiatedApiFactoryProvider;

        beforeEach(angular.mock.inject(angular.noop));
        beforeEach(() => {
            instantiatedApiFactoryProvider = $providerInjector.instantiate(ApiFactoryProvider, {});
        });

        it('should have an empty base URL by default.', () => {
            expect(instantiatedApiFactoryProvider.baseUrl).toBe('');
        });

        describe('setBaseUrl', () => {
            it('should allow customization of base URL.', () => {
                instantiatedApiFactoryProvider.setBaseUrl('/test/api');
                expect(instantiatedApiFactoryProvider.baseUrl).toBe('/test/api');
            });
        });

        describe('$get', () => {

            it('should be defined as an injectable factory function.', () => {
                expect(instantiatedApiFactoryProvider.$get)
                    .toEqual(jasmine.any(Function));
                expect(instantiatedApiFactoryProvider.$get.$inject)
                    .toEqual(jasmine.any(Array));
            });

            describe('ApiFactory', () => {
                let ApiFactory;

                beforeEach(angular.mock.inject(($injector) => {
                    ApiFactory = $injector.invoke(
                        instantiatedApiFactoryProvider.$get,
                        instantiatedApiFactoryProvider, {});
                }));

                describe('create', () => {
                    it('should create a new RESTApi instance',
                    angular.mock.inject(($injector) => {
                        instantiatedApiFactoryProvider.setBaseUrl('/test/api');
                        spyOn($injector, 'instantiate').and.callThrough();

                        let TestApi = ApiFactory.create('test');

                        expect(TestApi instanceof RESTApi).toBe(true);
                    }));
                });
            });
        });
    });
});

describe('RESTApi', () => {
    let Api;

    beforeEach(angular.mock.inject((Http) => {
        Api = new RESTApi('test-resource', '/test-api', Http);
    }));

    it('should have the right name, baseUrl, and request handler.', () => {
        expect(Api.name).toBe('test-resource');
        expect(Api.baseUrl).toBe('/test-api');
        expect(Api.http instanceof Http).toBe(true);
    });

    describe('getList', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'get').and.returnValue(promise);

            let result = Api.getList();
            expect(Api.http.get).toHaveBeenCalledWith('/test-api/test-resource');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.getList()
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('getSublist', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and query parameters, and return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'get').and.returnValue(promise);

            let result = Api.getSublist({
                param1: Number(0),
                param2: String('hi'),
                param3: Boolean(true)
            });

            expect(Api.http.get)
                .toHaveBeenCalledWith('/test-api/test-resource?param1=0&param2=hi&param3=true');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.getSublist({})
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('get', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and the given id, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'get').and.returnValue(promise);

            let result = Api.get(1);
            expect(Api.http.get).toHaveBeenCalledWith('/test-api/test-resource/1');
            expect(result).toBe(promise);

            // The id doesn't necessarily have to be an "id".
            Api.http.get.calls.reset();

            result = Api.get('sub');
            expect(Api.http.get).toHaveBeenCalledWith('/test-api/test-resource/sub');
            expect(result).toBe(promise);

        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.get(1)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('post', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.post with resource url and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'post').and.returnValue(promise);

            let result = Api.post({ the: 'element' });
            expect(Api.http.post).toHaveBeenCalledWith('/test-api/test-resource', { the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'post').and.returnValue($q.resolve({ data: 'the data' }));

            Api.post({ the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('put', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.put with resource url + element id, and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'put').and.returnValue(promise);

            let result = Api.put({ id: 1, the: 'element' });
            expect(Api.http.put).toHaveBeenCalledWith('/test-api/test-resource/1', { id: 1, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'put').and.returnValue($q.resolve({ data: 'the data' }));

            Api.put({ id: 1, the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('patch', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.patch with resource url + element id, and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'patch').and.returnValue(promise);

            let result = Api.patch({ id: 1, the: 'element' });
            expect(Api.http.patch).toHaveBeenCalledWith('/test-api/test-resource/1', { id: 1, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'patch').and.returnValue($q.resolve({ data: 'the data' }));

            Api.patch({ id: 1, the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('delete', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.delete with resource url and the given id, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'delete').and.returnValue(promise);

            let result = Api.delete(1);
            expect(Api.http.delete).toHaveBeenCalledWith('/test-api/test-resource/1');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'delete').and.returnValue($q.resolve({ data: 'the data' }));

            Api.delete(1)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('getNestedList', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'get').and.returnValue(promise);

            let result = Api.getNestedList(1, 'nested-resource');
            expect(Api.http.get).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.getNestedList(1, 'nested-resource')
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('getNestedSublist', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and query parameters, and return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'get').and.returnValue(promise);

            let result = Api.getNestedSublist(1, 'nested-resource', {
                param1: Number(0),
                param2: String('hi'),
                param3: Boolean(true)
            });

            expect(Api.http.get)
                .toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource?param1=0&param2=hi&param3=true');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.getNestedSublist(1, 'nested-resource', {})
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('nestedPost', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.post with resource url and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'post').and.returnValue(promise);

            let result = Api.nestedPost(1, 'nested-resource', { the: 'element' });
            expect(Api.http.post).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'post').and.returnValue($q.resolve({ data: 'the data' }));

            Api.nestedPost(1, 'nested-resource', { the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('customGet', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and the given path, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'get').and.returnValue(promise);

            let result = Api.customGet(1, 'nested-resource', 2);
            expect(Api.http.get).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource/2');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.customGet(1, 'nested-resource', 2)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('customPost', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.post with resource url and the given path and the element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'post').and.returnValue(promise);

            let result = Api.customPost(1, 'nested-resource', { the: 'element' });
            expect(Api.http.post).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'post').and.returnValue($q.resolve({ data: 'the data' }));

            Api.customPost(1, 'nested-resource', { the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('customPut', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.put with resource url and the given path and the element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'put').and.returnValue(promise);

            let result = Api.customPut(1, 'nested-resource', { id: 2, the: 'element' });
            expect(Api.http.put).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { id: 2, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'put').and.returnValue($q.resolve({ data: 'the data' }));

            Api.customPut(1, 'nested-resource', { id: 2, the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('customPatch', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.patch with resource url and the given path and the element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'patch').and.returnValue(promise);

            let result = Api.customPatch(1, 'nested-resource', { id: 2, the: 'element' });
            expect(Api.http.patch).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { id: 2, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'patch').and.returnValue($q.resolve({ data: 'the data' }));

            Api.customPatch(1, 'nested-resource', { id: 2, the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('customDelete', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.delete with resource url and the given path, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Api.http, 'delete').and.returnValue(promise);

            let result = Api.customDelete(1, 'nested-resource', 2);
            expect(Api.http.delete).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource/2');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Api.http, 'delete').and.returnValue($q.resolve({ data: 'the data' }));

            Api.customDelete(1, 'nested-resource', 2)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });
});
