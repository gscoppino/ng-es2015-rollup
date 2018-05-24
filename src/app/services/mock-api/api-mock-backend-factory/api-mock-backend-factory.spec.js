import angular from 'angular';

import { ApiMockBackendFactoryModule } from './api-mock-backend-factory.module.js';

import { MockResource } from './api-mock-backend-factory.module.js';
import { API_BASE } from 'app/config/api/api.module.js';

beforeEach(angular.mock.module(ApiMockBackendFactoryModule));

/** @test {MockResource} **/
describe('MockResource', () => {
    let mockCollection = [{ id: 1 }], resource;

    it('should create a new empty collection if none is passed.', () => {
        expect(new MockResource('test').collection).toEqual([]);
    });

    it('should start at highest ID value of 0 if no collection is passed.', () => {
        expect(new MockResource('test').highestId).toBe(0);
    });

    beforeEach(() => {
        resource = new MockResource('test', {
            fixtureData: mockCollection
        });
    });

    it('should initialize with the given collection, if passed.', () => {
        expect(resource.collection).toEqual(mockCollection);

        // Ensure immutability
        expect(resource.collection).not.toBe(mockCollection);
    });

    it('should start highest ID at the top value in the collection passed.', () => {
        expect(resource.highestId).toBe(1);
    });

    describe('_getHighestId', () => {
        it('should return the highest id in the collection of elements passed.', () => {
            expect(MockResource._getHighestId([])).toBe(0);

            expect(MockResource._getHighestId([
                { id: 0 }
            ])).toBe(0);

            expect(MockResource._getHighestId([
                { id: 1 }
            ])).toBe(1);

            expect(MockResource._getHighestId([
                { id: 1 },
                { id: 100 }
            ])).toBe(100);
        });
    });

    describe('_query', () => {
        describe('string', () => {
            it('should check that the string values are equivalent.', () => {
                expect(MockResource._query('John', 'John', '')).toBe(true);
            });

            it('should check that the string values are equivalent, case-insensitive.', () => {
                expect(MockResource._query('John', 'john', '')).toBe(true);
            });

            it('should check that string values are not equivalent.', () => {
                expect(MockResource._query('John', 'jane', '')).toBe(false);
            });

            it('should check that the model string contains the query string.', () => {
                expect(MockResource._query('John', 'Jo', '_in')).toBe(true);
            });

            it('should check that the model string contains the query string, case-insensitive.', () => {
                expect(MockResource._query('John', 'jo', '_in')).toBe(true);
            });

            it('should check that the model string does not contain the query string.', () => {
                expect(MockResource._query('John', 'ja', '_in')).toBe(false);
            });
        });

        describe('boolean', () => {
            it('should check that the values are equivalent.', () => {
                expect(MockResource._query(true, true)).toBe(true);
                expect(MockResource._query(false, false)).toBe(true);
            });

            it('should check that the values are not equivalent.', () => {
                expect(MockResource._query(true, false)).toBe(false);
                expect(MockResource._query(false, true)).toBe(false);
            });
        });

        describe('number', () => {
            it('should check that the values are equivalent.', () => {
                expect(MockResource._query(1, 1, '')).toBe(true);
            });

            it('should check that the values are not equivalent.', () => {
                expect(MockResource._query(1, 2, '')).toBe(false);
            });

            it('should check that the model value is less than the query value.', () => {
                expect(MockResource._query(1, 2, '_lt')).toBe(true);
                expect(MockResource._query(2, 1, '_lt')).toBe(false);
            });

            it('should check that the model value is greater than the query value.', () => {
                expect(MockResource._query(2, 1, '_gt')).toBe(true);
                expect(MockResource._query(1, 2, '_gt')).toBe(false);
            });
        });

        describe('unknown', () => {
            it('should return true when both model and query value are null', () => {
                expect(MockResource._query(null, null, '')).toBe(true);
            });

            it('should return false when only one of model or query value is null.', () => {
                expect(MockResource._query(null, undefined, '')).toBe(false);
                expect(MockResource._query(undefined, null, '')).toBe(false);
            });

            it('should return false if the model value is an array or object (not attempting to compare).', () => {
                expect(MockResource._query({}, {}, '')).toBe(false);
                expect(MockResource._query([], [], '')).toBe(false);
            });
        });
    });

    describe('respondToGET', () => {
        it('should return a 200 OK with the entire collection if there are no params provided.', () => {
            let response = resource.respondToGET(null, null, null, null, null);
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(mockCollection);

            // Ensure immutability
            expect(response[1]).not.toBe(resource.collection);
        });

        it('should return a 200 OK with a filtered collection if there are params provided, but no id.', () => {
            let mockElement = { name: 'John' };
            resource.collection.push(mockElement);
            spyOn(MockResource, '_query').and.callThrough();

            let response = resource.respondToGET(null, null, null, null, { name: 'John' });
            expect(MockResource._query)
                .toHaveBeenCalledWith(mockElement.name, 'John', null);

            expect(response[0]).toBe(200);
            expect(response[1]).toEqual([mockElement]);

            // Ensure immutability
            expect(response[1][0]).not.toBe(mockElement);
        });

        it(`should return a 200 OK with a filtered collection that has been filtered using query operators
        if there are params provided that contain query operators.`, () => {
            let mockElement = { name: 'John' };
            resource.collection.push(mockElement);
            spyOn(MockResource, '_query').and.callThrough();

            let response = resource.respondToGET(null, null, null, null, { name_in: 'jo' });

            expect(MockResource._query)
                .toHaveBeenCalledWith(mockElement.name, 'jo', '_in');

            expect(response[0]).toBe(200);
            expect(response[1]).toEqual([mockElement]);

            // Ensure immutability
            expect(response[1][0]).not.toBe(mockElement);
        });

        it('should return a 200 OK with the element of the specified id, if id param is provided.', () => {
            let mockElement = { id: 1 };
            resource.collection.push(mockElement);

            let response = resource.respondToGET(null, null, null, null, { id: 1 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(mockElement);

            // Ensure immutability
            expect(response[1]).not.toBe(mockElement);
        });

        it('should return a 404 NOT FOUND with status message if the element of the specified id is not found.', () => {
            let response = resource.respondToGET(null, null, null, null, { id: 2 });
            expect(response[0]).toBe(404);
            expect(response[1]).toEqual(jasmine.any(String));
        });
    });

    describe('respondToPOST', () => {
        it('should return a 201 CREATED with the new element, assigning it a unique ID.', () => {
            let response = resource.respondToPOST(null, null, JSON.stringify({ description: 'A new element.' }), null, {});
            expect(response[0]).toBe(201);
            expect(response[1]).toEqual({ id: 2, description: 'A new element.' });

            // Ensure immutability
            expect(resource.collection.find((element) => element === response[1]))
                .toBeFalsy();
        });

        it('should update the collection with the new element.', () => {
            resource.respondToPOST(null, null, JSON.stringify({ description: 'A new element.' }), null, {});
            expect(resource.collection)
                .toContain({ id: 2, description: 'A new element.' });
        });
    });

    describe('respondToPUT', () => {
        it('should return a 200 OK with the updated element of the specified id', () => {
            resource.collection.push({ id: 2 });
            let response = resource.respondToPUT(null, null, JSON.stringify({ description: 'An updated element.' }), null, { id: 2 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual({ id: 2, description: 'An updated element.' });

            // Ensure immutability
            expect(resource.collection.find((element) => element === response[1])).toBeFalsy();
        });

        it('should update the collection element with the new data, ignoring any "id" property in the data.', () => {
            resource.collection.push({ id: 2 });
            resource.respondToPUT(null, null, JSON.stringify({ id: 3, description: 'An updated element.' }), null, { id: 2 });
            expect(resource.collection)
                .toContain({ id: 2, description: 'An updated element.' });
        });

        it('should return a 404 NOT FOUND with status message if the element of the specified id is not found.', () => {
            let response = resource.respondToPUT(null, null, JSON.stringify({ description: 'An updated element' }), null, { id: 2 });
            expect(response[0]).toBe(404);
            expect(response[1]).toEqual(jasmine.any(String));
        });
    });

    describe('respondToDELETE', () => {
        it('should return a 200 OK with the deleted element of the specified id.', () => {
            resource.collection.push({ id: 2 });
            let response = resource.respondToDELETE(null, null, null, null, { id: 2 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual({ id: 2 });
        });

        it('should remove the element from the collection', () => {
            resource.collection.push({ id: 2 });
            resource.respondToDELETE(null, null, null, null, { id: 2 });
            expect(resource.collection).not.toContain({ id: 2 });
        });

        it('should return a 200 OK with status message if the element of the specified id is not found.', () => {
            let response = resource.respondToDELETE(null, null, null, null, { id: 2 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(jasmine.any(String));
        });
    });
});

/** @test {MockResourceFactory} */
describe('MockResourceFactory', () => {
    let $log, MockResourceFactory;

    beforeEach(angular.mock.inject(($injector) => {
        $log = $injector.get('$log');
        MockResourceFactory = $injector.get('MockResourceFactory');
    }));

    describe('create', () => {
        let $httpBackend, mockRespondDefinitionFn;

        beforeEach(angular.mock.inject(($injector) => {
            $httpBackend = $injector.get('$httpBackend');
            mockRespondDefinitionFn = jasmine.createSpy().and.callFake(angular.noop);
            spyOn($httpBackend, 'whenRoute')
                .and
                .returnValue({ respond: mockRespondDefinitionFn });
        }));

        it('should create correct GET/POST/PUT/DELETE routes for the passed collection name and define responses.', () => {
            MockResourceFactory.create('users');

            expect($httpBackend.whenRoute).toHaveBeenCalledWith('GET', `${API_BASE}/users/:id?`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('POST', `${API_BASE}/users`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('POST', `${API_BASE}/users/`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('PUT', `${API_BASE}/users/:id`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('DELETE', `${API_BASE}/users/:id`);
            expect(mockRespondDefinitionFn.calls.count()).toBe(5);
        });

        it('should call appropriate functions in response handlers.', () => {
            let resource = MockResourceFactory.create('users');
            spyOn(resource, 'respondToGET').and.returnValue('the response');
            spyOn(resource, 'respondToPOST').and.returnValue('the response');
            spyOn(resource, 'respondToPUT').and.returnValue('the response');
            spyOn(resource, 'respondToDELETE').and.returnValue('the response');

            mockRespondDefinitionFn.calls.allArgs()
                .forEach(argsForCall => {
                    expect(argsForCall[0]).toEqual(jasmine.any(Function));
                    let response = argsForCall[0]();
                    expect(response).toBe('the response');
                });

            expect(resource.respondToGET).toHaveBeenCalled();
            expect(resource.respondToPOST).toHaveBeenCalled();
            expect(resource.respondToPUT).toHaveBeenCalled();
            expect(resource.respondToDELETE).toHaveBeenCalled();
        });

        it('should log HTTP data in response handlers if configured.', () => {
            let resource = MockResourceFactory.create('users', {
                logHTTPEvents: true
            });
            spyOn(resource, 'respondToGET').and.returnValue('the response');
            spyOn(resource, 'respondToPOST').and.returnValue('the response');
            spyOn(resource, 'respondToPUT').and.returnValue('the response');
            spyOn(resource, 'respondToDELETE').and.returnValue('the response');

            mockRespondDefinitionFn.calls.allArgs()
                .forEach(argsForCall => {
                    expect(argsForCall[0]).toEqual(jasmine.any(Function));
                    $log.reset();
                    argsForCall[0]();
                    expect($log.log.logs.length).toBe(1);
                });
        });

        it('should not log HTTP data in response handlers if not configured.', () => {
            let resource = MockResourceFactory.create('users');
            spyOn(resource, 'respondToGET').and.returnValue('the response');
            spyOn(resource, 'respondToPOST').and.returnValue('the response');
            spyOn(resource, 'respondToPUT').and.returnValue('the response');
            spyOn(resource, 'respondToDELETE').and.returnValue('the response');

            mockRespondDefinitionFn.calls.allArgs()
                .forEach(argsForCall => {
                    expect(argsForCall[0]).toEqual(jasmine.any(Function));
                    $log.reset();
                    argsForCall[0]();
                    expect($log.log.logs.length).toBe(0);
                });
        });

        it('should return the newly created MockResource.', () => {
            expect(MockResourceFactory.create('users') instanceof MockResource)
                .toBe(true);
        });
    });
});
