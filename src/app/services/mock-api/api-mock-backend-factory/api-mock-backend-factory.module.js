import angular from 'angular';
import 'angular-mocks';

import { MockResourceFactory, MockResource } from './api-mock-backend-factory.service.js';

/**
 * @type {angular.Module}
 * @desc Provides a configurable factory that can be
 *   used to create objects that mock out requests to
 *   REST API resources.
 */
export const ApiMockBackendFactoryModule = angular
    .module('app.services.mock-api.api-mock-backend-factory', [
        'ngMockE2E'
    ])
    .service('MockResourceFactory', MockResourceFactory)
    .name;

export { MockResource };
