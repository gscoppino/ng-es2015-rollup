import angular from 'angular';

import HttpService from './Http.service.js';

export { HttpService };

/**
 * @module HttpModule
 * @description Provides a service built on top of core AngularJS $http,
     that has improved handling of closely timed HTTP requests.
 */
export default angular.module('app.services.Http', [])
    .service('Http', HttpService)
    .name;
