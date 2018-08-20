import angular from 'angular';

import { LoaderSpinnerComponent } from './loader-spinner.component.js';

/**
 * @type {angular.Module}
 * @desc Provides a component that displays an SVG spinner.
 */
export const LoaderSpinnerComponentModule = angular
    .module('app.components.loader-spinner', [])
    .component('loaderSpinner', LoaderSpinnerComponent)
    .name;
