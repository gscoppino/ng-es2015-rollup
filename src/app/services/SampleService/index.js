import angular from 'angular';

import service from './SampleService.js';

const SampleService = angular.module('app.services.sample', [])
    .service('SampleService', service);

export default SampleService.name;
