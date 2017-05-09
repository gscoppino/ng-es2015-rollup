import { Http } from 'app/common/services/Http/Http.module.js';

/**
 * Class that models RESTful resources by providing methods to interact with a resource.
 * @memberof app/services/ApiFactory
 * @extends Http
 */
class RESTApi extends Http {
    static get $inject() { return ['$q', '$http', 'name', 'baseUrl']; }
    /**
     * Create a model of a RESTful resource.
     * @param {String} name - The endpoint name for the RESTful resource (case sensitive).
     * @param {String} baseUrl - the URL that the resource is mounted on.
     */
    constructor($q, $http, name='', baseUrl='') {
        super($q, $http);
        this.name = name;
        this.baseUrl = baseUrl;
    }

    /**
     * Performs a GET at the root of the resource
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a GET at /api/user and returns the deserialized JSON response
     * RESTApiInstance.getList();
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    getList() {
        let url = `${this.baseUrl}/${this.name}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Perform a GET at the root of the resource with query parameters provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a GET at /api/user?field1=true and returns the deserialized JSON response
     * RESTApiInstance.getSublist({ field1: true });
     * @param {Object} query - A map of query field names to field values.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    getSublist(query={}) {
        let queryString = RESTApi._generateQueryString(query);
        let url = `${this.baseUrl}/${this.name}?${queryString}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Performs a GET for a single element of the resource.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a GET at /api/user/1 and returns the deserialized JSON response
     * RESTApiInstance.get(1);
     * @param {Number} id - The unique identifier for the element of the resource.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    get(id=null) {
        let url = `${this.baseUrl}/${this.name}/${id}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Performs a POST at the root of the resource with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a POST at /api/user with {"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.post({ prop1: true });
     * @param {Object} element - The data representing the element to be created.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    post(element={}) {
        let url = `${this.baseUrl}/${this.name}`;
        return super.post(url, element)
            .then(response => response.data);
    }

    /**
     * Performs a PUT on a single element of the resource with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a PUT at /api/user/1 with {"id":1,"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.put({ id: 1, prop1: true });
     * @param {Object} element - The data representing the element to be updated.
     * @param {Number} element.id - The unique identifier for the element.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    put(element={ id: null }) {
        let url = `${this.baseUrl}/${this.name}/${element.id}`;
        return super.put(url, element)
            .then(response => response.data);
    }

    /**
     * Performs a PATCH on a single element of the resource with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a PATCH at /api/user/1 with {"id":1,"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.patch({ id: 1, prop1: true });
     * @param {Object} element - The data representing the element to be patched.
     * @param {Number} element.id - The unique identifier for the element.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    patch(element={ id: null }) {
        let url = `${this.baseUrl}/${this.name}/${element.id}`;
        return super.patch(url, element)
            .then(response => response.data);
    }

    /**
     * Performs a DELETE on a single element of the resource.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a DELETE at /api/user/1 and returns the deserialized JSON response.
     * RESTApiInstance.delete({ id: 1, prop1: true });
     * @param {Number} id - The unique identifier for the element of the resource.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    delete(id=null) {
        let url = `${this.baseUrl}/${this.name}/${id}`;
        return super.delete(url)
            .then(response => response.data);
    }

    /**
     * Performs a GET on a resource that is nested under the current resource
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a GET at /api/user/1/contacts and returns the deserialized JSON response.
     * RESTApiInstance.getNestedList(1, 'contacts');
     * @param {Number} id - The unique identifier for the element of the current resource.
     * @param {String} name - The name of the nested resource.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    getNestedList(id=null, name='') {
        let url = `${this.baseUrl}/${this.name}/${id}/${name}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Performs a GET on a resource that is nested under the current resource, with query parameters provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a GET at /api/user/1/contacts?field1=true and returns the deserialized JSON response.
     * RESTApiInstance.getNestedSublist(1, 'contacts', { field1: true });
     * @param {Number} id - The unique identifier for the element of the current resource.
     * @param {String} name - The name of the nested resource.
     * @param {Object} query - A map of query field names to field values.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    getNestedSublist(id=null, name='', query={}) {
        let queryString = RESTApi._generateQueryString(query);
        let url = `${this.baseUrl}/${this.name}/${id}/${name}?${queryString}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Performs a POST on a resource that is nested under the current resource with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a POST at /api/user/1/contacts with {"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.nestedPost(1, 'contacts', { prop1: true });
     * @param {Number} id - The unique identifier for the element of the current resource.
     * @param {String} name - The name of the nested resource.
     * @param {Object} element - The data representing the element to be created on the nested resource.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    nestedPost(id=null, name='', element={}) {
        let url = `${this.baseUrl}/${this.name}/${id}/${name}`;
        return super.post(url, element)
            .then(response => response.data);
    }

    /**
     * Performs a GET at the specified path under the current resource.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a GET at /api/user/1/contacts/1 and returns the deserialized JSON response.
     * RESTApiInstance.customGet(1, 'contacts', 1);
     * @param {...(String|Number)} pathSegment - A string or number representing one part of the path.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    customGet(...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.get(url)
            .then(response => response.data);
    }

    /**
     * Performs a POST on the specified path under the current resource, with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a POST at /api/user/1/contacts/1 with {"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.customPost(1, 'contacts', 1, { prop1: true });
     * @param {...(String|Number)} pathSegment - A string or number representing one part of the path.
     * @param {Object} nestedElement - The data representing the element to be created on the specified path.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    customPost(...args) {
        let path = args.slice(0, -1),
            nestedElement = args[args.length - 1];

        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.post(url, nestedElement)
            .then(response => response.data);
    }

    /**
     * Performs a PUT on the specified path under the current resource, with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a PUT at /api/user/1/contacts/1 with {"id":1,"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.customPut(1, 'contacts', 1, { id: 1, prop1: true });
     * @param {...(String|Number)} pathSegment - A string or number representing one part of the path.
     * @param {Object} nestedElement - The data representing the element to be updated on the specified path.
     * @param {Number} nestedElement.id - The unique identifier for the nested element.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    customPut(...args) {
        let path = args.slice(0, -1),
            nestedElement = args[args.length - 1];

        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.put(url, nestedElement)
            .then(response => response.data);
    }

    /**
     * Performs a PATCH on the specified path under the current resource, with the data provided.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a PATCH at /api/user/1/contacts/1 with {"id":1,"prop1":true} and returns the deserialized JSON response.
     * RESTApiInstance.customPatch(1, 'contacts', 1, { id: 1, prop1: true });
     * @param {...(String|Number)} pathSegment - A string or number representing one part of the path.
     * @param {Object} nestedElement - The data representing the element to be patched on the specified path.
     * @param {Number} nestedElement.id - The unique identifier for the nested element.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    customPatch(...args) {
        let path = args.slice(0, -1),
            nestedElement = args[args.length - 1];

        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.patch(url, nestedElement)
            .then(response => response.data);
    }

    /**
     * Performs a DELETE on the specified path under the current resource.
     * @example
     * // Assuming an instance name of "user" and a baseUrl of "/api"
     * // performs a DELETE at /api/user/1/contacts/1 and returns the deserialized JSON response.
     * RESTApiInstance.customDelete(1, 'contacts', 1);
     * @param {...(String|Number)} pathSegment - A string or number representing one part of the path.
     * @returns {Promise} A promise that will resolve with the data from the response.
     */
    customDelete(...path) {
        let url = `${this.baseUrl}/${this.name}/${path.join('/')}`;
        return super.delete(url)
            .then(response => response.data);
    }

    static _generateQueryString(query={}) {
        return Object
            .keys(query)
            .reduce((queryString, currentField) =>
                queryString += `${currentField}=${query[currentField]}&`,
            String())
            .slice(0, -1); // Pluck the final '&' delimiter which is not needed
    }
}

class ApiFactoryProvider {
    constructor() {
        this.baseUrl = '';
    }

    get $get() {
        ApiFactory.$inject = ['$injector'];
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

        return ApiFactory;
    }

    setBaseUrl(url='') {
        this.baseUrl = url;
    }
}

export default ApiFactoryProvider;
export { RESTApi };
