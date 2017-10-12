import { API_BASE } from 'app/core/api/api.module.js';

/**
 * An instance of the class represents a mocked RESTful resource.
 * @memberof module:ApiMockBackendFactoryModule
 */
class MockResource {
    constructor(name, options={}) {
        this.name = name;
        this.collection = Array.isArray(options.fixtureData) ? MockResource._immutable(options.fixtureData) : [];
        this.highestId = MockResource._getHighestId(this.collection);
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
}

MockResourceFactory.$inject = ['$log', '$httpBackend'];
/**
 * Factory to create mock RESTful resources.
 * @memberof app/services/ApiMockBackendFactory
 * @returns {MockResourceFactory}
 */
function MockResourceFactory($log, $httpBackend) {
    /**
     * A factory for new MockResource's.
     * @interface MockResourceFactory
     */
    let factory = {
        _logHTTPEvent: function (request, response) {
            $log.log('' +
                '---------\n' +
                'Request: ', request[0], request[1], '\n' +
                '\t- Data: ', request[2], '\n' +
                '\t- Headers: ', request[3], '\n' +
                '\t- Params: ', request[4], '\n' +
                'Response: ', response[0], '\n' +
                '\t- Data: ', response[1], '\n' +
                '---------');
        },

        /**
         * Create a mock RESTful resource.
         * @name MockResourceFactory#create
         * @function
         * @param name {string} - the name of the resource. Should be pluralized.
         * @param [options] {Object}
         * @param options.fixtureData {Object[]} - the initial data fixtures for the resource.
         * @param options.fixtureData[].id {number} - the id of the element.
         * @param options.logHTTPEvents {boolean} - whether to log requests and their responses.
         */
        create: function(name, options={}) {
            const logHTTPEvents = options.logHTTPEvents;
            delete options.logHTTPEvents;

            let resource = new MockResource(name, options);

            $httpBackend.whenRoute('GET', `${API_BASE}/${name}/:id?`)
                .respond((...request) => {
                    let response = resource.respondToGET(...request);
                    if (logHTTPEvents) this._logHTTPEvent(request, response);

                    return response;
                });

            $httpBackend.whenRoute('POST', `${API_BASE}/${name}/`)
                .respond((...request) => {
                    let response = resource.respondToPOST(...request);
                    if (logHTTPEvents) this._logHTTPEvent(request, response);

                    return response;
                });

            $httpBackend.whenRoute('POST', `${API_BASE}/${name}`)
                .respond((...request) => {
                    let response = resource.respondToPOST(...request);
                    if (logHTTPEvents) this._logHTTPEvent(request, response);

                    return response;
                });

            $httpBackend.whenRoute('PUT', `${API_BASE}/${name}/:id`)
                .respond((...request) => {
                    let response = resource.respondToPUT(...request);
                    if (logHTTPEvents) this._logHTTPEvent(request, response);

                    return response;
                });

            $httpBackend.whenRoute('DELETE', `${API_BASE}/${name}/:id`)
                .respond((...request) => {
                    let response = resource.respondToDELETE(...request);
                    if (logHTTPEvents) this._logHTTPEvent(request, response);

                    return response;
                });

            return resource;
        }
    };


    return factory;
}

export default MockResourceFactory;
export { MockResource };
