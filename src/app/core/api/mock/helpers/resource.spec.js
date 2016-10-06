import angular from 'angular';
import { apiBase } from 'app/core/api/api';
import MockResourceFactory, { MockResource } from './resource';

beforeEach(angular.mock.module(MockResourceFactory));

describe('MockResource', () => {
    let mockCollection = [{ id: 0 }], resource;

    it('should create a new empty collection if none is passed.', () => {
        expect(new MockResource('test').collection).toEqual([]);
    });

    beforeEach(() => {
        resource = new MockResource('test', mockCollection);
    });

    it('should create a shallow clone of the collection passed in, for immutability.', () => {
        expect(resource.collection).not.toBe(mockCollection);
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

    describe('respondToGET', () => {
        it('should return a 200 OK with the entire collection if an id is not provided.', () => {
            let response = resource.respondToGET(null, null, null, null, {});
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(mockCollection);

            // Ensure immutability
            expect(response[1]).not.toBe(resource.collection);
        });

        it('should return a 200 OK with the element of the specified id.', () => {
            let mockElement = { id: 1 };
            resource.collection.push(mockElement);

            let response = resource.respondToGET(null, null, null, null, { id: 1 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(mockElement);

            // Ensure immutability
            expect(response[1]).not.toBe(mockElement);
        });

        it('should return a 404 NOT FOUND with status message if the element of the specified id is not found.', () => {
            let response = resource.respondToGET(null, null, null, null, { id: 1 });
            expect(response[0]).toBe(404);
            expect(response[1]).toEqual(jasmine.any(String));
        });
    });

    describe('respondToPOST', () => {
        it('should return a 201 CREATED with the new element, assigning it a unique ID.', () => {
            let response = resource.respondToPOST(null, null, JSON.stringify({ description: 'A new element.' }), null, {});
            expect(response[0]).toBe(201);
            expect(response[1]).toEqual({ id: 1, description: 'A new element.' });

            // Ensure immutability
            expect(resource.collection.find((element) => element === response[1])).toBeFalsy();
        });

        it('should update the collection with the new element.', () => {
            resource.respondToPOST(null, null, JSON.stringify({ description: 'A new element.' }), null, {});
            expect(resource.collection).toContain({ id: 1, description: 'A new element.' });
        });
    });

    describe('respondToPUT', () => {
        it('should return a 200 OK with the updated element of the specified id', () => {
            resource.collection.push({ id: 1 });
            let response = resource.respondToPUT(null, null, JSON.stringify({ description: 'An updated element.' }), null, { id: 1 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual({ id: 1, description: 'An updated element.' });

            // Ensure immutability
            expect(resource.collection.find((element) => element === response[1])).toBeFalsy();
        });

        it('should update the collection element with the new data, ignoring any "id" property in the data.', () => {
            resource.collection.push({ id: 1 });
            resource.respondToPUT(null, null, JSON.stringify({ id: 2, description: 'An updated element.' }), null, { id: 1 });
            expect(resource.collection).toContain({ id: 1, description: 'An updated element.' });
        });

        it('should return a 404 NOT FOUND with status message if the element of the specified id is not found.', () => {
            let response = resource.respondToPUT(null, null, JSON.stringify({ description: 'An updated element' }), null, { id: 1 });
            expect(response[0]).toBe(404);
            expect(response[1]).toEqual(jasmine.any(String));
        });
    });

    describe('respondToDELETE', () => {
        it('should return a 200 OK with the deleted element of the specified id.', () => {
            resource.collection.push({ id: 1 });
            let response = resource.respondToDELETE(null, null, null, null, { id: 1 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual({ id: 1 });
        });

        it('should remove the element from the collection', () => {
            resource.collection.push({ id: 1 });
            resource.respondToDELETE(null, null, null, null, { id: 1 });
            expect(resource.collection).not.toContain({ id: 1 });
        });

        it('should return a 200 OK with status message if the element of the specified id is not found.', () => {
            let response = resource.respondToDELETE(null, null, null, null, { id: 1 });
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(jasmine.any(String));
        });
    });
});

describe('MockResourceFactory', () => {
    let MockResourceFactory;

    beforeEach(angular.mock.inject(($injector) => {
        MockResourceFactory = $injector.get('MockResourceFactory');
    }));

    describe('create', () => {
        let $httpBackend, mockRespondDefinitionFn;

        beforeEach(angular.mock.inject(($injector) => {
            $httpBackend = $injector.get('$httpBackend');
            mockRespondDefinitionFn = jasmine.createSpy().and.callFake(angular.noop);
            spyOn($httpBackend, 'whenRoute').and.returnValue({ respond: mockRespondDefinitionFn });
        }));

        it('should create correct GET/POST/PUT/DELETE routes for the passed collection name and define responses.', () => {
            MockResourceFactory.create('users');
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('GET', `${apiBase}/users/:id?`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('POST', `${apiBase}/users`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('POST', `${apiBase}/users/`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('PUT', `${apiBase}/users/:id`);
            expect($httpBackend.whenRoute).toHaveBeenCalledWith('DELETE', `${apiBase}/users/:id`);
            expect(mockRespondDefinitionFn.calls.count()).toBe(5);
        });
    });
});