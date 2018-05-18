import angular from 'angular';

import SampleServiceModule from 'app/common/services/sample-service/sample-service.module.js';

import directive from './sample-directive.directive.js';

export default angular.module('app.directives.sample-directive', [
    SampleServiceModule
])
    .directive('sampleDirective', directive)
    .name;
