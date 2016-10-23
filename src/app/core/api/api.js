import angular from 'angular';
import ApiFactory from './factory/factory';
import MockBackend from './mock/mock'; // Remove this import and the its use in this file to disable the mock backend.

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
