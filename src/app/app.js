import angular from 'angular';

import Config from 'app/core/config/config.js';
import ApiModule from 'app/core/api/api.js';
import Store from 'app/core/store/store.js';
import Routes from 'app/core/routes/routes.js';
import LoaderSpinnerModule from 'app/common/components/loader-spinner/loader-spinner.js';
import { providerProxy } from 'app/common/utils/utils.js';

import AppTemplate from './app.html';

const MODULE_NAME = 'app';

const PROVIDERS = providerProxy(MODULE_NAME, {
    AppComponent: 'app'
});

/**
 * @class
 * @classdesc Component Class for the application top-level component.
 */
class AppController {

    static get $inject() { return ['$rootScope', '$log']; }
    constructor($rootScope, $log) {
        Object.assign(this, { $rootScope });

        /**
         * @member {boolean} isLoading
         * @memberof AppController#
         * @desc A flag indicating whether the application is in a state transition.
         */
        this.isLoading = false;

        this.listeners = [];

        $log.log('Loaded!');
    }

    /**
     * Schedules a UI update to to be called whenever a
     * route change event occurs, passing it the parameters from
     * the event.
     */
    $onInit() {
        let update = this._update.bind(this);

        this.listeners.push(
            this.$rootScope.$on('$locationChangeStart', update),
            this.$rootScope.$on('$locationChangeSuccess', update)
        );
    }

    /**
     * Updates the Application UI in response to state change events.
     * @param event - the state change event
     */
    _update(event) {
        this.isLoading = (event.name === '$locationChangeStart') ? true : false;
    }

    /**
     * Deregisters all event listeners attached during the lifetime of this instance.
     */
    $onDestroy() {
        this.listeners.forEach(deregister => deregister());
    }
}

/**
 * @memberof app
 * @desc The top level application component.
 * @property controller {function} - [AppController]{@link AppController}
 */
const AppComponent = {
    template: AppTemplate,
    controller: AppController,
    bindings: {}
};

/**
 * @namespace app
 */
angular.module(MODULE_NAME, [
    Config,
    ApiModule,
    Store,
    Routes,
    LoaderSpinnerModule
])
    .component(PROVIDERS.AppComponent, AppComponent);

export default MODULE_NAME;
export { PROVIDERS };