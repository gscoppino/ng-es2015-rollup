import { API_BASE } from 'app/core/api/api.module.js';

/**
 * An instance of the class represents a mocked RESTful resource.
 * @memberof app/services/ApiMockBackendFactory
 */
class MockResource {
    constructor(name, collection=[]) {
        this.name = name;
        this.collection = MockResource._immutable(collection);
        this.highestId = MockResource._getHighestId(collection);
    }

    static _getHighestId(collection) {
        return collection
            .map((resource) => resource.id)
            .reduce((prevId, nextId) => nextId > prevId ? nextId : prevId, 0);
    }

    static _immutable(value) {
        return JSON.parse(JSON.stringify(value));
    }

    /**
     * Sends fake response data for a GET request on this resource. The response data returned will be formatted correctly
     * by $http. Method signature matches that provided to $httpBackend.when(...).response(<function>);
     * This method does not modify the fake data store.
     */
    // eslint-disable-next-line no-unused-vars
    respondToGET(method, url, data, headers, params) {
        if (!params) {
            return [200, MockResource._immutable(this.collection)];
        }

        if (!params.id) {
            return [200, MockResource._immutable(this.collection
                .filter(element =>
                    Object.keys(params)
                        .reduce((accumulator, currentParam) =>
                            accumulator === true && element[currentParam] === params[currentParam], true)))];
        }

        let element = this.collection.find((element) => element.id === Number(params.id));
        if (element) {
            return [200, MockResource._immutable(element)];
        }

        return [404, `${name} with id ${params.id} not found.`];
    }

    /**
     * Sends fake response data for a POST request on this resource. The response data returned will be formatted correctly
     * by $http. Method signature matches that provided to $httpBackend.when(...).response(<function>);
     * This method also updates the fake data store.
     */
    // eslint-disable-next-line no-unused-vars
    respondToPOST(method, url, data, headers, params) {
        let newElement = JSON.parse(data);
        newElement.id = ++this.highestId;

        this.collection.push(newElement);
        return [201, MockResource._immutable(newElement)];
    }

    /**
     * Sends fake response data for a PUT request on this resource. The response data returned will be formatted correctly
     * by $http. Method signature matches that provided to $httpBackend.when(...).response(<function>);
     * This method also updates the fake data store.
     */
    // eslint-disable-next-line no-unused-vars
    respondToPUT(method, url, data, headers, params) {
        let updatedElement = JSON.parse(data);
        if (updatedElement.id) { delete updatedElement.id; }

        let element = this.collection.find((element) => element.id === Number(params.id));
        if (element) {
            Object.assign(element, updatedElement);
            return [200, MockResource._immutable(element)];
        }

        return [404, `${name} with id ${params.id} not found.`];
    }

    /**
     * Sends fake response data for a DELETE request on this resource. The response data returned will be formatted correctly
     * by $http. Method signature matches that provided to $httpBackend.when(...).response(<function>);
     * This method also updates the fake data store.
     */
    // eslint-disable-next-line no-unused-vars
    respondToDELETE(method, url, data, headers, params) {
        let elementIdx = this.collection.findIndex((element) => element.id === Number(params.id));
        if (elementIdx !== -1) {
            let deletedElement = this.collection.splice(elementIdx, 1);
            return [200, deletedElement[0]];
        }

        return [200, `${name} with id ${params.id} not found.`];
    }
}

MockResourceFactory.$inject = ['$httpBackend'];
/**
 * Factory to create mock RESTful resources.
 * @memberof app/services/ApiMockBackendFactory
 * @returns {MockResourceFactory}
 */
function MockResourceFactory($httpBackend) {
    /**
     * A factory for new MockResource's.
     * @interface MockResourceFactory
     */
    let factory = {    
        /**
         * Create a mock RESTful resource.
         * @name MockResourceFactory#create
         * @function
         * @param name {string} - the name of the resource.
         * @param [collection=[]] {Object[]} - the collection representing the resource.
         * @param collection[].id {number} - the id of the element.
         */
        create: function(name, collection=[]) {
            let resource = new MockResource(name, collection);

            $httpBackend.whenRoute('GET', `${API_BASE}/${name}/:id?`).respond(resource.respondToGET.bind(resource));
            $httpBackend.whenRoute('POST', `${API_BASE}/${name}/`).respond(resource.respondToPOST.bind(resource));
            $httpBackend.whenRoute('POST', `${API_BASE}/${name}`).respond(resource.respondToPOST.bind(resource));
            $httpBackend.whenRoute('PUT', `${API_BASE}/${name}/:id`).respond(resource.respondToPUT.bind(resource));
            $httpBackend.whenRoute('DELETE', `${API_BASE}/${name}/:id`).respond(resource.respondToDELETE.bind(resource));
        }
    };


    return factory;
}

export default MockResourceFactory;
export { MockResource };
