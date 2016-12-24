import angular from 'angular';

import SampleService from './SampleService.service.js';

export default angular.module('app.services.SampleService', [])
    .service('SampleService', SampleService)
    .name;
