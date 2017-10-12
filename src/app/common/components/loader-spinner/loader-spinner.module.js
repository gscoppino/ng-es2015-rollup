import angular from 'angular';

import LoaderSpinnerComponentTemplate from './loader-spinner.component.html';
import LoaderSpinnerComponent from './loader-spinner.component.js';

/**
 * @module LoaderSpinnerModule
 */
export default angular.module('app.components.loader-spinner', [])
    .component('loaderSpinner', Object.assign({ template: LoaderSpinnerComponentTemplate }, LoaderSpinnerComponent))
    .name;
