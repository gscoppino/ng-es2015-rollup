import { API_BASE } from 'app/core/api/api.module.js';

/**
 * An instance of the class represents a mocked RESTful resource.
 * @memberof app/services/ApiMockBackendFactory
 */
class MockResource {
    constructor(name, fixtureData=[], nestedMockResources=[]) {
        this.name = name;
        this.collection = MockResource._immutable(fixtureData);
        this.highestId = MockResource._getHighestId(fixtureData);

        this.nestedResources = nestedMockResources;
        this.nestedFK = name.endsWith('s') ? name.slice(0, -1) : name; // This is exposed as a convenience; its just the singular form of the resource name.
    }

    static _getHighestId(collection) {
        return collection
            .map((resource) => resource.id)
            .reduce((prevId, nextId) => nextId > prevId ? nextId : prevId, 0);
    }

    static _immutable(value) {
        return JSON.parse(JSON.stringify(value));
    }

    static _query(modelValue, queryValue, operator) {
        if (typeof modelValue !== typeof queryValue) {
            return false;
        }

        switch(typeof modelValue) {
            case 'string':
                if (operator === '_in') {
                    return modelValue.toLowerCase().includes(queryValue.toLowerCase());
                } else {
                    return modelValue.toLowerCase() === queryValue.toLowerCase();
                }
            case 'boolean':
                return modelValue === queryValue;
            case 'number':
                if (operator === '_lt') {
                    return modelValue < queryValue;
                } else if (operator === '_gt') {
                    return modelValue > queryValue;
                } else {
                    return modelValue === queryValue;
                }
            default:
                // Object (object, array, or null)
                if (modelValue === null) {
                    return queryValue === null;
                } else {
                    // Not bothering to compare objects/arrays
                    return false;
                }
        }
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
                        .reduce((accumulator, currentParam) => {
                            let queryOperator = null;
                            let propName = currentParam.replace(/_in|_gt|_lt$/, (match) => {
                                queryOperator = match;
                                return '';
                            });

                            return accumulator === true && MockResource
                                ._query(element[propName], params[currentParam], queryOperator);
                        }, true)))];
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

    /**
     * Sends fake response data for a GET request on the nested resource. The response data returned will be formatted correctly
     * by $http. Method signature matches that provided to $httpBackend.when(...).response(<function>);
     * This method does not modify the fake nested data store.
     */
    respondToNestedGET(method, url, data, headers, params) {
        let nestedResource = this.nestedResources.find(resource => resource.name === params.nestedName);
        if (!nestedResource) {
            return [404, `Nested resource ${params.nestedName} for resource ${this.name} not found.`];
        }

        let id = params.id;

        // Reconfigure the params object to a form that can be used by the nested resource
        delete params.nestedName;

        if (params.nestedId) {
            params = { id: params.nestedId };
        } else {
            delete params.id;
            delete params.nestedId;
            params[this.nestedFK] = Number(id);
        }

        let response = nestedResource.respondToGET(method, url, data, headers, params);
        // If we fetched an element of the nested resource by ID then we still need
        // to check that the element found is associated with this resource.
        if (!Array.isArray(response[1]) && response[1][this.nestedFK] !== Number(id)) {
            return [404, 'Not Found'];
        }

        return response;
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
         * @param name {string} - the name of the resource. Must be pluralized.
         * @param [fixtureData=[]] {Object[]} - the initial data fixtures for the resource.
         * @param fixtureData[].id {number} - the id of the element.
         * @param [nestedMockResources=[]] {MockResource[]} - the nested resources of this MockResource.
         */
        create: function(name, fixtureData=[], nestedMockResources=[]) {
            let resource = new MockResource(name, fixtureData, nestedMockResources);

            $httpBackend.whenRoute('GET', `${API_BASE}/${name}/:id/:nestedName/:nestedId?`).respond(resource.respondToNestedGET.bind(resource));
            $httpBackend.whenRoute('GET', `${API_BASE}/${name}/:id?`).respond(resource.respondToGET.bind(resource));
            $httpBackend.whenRoute('POST', `${API_BASE}/${name}/`).respond(resource.respondToPOST.bind(resource));
            $httpBackend.whenRoute('POST', `${API_BASE}/${name}`).respond(resource.respondToPOST.bind(resource));
            $httpBackend.whenRoute('PUT', `${API_BASE}/${name}/:id`).respond(resource.respondToPUT.bind(resource));
            $httpBackend.whenRoute('DELETE', `${API_BASE}/${name}/:id`).respond(resource.respondToDELETE.bind(resource));

            return resource;
        }
    };


    return factory;
}

export default MockResourceFactory;
export { MockResource };
