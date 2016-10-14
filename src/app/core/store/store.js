import angular from 'angular';

/**
 * @class
 * @classdesc Service Class for the application root store.
 */
class Store {
    static get $inject() { return ['$rootScope']; }

    constructor($rootScope) {
        Object.assign(this, { $rootScope });
        this._state = {};
    }

    get state() {
        return this._state;
    }

    /*
     * Updates the state object with the new partial state slice, notifies all
     * store subscribers, and schedules a new digest (if necessary) to ensure
     * that all watchers in the app are run (as some store subscribers will
     * most likely have changed watched values in response to a change in
     * state).
     *
     * @param newState {Object} - the partial state tree, which will be merged
     * into the state.
     */
    update(newState={}) {
        Object.assign(this._state, JSON.parse(JSON.stringify(newState)));
        this.$rootScope.$emit('change');
        this.$rootScope.$evalAsync();
    }

    /*
     * Notifies a callback function of changes to the state,
     * passing it the new state.
     *
     * @param callback {Function} - the function to call with the changed state.
     * @returns {Function} - the deregistration function for this listener.
     */
    subscribe(callback) {
        return this.$rootScope.$on('change', callback.bind(null, this._state));
    }
}

function getState(stateSlice) {
    return JSON.parse(JSON.stringify(stateSlice));
}

export { getState };
export default angular.module('app.store', [])
    .service('Store', Store)
    .name;