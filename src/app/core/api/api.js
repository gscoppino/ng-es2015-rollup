import angular from 'angular';
import Restangular from 'restangular-umd';
import MockBackend from './mock/mock'; // Remove this import and the its use in this file to disable the mock backend.

const apiBase = '/api';

ApiConfig.$inject = ['RestangularProvider'];
function ApiConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl(apiBase);
}

export { apiBase, ApiConfig };

/**
 * @namespace app/api
 * @desc Configures the application to work with its API.
 */
export default angular.module('app.api', [
    Restangular,
    MockBackend
])
    .config(ApiConfig)
    .name;
