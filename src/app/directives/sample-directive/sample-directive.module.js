import angular from 'angular';
import { SampleServiceModule } from 'app/services/sample-service/sample-service.module.js';

import { SampleDirective } from './sample-directive.directive.js';

export const SampleDirectiveModule = angular
    .module('app.directives.sample-directive', [
        SampleServiceModule
    ])
    .directive('sampleDirective', SampleDirective)
    .name;
