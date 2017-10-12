import angular from 'angular';

import HttpModule from 'app/common/services/Http/Http.module.js';

import ApiFactoryProvider, { RESTApi } from './ApiFactory.service.js';

export { ApiFactoryProvider, RESTApi };

/**
 * @module ApiFactoryModule
 * @requires HttpModule
 */
export default angular.module('app.services.ApiFactory', [
    HttpModule
])
    .provider('ApiFactory', ApiFactoryProvider)
    .name;
