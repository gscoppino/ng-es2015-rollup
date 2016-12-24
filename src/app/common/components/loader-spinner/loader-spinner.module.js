import angular from 'angular';

import LoaderSpinnerComponentTemplate from './loader-spinner.component.html';
import LoaderSpinnerComponent from './loader-spinner.component.js';

/**
 * @namespace app/components/loader-spinner
 */
export default angular.module('app.components.loader-spinner', [])
    .component('loaderSpinner', Object.assign({ template: LoaderSpinnerComponentTemplate }, LoaderSpinnerComponent))
    .name;
