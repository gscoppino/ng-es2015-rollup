/**
 * @module App/Components/Sample
 * @requires module:SampleComponent
 */

import angular from 'angular';

import template from './component.html';
import controller from './component.js';

/**
 * Shim for AngularJS module system.
 * @see {@link module:SampleComponent|SampleComponent} for documentation on SampleComponent.
 */
const SampleComponent = angular.module('app.components.sample', [])
    .component('sampleComponent', {
        template,
        controller,
        bindings: controller.bindings
    });

export default SampleComponent.name;
