import angular from 'angular';

import template from './component.html';
import controller from './component.js';

export default angular
    .module('app.components.sample', [])
        .component('sampleComponent', {
            template,
            controller
        })
    .name;