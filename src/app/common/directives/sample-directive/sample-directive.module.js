import angular from 'angular';

import SampleServiceModule from 'app/common/services/SampleService/SampleService.module.js';

import SampleDirective from './sample-directive.directive.js';

export default angular.module('app.directives.sample-directive', [
    SampleServiceModule
])
    .directive('sampleDirective', SampleDirective)
    .name;
