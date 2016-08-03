import angular from 'angular';
import LoaderSpinnerTemplate from './loader-spinner.html';

const LoaderSpinnerInjectable = 'loaderSpinner',
    LoaderSpinnerComponent = {
        template: LoaderSpinnerTemplate
    };

export { LoaderSpinnerInjectable };
export default angular.module('app.components.loader-spinner', [])
    .component(LoaderSpinnerInjectable, LoaderSpinnerComponent)
    .name;
