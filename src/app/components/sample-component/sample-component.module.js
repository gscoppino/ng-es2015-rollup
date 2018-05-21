import angular from 'angular';

import { SampleComponent } from './sample-component.component.js';

export const SampleComponentModule = angular
    .module('app.components.sample-component', [])
    .component('sampleComponent', SampleComponent)
    .name;
