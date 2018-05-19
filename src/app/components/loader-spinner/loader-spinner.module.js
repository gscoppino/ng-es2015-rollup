import angular from 'angular';

import template from './loader-spinner.component.html';
import component from './loader-spinner.component.js';

/**
 * @module LoaderSpinnerModule
 * @description Provides a component that displays an SVG spinner.
 */
export default angular.module('app.components.loader-spinner', [])
    .component('loaderSpinner', Object.assign({ template }, component))
    .name;
