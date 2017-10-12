import angular from 'angular';

import MockBackendModule from 'app/core/api/mock/mock.module.js'; // Remove to disable the mock backend.
import ApiFactoryModule from 'app/common/services/ApiFactory/ApiFactory.module.js';

const API_BASE = '/api';

ApiConfig.$inject = ['ApiFactoryProvider'];
/**
 * @memberof module:ApiModule
 * @description Configures [ApiFactoryProvider]{@link ApiFactoryProvider} with the API base URL.
 */
function ApiConfig(ApiFactoryProvider) {
    ApiFactoryProvider.setBaseUrl(API_BASE);
}

export { API_BASE, ApiConfig };

/**
 * @module ApiModule
 * @requires MockBackendModule
 * @requires ApiFactoryModule
 * @description Configures the application to work with its API.
 */
export default angular.module('app.api', [
    MockBackendModule, // Remove if disabling the mock backend
    ApiFactoryModule
])
    .config(ApiConfig)
    .name;
