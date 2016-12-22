import angular from 'angular';

import MockBackendModule from 'app/core/api/mock/mock.js'; // Remove to disable the mock backend.
import ApiFactoryModule, { PROVIDERS as ApiFactoryProviders } from 'app/common/services/ApiFactory/ApiFactory.js';

const MODULE_NAME = 'app.api';

const API_BASE = '/api';

ApiConfig.$inject = [`${ApiFactoryProviders.ApiFactory}Provider`];
function ApiConfig(ApiFactoryProvider) {
    ApiFactoryProvider.setBaseUrl(API_BASE);
}

export { API_BASE, ApiConfig };

/**
 * @namespace app/api
 * @desc Configures the application to work with its API.
 */
angular.module(MODULE_NAME, [
    MockBackendModule, // Remove if disabling the mock backend
    ApiFactoryModule
])
    .config(ApiConfig);

export default MODULE_NAME;
