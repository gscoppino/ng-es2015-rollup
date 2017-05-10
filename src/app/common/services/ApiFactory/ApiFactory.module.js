import angular from 'angular';

import HttpModule from 'app/common/services/Http/Http.module.js';

import ApiFactoryProvider, { RESTApi } from './ApiFactory.service.js';

export { ApiFactoryProvider, RESTApi };

/**
 * @namespace app/services/ApiFactory
 */
export default angular.module('app.services.ApiFactory', [
    HttpModule
])
    .provider('ApiFactory', ApiFactoryProvider)
    .name;
