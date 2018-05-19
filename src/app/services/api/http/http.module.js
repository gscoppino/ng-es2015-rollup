import angular from 'angular';

import service from './http.service.js';

export { service };

/**
 * @module HttpModule
 * @description Provides a service built on top of core AngularJS $http,
     that has improved handling of closely timed HTTP requests.
 */
export default angular.module('app.services.api.http', [])
    .service('Http', service)
    .name;
