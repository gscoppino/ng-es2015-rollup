import angular from 'angular';
import UIRouter from 'angular-ui-router';
import Config from './core/config/config';
import Api from './core/api/api';
import Store from './core/store/store';
import Routes from './core/routes/routes';
import LoaderSpinner from './common/components/loader-spinner/loader-spinner';
import UsersList from './common/components/users-list/users-list';
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
     * ui-router state change event occurs, passing it the parameters from
     * the event.
     */
    $onInit() {
        let update = this._update.bind(this);

        this.listeners.push(
            this.$rootScope.$on('$stateChangeStart', update),
            this.$rootScope.$on('$stateChangeSuccess', update),
            this.$rootScope.$on('$stateChangeError', update)
        );
    }

    /**
     * Updates the Application UI in response to state change events.
     * @param event - the state change event (from ui-router)
     */
    _update(event) {
        this.isLoading = (event.name === '$stateChangeStart') ? true : false;
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
    UIRouter,
    Routes,
    LoaderSpinner,
    UsersList
])
    .component('app', AppComponent)
    .name;
