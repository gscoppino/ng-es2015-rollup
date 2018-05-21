import angular from 'angular';

import { ApiFactoryModule } from 'app/services/api/api-factory/api-factory.module.js';

/**
 * A constant representing the base URL path that all other server API URL's
 * are nested under.
 */
const API_BASE = '/api';

ApiConfig.$inject = ['ApiFactoryProvider'];
/**
 * @type {angular.Config}
 * @desc Configures {@link ApiFactoryProvider} with the {@link API_BASE}.
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
