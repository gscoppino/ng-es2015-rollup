import angular from 'angular';

import template from './SampleComponent.html';
import controller from './SampleComponent.js';

const SampleComponent = angular.module('app.components.sample', [])
    .component('sampleComponent', {
        template,
        controller,
        bindings: controller.bindings
    });

export default SampleComponent.name;
