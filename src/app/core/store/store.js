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
     * Updates the state object with the new partial state slice,
     * then synchronously notifies all store subscribers.
     */
    update(newState) {
        Object.assign(this._state, JSON.parse(JSON.stringify(newState)));
        this.$rootScope.$emit('change');
    }

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