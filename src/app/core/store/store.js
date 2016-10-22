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

    /*
     * Returns the reference to the state tree.
     * Recommendations:
     * Don't use this to get the state by itself, wrap the lookup
     * in the immutable() helper to retrieve a copy of the state slice (to avoid mutation).
     * Don't use this to modify the state. Modify the state
     * using the update() method instead, which will also notify store subscribers of the change.
     */
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
        Object.assign(this._state, immutable(newState));
        this.$rootScope.$emit('change', Object.keys(newState));
        this.$rootScope.$evalAsync();
    }

    /*
     * Notifies a callback function of changes to the state,
     * passing it the new state. Optionally accepts an array of
     * selector functions, that will be used to test if the state change
     * has affected a part of the tree relevant to the subscriber, in order
     * to determine whether to notify them of the state change or not.
     *
     * @param callback {Function} - the function to call with the changed state.
     * @param selectorFns {Array} - an array of functions that return slices of state.
     * @returns {Function} - the deregistration function for this listener.
     */
    subscribe(callback, selectorFns=[]) {
        return this.$rootScope.$on('change', (event, changedProps) => {
            let match  = !selectorFns.length ? true : selectorFns.some((selectorFn) => {
                let stateSlice = selectorFn(this._state);
                return changedProps.some((prop) => {
                    return stateSlice === this._state[prop];
                });
            });

            if (match) {
                callback(this._state);
            }
        });
    }
}

/*
 * Deep clones a valid JSON object.
 * This function uses the browsers built-in JSON methods to do the cloning,
 * so the typical restrictions/quirks apply.
 * 1) Function properties will be dropped.
 * 2) Properties with a value of "undefined" will be dropped.
 * 3) Any Date objects will be replaced with the equivalent ISO 8601 string.
 * ...and maybe some other things.
 */
function immutable(stateSlice) {
    return JSON.parse(JSON.stringify(stateSlice));
}

export { immutable };
export default angular.module('app.store', [])
    .service('Store', Store)
    .name;