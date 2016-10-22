import angular from 'angular';
import UIRouter from 'angular-ui-router';
import Config from './core/config/config';
import Store, { immutable } from './core/store/store';
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
        $log.log('Loaded!');

        /**
         * @member {boolean} isLoading
         * @memberof AppController#
         * @desc A flag indicating whether the application is in a state transition.
         */
        this.isLoading = false;

        this.listeners = [];

        this.state = {
            users: immutable(this.Store.state.users),
            editingUser: null,
            newUser: {
                first_name: '',
                last_name: ''
            }
        };

        this.actions = {
            users: this.UserActions
        };
    }

    /**
     * Schedules a UI update to to be called whenever a
     * ui-router state change event occurs, passing it the parameters from
     * the event.
     */
    $onInit() {
        let update = this._update.bind(this);

        this.listeners.push(
            this.Store.subscribe(state => {
                this.state.users = immutable(state.users);
            }, [(state) => state.users]),

            this.$rootScope.$on('$stateChangeStart', update),
            this.$rootScope.$on('$stateChangeSuccess', update),
            this.$rootScope.$on('$stateChangeError', update)
        );

        if (!this.state.users || !this.state.users.length) {
            this.actions.users.sync();
        }
    }

    /**
     * Updates the Application UI in response to state change events.
     * @param event - the state change event (from ui-router)
     */
    _update(event) {
        this.isLoading = (event.name === '$stateChangeStart') ? true : false;
    }

    beginEditingUser(user={}) {
        this.state.editingUser = immutable(user);
    }

    stopEditingUser() {
        this.state.editingUser = null;
    }

    editUser(user={}) {
        this.actions.users.edit(user)
            .then(this.stopEditingUser());
    }

    addUser(user={}) {
        this.actions.users.add(user)
            .then(() => {
                this.state.newUser = {
                    first_name: '',
                    last_name: ''
                };
            });
    }

    deleteUser(id=null) {
        this.actions.users.remove(id);
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
