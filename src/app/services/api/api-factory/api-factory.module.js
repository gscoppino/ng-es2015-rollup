import angular from 'angular';
import { HttpModule } from 'app/services/api/http/http.module.js';
import { ApiFactoryProvider, RESTApi } from './api-factory.service.js';

/**
 * @type {angular.Module}
 * @desc Provides a configurable factory that can be
 *   used to create objects to interface with REST API resources.
 */
export const ApiFactoryModule = angular
    .module('app.services.api.api-factory', [
        HttpModule
    ])
    .provider('ApiFactory', ApiFactoryProvider)
    .name;

export { ApiFactoryProvider, RESTApi };
