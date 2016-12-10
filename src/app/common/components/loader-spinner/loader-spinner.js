import angular from 'angular';

import LoaderSpinnerTemplate from './loader-spinner.html';

/**
 * @memberof app/components/loader-spinner
 * @desc A component that renders an SVG loading spinner.
 */
const LoaderSpinnerComponent = {
    template: LoaderSpinnerTemplate
};

/**
 * @namespace app/components/loader-spinner
 */
export default angular.module('app.components.loader-spinner', [])
    .component('loaderSpinner', LoaderSpinnerComponent)
    .name;
