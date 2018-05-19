import angular from 'angular';

import service from './sample-service.service.js';

export default angular.module('app.services.sample-service', [])
    .service('SampleService', service)
    .name;
