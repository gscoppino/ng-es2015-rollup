/** @module app/api/api */
import angular from 'angular';
import Restangular from 'restangular-umd';

ApiConfig.$inject = ['RestangularProvider'];
function ApiConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
}

/**
 * @member AppApiModule
 * @memberof module:app/api/api#
 * @desc Configures the application to work with its API.
 */
export default angular.module('app.api', [Restangular])
    .config(ApiConfig)
    .name;
