import angular from 'angular';
import { ApiFactoryModule } from 'app/services/api/api-factory/api-factory.module.js';

const API_BASE = '/api';

ApiConfig.$inject = ['ApiFactoryProvider'];
/**
 * @type {angular.Config}
 * @desc Configures [ApiFactoryProvider]{@link ApiFactoryProvider} with the API base URL.
 */
function ApiConfig(ApiFactoryProvider) {
    ApiFactoryProvider.setBaseUrl(API_BASE);
}

/**
 * @type {angular.Module}
 * @desc Configures the application to work with its API.
 */
export const ApiConfigModule = angular
    .module('app.config.api', [
        ApiFactoryModule
    ])
    .config(ApiConfig)
    .name;

export { API_BASE, ApiConfig };
