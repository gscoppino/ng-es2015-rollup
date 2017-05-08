import angular from 'angular';

import SampleServiceModule from 'app/common/services/SampleService/SampleService.module.js';

import SampleDirectiveFactory from './sample-directive.directive.js';

export default angular.module('app.directives.sample-directive', [
    SampleServiceModule
])
    .directive('sampleDirective', SampleDirectiveFactory)
    .name;
