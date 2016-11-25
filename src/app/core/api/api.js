import angular from 'angular';
import ApiFactory from 'app/common/services/ApiFactory/ApiFactory.js';
import MockBackend from './mock/mock.js'; // Remove this import and the its use in this file to disable the mock backend.

const apiBase = '/api';

ApiConfig.$inject = ['ApiFactoryProvider'];
function ApiConfig(ApiFactoryProvider) {
    ApiFactoryProvider.setBaseUrl(apiBase);
}

export { apiBase, ApiConfig };

/**
 * @namespace app/api
 * @desc Configures the application to work with its API.
 */
export default angular.module('app.api', [
    ApiFactory,
    MockBackend
])
    .config(ApiConfig)
    .name;
