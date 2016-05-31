import angular from 'angular';

import service from './service.js';

const SampleService = angular.module('app.services.sample', [])
    .service('SampleService', service);

export default SampleService.name;
