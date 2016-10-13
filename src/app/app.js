import angular from 'angular';
import UIRouter from 'angular-ui-router';
import Config from './core/config/config';
import Store, { getState } from './core/store/store';
import Api from './core/api/api';
import Routes from './core/routes/routes';
import UserActions from './core/store/slices/users';
import LoaderSpinner from './common/components/loader-spinner/loader-spinner';
import AppTemplate from './app.html';

/**
 * @class
 * @classdesc Component Class for the application top-level component.
 */
class AppController {

    static get $inject() { return ['$rootScope', '$log', 'Store', 'UserActions']; }
    constructor($rootScope, $log, Store, UserActions) {
        Object.assign(this, { $rootScope, Store, UserActions });

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
        this.state = {
            users: getState(this.Store.state.users)
        };

        this.actions = {
            user: this.UserActions
        };

        let update = this._update.bind(this);

        this.listeners.push(
            this.Store.subscribe(state => {
                this.state.users = getState(state.users);
            }),

            this.$rootScope.$on('$stateChangeStart', update),
            this.$rootScope.$on('$stateChangeSuccess', update),
            this.$rootScope.$on('$stateChangeError', update),
        );
    }

    /**
     * Updates the Application UI in response to state change events.
     * @param event - the state change event (from ui-router)
     */
    _update(event) {
        this.isLoading = (event.name === '$stateChangeStart') ? true : false;
    }

    addUser(username="") {
        this.actions.user.add(username);
    }

    deleteUser(username) {
        this.actions.user.remove(username);
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
    Store,
    Api,
    UIRouter,
    Routes,
    UserActions,
    LoaderSpinner
])
    .component('app', AppComponent)
    .name;
