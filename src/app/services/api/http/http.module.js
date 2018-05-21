import angular from 'angular';

import { HttpService } from './http.service.js';

/**
 * @type {angular.Module}
 * @desc Provides a service built on top of core AngularJS $http,
     that has improved handling of closely timed HTTP requests.
 */
export const HttpModule = angular
    .module('app.services.api.http', [])
    .service('Http', HttpService)
    .name;

export { HttpService };
