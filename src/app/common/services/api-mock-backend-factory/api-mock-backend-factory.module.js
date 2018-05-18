import angular from 'angular';
import 'angular-mocks';

import service, { MockResource } from './api-mock-backend-factory.service.js';

export { MockResource };

/**
 * @module ApiMockBackendFactoryModule
 * @description Provides a configurable factory that can be
 *   used to create objects that mock out requests to
 *   REST API resources.
 */
export default angular.module('app.services.api-mock-backend-factory', [
    'ngMockE2E'
])
    .service('MockResourceFactory', service)
    .name;
