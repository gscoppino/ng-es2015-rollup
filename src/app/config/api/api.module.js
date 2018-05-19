import angular from 'angular';
import ApiFactoryModule from 'app/services/api/api-factory/api-factory.module.js';

const API_BASE = '/api';

ApiConfig.$inject = ['ApiFactoryProvider'];
/**
 * @memberof module:ApiConfigModule
 * @description Configures [ApiFactoryProvider]{@link ApiFactoryProvider} with the API base URL.
 */
function ApiConfig(ApiFactoryProvider) {
    ApiFactoryProvider.setBaseUrl(API_BASE);
}

export { API_BASE, ApiConfig };

/**
 * @module ApiConfigModule
 * @requires ApiFactoryModule
 * @description Configures the application to work with its API.
 */
export default angular.module('app.config.api', [
    ApiFactoryModule
])
    .config(ApiConfig)
    .name;
