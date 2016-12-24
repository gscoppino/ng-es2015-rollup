import { static as Immutable } from 'seamless-immutable';
import { combineReducers } from 'redux';

// Import individual reducers
import { usersReducer as users } from './users/reducers.js';

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
            this._instance = Immutable.from(combineReducers({
                users
            }));
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

export default RootReducerProvider;