import { static as Immutable } from 'seamless-immutable';
import actions from 'app/core/store/action-constants/users/users.js';

const INITIAL_STATE = Immutable.from([]);

export function usersReducer(state=INITIAL_STATE, action=null) {

    switch (action.type) {

        // Get all users
        case actions.GET_USERS_REQUEST:
            return state;
        case actions.GET_USERS_CACHE_HIT:
            return state;
        case actions.GET_USERS_CACHE_MISS:
            return state;
        case actions.GET_USERS_SUCCESS:
            return Immutable.from(action.payload);
        case actions.GET_USERS_FAIL:
            return state;

        // Get a specific user
        case actions.GET_USER_REQUEST:
            return state;
        case actions.GET_USER_CACHE_HIT:
            return state;
        case actions.GET_USER_CACHE_MISS:
            return state;
        case actions.GET_USER_SUCCESS:
            var indexed = state.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return state
                    .slice(0, indexed)
                    .concat(Immutable.replace(state[indexed], action.payload))
                    .concat(state.slice(indexed + 1));
            } else {
                return state.concat(action.payload);
            }

        case actions.GET_USER_FAIL:
            return state;

        // Add a new user
        case actions.ADD_USER_REQUEST:
            return state;
        case actions.ADD_USER_SUCCESS:
            return state.concat(action.payload);
        case actions.ADD_USER_FAIL:
            return state;


        // Update a user
        case actions.UPDATE_USER_REQUEST:
            return state;
        case actions.UPDATE_USER_SUCCESS:
            var indexed = state.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return state
                    .slice(0, indexed)
                    .concat(Immutable.merge(state[indexed], action.payload))
                    .concat(state.slice(indexed + 1));
            } else {
                return state.concat(action.payload);
            }

        case actions.UPDATE_USER_FAIL:
            return state;


        // Delete a user
        case actions.DELETE_USER_REQUEST:
            return state;
        case actions.DELETE_USER_SUCCESS:
            var indexed = state.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return state
                    .slice(0, indexed)
                    .concat(state.slice(indexed + 1));
            }

            return state;
        case actions.DELETE_USER_FAIL:
            return state;

        // If no actions match
        default:
            return state;
    }
}
