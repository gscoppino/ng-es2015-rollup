import angular from 'angular';

import HttpModule from 'app/common/services/Http/Http.module.js';

import ApiFactoryProvider, { RESTApi } from './ApiFactory.service.js';

export { ApiFactoryProvider, RESTApi };

/**
 * @module ApiFactoryModule
 * @requires HttpModule
 * @description Provides a configurable factory that can be
 *   used to create objects to interface with REST API resources.
 */
export default angular.module('app.services.ApiFactory', [
    HttpModule
])
    .provider('ApiFactory', ApiFactoryProvider)
    .name;
