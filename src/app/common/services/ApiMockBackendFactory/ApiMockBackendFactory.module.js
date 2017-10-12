import angular from 'angular';
import 'angular-mocks';

import MockResourceFactoryService, { MockResource } from './ApiMockBackendFactory.service.js';

export { MockResource };

/**
 * @module ApiMockBackendFactoryModule
 * @description Provides a configurable factory that can be
 *   used to create objects that mock out requests to
 *   REST API resources.
 */
export default angular.module('app.services.ApiMockBackendFactory', [
    'ngMockE2E'
])
    .service('MockResourceFactory', MockResourceFactoryService)
    .name;
