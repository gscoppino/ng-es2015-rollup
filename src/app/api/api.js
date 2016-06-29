import angular from 'angular';
import ngResource from 'angular-resource';

ApiConfig.$inject = ['$resourceProvider'];
function ApiConfig($resourceProvider) {
    $resourceProvider.stripTrailingSlashes = true;
    $resourceProvider.cancellable = true;
}

const ApiBase = '/api';
class ApiUrl {
    constructor() {
        return function(...URIFragments) {
            return [ApiBase, ...URIFragments].join('/');
        };
    }
}

export default angular.module('api', [ngResource])
    .config(ApiConfig)
    .service('ApiUrl', ApiUrl)
    .name;
