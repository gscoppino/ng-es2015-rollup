import angular from 'angular';
import LoaderSpinnerTemplate from './loader-spinner.html';

const LoaderSpinnerComponent = {
    template: LoaderSpinnerTemplate
};

export default angular.module('app.components.loader-spinner', [])
    .component('loaderSpinner', LoaderSpinnerComponent)
    .name;
