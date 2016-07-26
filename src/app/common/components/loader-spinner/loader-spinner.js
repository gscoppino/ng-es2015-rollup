import angular from 'angular';
import template from './loader-spinner.html';

const LoaderSpinnerComponentTag = 'loaderSpinner',
    LoaderSpinnerComponent = {
        template
    };

export default angular.module('app.components.loader-spinner', [])
    .component(LoaderSpinnerComponentTag, LoaderSpinnerComponent)
    .name;
