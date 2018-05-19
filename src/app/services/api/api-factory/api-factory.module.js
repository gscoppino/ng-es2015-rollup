import angular from 'angular';

import HttpModule from 'app/services/api/http/http.module.js';

import provider, { RESTApi } from './api-factory.service.js';

export { provider, RESTApi };

/**
 * @module ApiFactoryModule
 * @requires HttpModule
 * @description Provides a configurable factory that can be
 *   used to create objects to interface with REST API resources.
 */
export default angular.module('app.services.api.api-factory', [
    HttpModule
])
    .provider('ApiFactory', provider)
    .name;
