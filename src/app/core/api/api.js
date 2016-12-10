import angular from 'angular';

import MockBackend from 'app/core/api/mock/mock.js'; // Remove to disable the mock backend.
import ApiFactory from 'app/common/services/ApiFactory/ApiFactory.js';

const API_BASE = '/api';

ApiConfig.$inject = ['ApiFactoryProvider'];
function ApiConfig(ApiFactoryProvider) {
    ApiFactoryProvider.setBaseUrl(API_BASE);
}

export { API_BASE, ApiConfig };

/**
 * @namespace app/api
 * @desc Configures the application to work with its API.
 */
export default angular.module('app.api', [
    MockBackend, // Remove if disabling the mock backend
    ApiFactory
])
    .config(ApiConfig)
    .name;
