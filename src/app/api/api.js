import angular from 'angular';
import Restangular from 'restangular-umd';

ApiConfig.$inject = ['RestangularProvider'];
function ApiConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
}

export default angular.module('app.api', [Restangular])
    .config(ApiConfig)
    .name;
