import angular from 'angular';

import SampleComponentTemplate from './sample-component.component.html';
import SampleComponent from './sample-component.component.js';

export default angular.module('app.components.sample-component', [])
    .component('sampleComponent', Object.assign({ template: SampleComponentTemplate }, SampleComponent))
    .name;
