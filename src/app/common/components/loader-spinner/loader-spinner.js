/** @module app/common/components/loader-spinner/loader-spinner */
import angular from 'angular';
import LoaderSpinnerTemplate from './loader-spinner.html';

/**
 * @memberof module:app/common/components/loader-spinner/loader-spinner#
 * @desc A component that renders an SVG loading spinner.
 */
const LoaderSpinnerComponent = {
    template: LoaderSpinnerTemplate
};

export default angular.module('app.components.loader-spinner', [])
    .component('loaderSpinner', LoaderSpinnerComponent)
    .name;
