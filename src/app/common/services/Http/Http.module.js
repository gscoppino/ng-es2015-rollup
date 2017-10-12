import angular from 'angular';

import HttpService from './Http.service.js';

export { HttpService };

/**
 * @module HttpModule
 */
export default angular.module('app.services.Http', [])
    .service('Http', HttpService)
    .name;
