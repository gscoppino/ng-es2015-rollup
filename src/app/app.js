import angular from 'angular';

import ConfigModule from 'app/core/config/config.js';
import ApiModule from 'app/core/api/api.js';
import StoreModule from 'app/core/store/store.js';
import RoutesModule from 'app/core/routes/routes.js';
import LoaderSpinnerModule from 'app/common/components/loader-spinner/loader-spinner.js';

import AppTemplate from './app.html';

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
export default angular.module('app', [
    ConfigModule,
    ApiModule,
    StoreModule,
    RoutesModule,
    LoaderSpinnerModule
])
    .component('app', AppComponent)
    .name;
