import angular from 'angular';

import { providerProxy } from 'app/common/utils/utils.js';

import LoaderSpinnerTemplate from './loader-spinner.html';

const MODULE_NAME = 'app.components.loader-spinner';

const PROVIDERS = providerProxy(MODULE_NAME, {
    LoaderSpinnerComponent: 'loaderSpinner'
});

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
angular.module(MODULE_NAME, [])
    .component(PROVIDERS.LoaderSpinnerComponent, LoaderSpinnerComponent);

export default MODULE_NAME;
export { PROVIDERS };
