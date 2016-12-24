import angular from 'angular';

import Http from './Http.service.js';

export { Http };

/**
 * @namespace app/services/Http
 */
export default angular.module('app.services.Http', [])
    .service('Http', Http)
    .name;