import angular from 'angular';

import { Http } from 'app/common/services/Http/Http.js';

/**
 * Class for interfacing with a REST resource and its sub-resources.
 */
class RESTApi extends Http {

    /** Annotation for ng $injector */
    static get $inject() { return ['$q', '$http', 'name', 'baseUrl']; }

    /**
     * Initialization
     * @param {Object} $q - ng, needed for superclass
     * @param {Object} $http - ng, need for superclass
     * @param {string} name - the name of the resource, which is assumed to be a collection
     * @param {string} baseUrl - the URL path that the URL is a subresource of e.g. /api/
     */
    constructor($q, $http, name='', baseUrl='') {
        super($q, $http);
        this.name = name;
        this.baseUrl = baseUrl;
    }

    /**
     * Get the list at the resource URL
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    getList() {
        let url = `${this.baseUrl}/${this.name}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Get the element of the resource represented by id.
     * Technically this can be used to perform a GET on any entity
     * that is mounted underneath the resource, but it is recommended to use
     * nestedGet for that instead.
     * @param {number} id - the id of the element to get. Technically it will accept a string, though.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    get(id=null) {
        let url = `${this.baseUrl}/${this.name}/${id}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Send a POST request to the resource, using element as the JSON payload.
     * @param {Object} element - the POJO to stringify and send to the server
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    post(element={}) {
        let url = `${this.baseUrl}/${this.name}`;
        return super.post(url, element)
            .then(response => response.data);
    }

    /**
     * Send a PUT request to the element of the resource represented by element.id,
     * using the element as the JSON payload.
     * @param {Object} element - the POJO to stringify and send to the server, must have an "id" property.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    put(element={ id: null }) {
        let url = `${this.baseUrl}/${this.name}/${element.id}`;
        return super.put(url, element)
            .then(response => response.data);
    }

    /**
     * Send a PATCH request to the element of the resource represented by element.id,
     * using the element as the JSON payload.
     * @param {Object} element - the POJO to stringify and send to the server, must have an "id" property.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    patch(element={ id: null }) {
        let url = `${this.baseUrl}/${this.name}/${element.id}`;
        return super.patch(url, element)
            .then(response => response.data);
    }

    /**
     * Deletes the element of the resource represented by id.
     * Technically this can be used to perform a DELETE on any entity
     * that is mounted underneath the resource, but it is recommended to use
     * nestedDelete for that instead.
     * @param {number} id - the id of the element to get. Technically it will accept a string, though.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    delete(id=null) {
        let url = `${this.baseUrl}/${this.name}/${id}`;
        return super.delete(url)
            .then(response => response.data);
    }

    /**
     * Send a GET request to a resource that is nested underneath the resource.
     * @param {arguments} path - the segments of the path to the nested resource
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    nestedGet(...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Send a POST request to a resource that is nested underneath the resource.
     * @param {Object} nestedElement - the POJO to stringify and send to the server.
     * @param {arguments} path - the segments of the path to the nested resource.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    nestedPost(nestedElement={}, ...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.post(url, nestedElement)
            .then(response => response.data);
    }

    /**
     * Send a PUT request to a resource that is nested underneath the resource.
     * @param {Object} nestedElement - the POJO to stringify and send to the server, must have an "id" property.
     * @param {arguments} path - the segments of the path to the nested resource.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    nestedPut(nestedElement={ id: null }, ...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.put(url, nestedElement)
            .then(response => response.data);
    }

    /**
     * Send a PATCH request to a resource that is nested underneath the resource.
     * @param {Object} nestedElement - the POJO to stringify and send to the server, must have an "id" property.
     * @param {arguments} path - the segments of the path to the nested resource.
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    nestedPatch(nestedElement={ id: null }, ...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.patch(url, nestedElement)
            .then(response => response.data);
    }

    /**
     * Send a DELETE request to a resource that is nested underneath the resource.
     * @param {arguments} path - the segments of the path to the nested resource
     * @returns {Promise} - a promise that will resolve with the parsed JSON response.
     */
    nestedDelete(...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.delete(url)
            .then(response => response.data);
    }
}

ApiFactory.$inject = ['$injector'];
/**
 * Factory for creating instances of RESTApi that are nested under the application base API url.
 * @param {Object} $injector - ng
 * @returns {Object} - an object with a create function, that can be used to create a new RESTApi instance.
 */
function ApiFactory($injector) {
    return {
        create: (name) => {
            return $injector.instantiate(RESTApi, {
                name,
                baseUrl: this.baseUrl
            });
        }
    };
}

/**
 * Provider for configuring the application API.
 */
class ApiFactoryProvider {

    /** Initialization */
    constructor() {
        this.baseUrl = '';
        this.$get = ApiFactory;
    }

    /**
     * Define the base URL for the applications API.
     * @param {string} url - the url to use as the base URL.
     */
    setBaseUrl(url='') {
        this.baseUrl = url;
    }
}

export { ApiFactoryProvider, RESTApi };

export default angular.module('app.services.ApiFactory', [])
    .provider('ApiFactory', ApiFactoryProvider)
    .name;