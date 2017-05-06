import angular from 'angular';

import ApiFactoryProvider, { RESTApi } from './ApiFactory.service.js';

export { ApiFactoryProvider, RESTApi };

/**
 * @namespace app/services/ApiFactory
 */
export default angular.module('app.services.ApiFactory', [])
    .provider('ApiFactory', ApiFactoryProvider)
    .name;
