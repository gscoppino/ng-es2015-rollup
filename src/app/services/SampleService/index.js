import angular from 'angular';

import service from './service.js';

export default angular
    .module('app.services.sample', [])
        .service('SampleService', service)
    .name;