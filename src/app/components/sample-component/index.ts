import angular from 'angular';

import template from './component.html';
import controller from './component.ts';

const SampleComponent = angular.module('app.components.sample', [])
    .component('sampleComponent', {
        template: template,
        controller: controller,
        bindings: controller.bindings
    });

export default SampleComponent.name;
