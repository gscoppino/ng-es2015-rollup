import angular from 'angular';

import Config from 'app/core/config/config.js';
import Api from 'app/core/api/api.js';
import Store from 'app/core/store/store.js';
import Routes from 'app/core/routes/routes.js';
import LoaderSpinner from 'app/common/components/loader-spinner/loader-spinner.js';

import AppTemplate from './app.html';

/**
 * Component Controller for the top-level application component.
 */
class AppController {

    /** Annotation for ng $injector  */
    static get $inject() { return ['$rootScope', '$log']; }

    /**
     * Initialization
     * @param {Object} $rootScope - ng
     * @param {Object} $log - ng
     */
    constructor($rootScope, $log) {
        Object.assign(this, { $rootScope });

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
     * @param {Object} event - the state change event
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
    Config,
    Api,
    Store,
    Routes,
    LoaderSpinner
])
    .component('app', AppComponent)
    .name;
