import angular from 'angular';

import template from './sample-component.component.html';
import component from './sample-component.component.js';

export default angular.module('app.components.sample-component', [])
    .component('sampleComponent', Object.assign({ template }, component))
    .name;
