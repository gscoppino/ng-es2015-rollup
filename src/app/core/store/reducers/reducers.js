import angular from 'angular';
import { combineReducers } from 'redux';

// Import individual reducers
import * as userReducers from './users/users';

/**
 * @class
 * @classdesc Provider Class for the application singleton root reducer.
 */
class RootReducerProvider {

    static get $inject() { return []; }
    constructor() {
        this._instance = null;
    }

    /**
     * Returns the root reducer singleton, or creates it, if it doesn't exist.
     * This function exists to allow for the root reducer to be created during
     * the Angular configuration phase.
     */
    createReducer() {
        if (!this._instance) {
            this._instance = combineReducers(userReducers);
        }

        return this._instance;
    }

    /**
     * Exposes the root reducer singleton as an Angular service.
     */
    $get() {
        return this.createReducer();
    }
}

/**
 * @namespace app/store/reducer
 * @desc Provides a singleton reducer which is a combination
 * of every reducer in the application.
 */
export default angular.module('app.store.reducer', [])
    .provider('rootReducer', RootReducerProvider)
    .name;