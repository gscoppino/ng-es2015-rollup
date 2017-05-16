import { static as Immutable } from 'seamless-immutable';

import actions from './constants.js';

const INITIAL_STATE = Immutable.from({
    list: Immutable.from([]),
    listHasFetched: false
});

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
            return Immutable.merge(state, {
                list: action.payload,
                listHasFetched: true
            });
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
            var indexed = state.list.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return Immutable.merge(state, {
                    list: state.list
                        .slice(0, indexed)
                        .concat(Immutable.replace(state.list[indexed], action.payload))
                        .concat(state.list.slice(indexed + 1))
                });
            } else {
                return Immutable.merge(state, {
                    list: state.list.concat(action.payload)
                });
            }

        case actions.GET_USER_FAIL:
            return state;

        // Add a new user
        case actions.ADD_USER_REQUEST:
            return state;
        case actions.ADD_USER_SUCCESS:
            return Immutable.merge(state, {
                list: state.list.concat(action.payload)
            });
        case actions.ADD_USER_FAIL:
            return state;


        // Update a user
        case actions.UPDATE_USER_REQUEST:
            return state;
        case actions.UPDATE_USER_SUCCESS:
            var indexed = state.list.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return Immutable.merge(state, {
                    list: state.list
                        .slice(0, indexed)
                        .concat(Immutable.merge(state.list[indexed], action.payload))
                        .concat(state.list.slice(indexed + 1))
                });
            } else {
                return Immutable.merge(state, {
                    list: state.list.concat(action.payload)
                });
            }

        case actions.UPDATE_USER_FAIL:
            return state;


        // Delete a user
        case actions.DELETE_USER_REQUEST:
            return state;
        case actions.DELETE_USER_SUCCESS:
            var indexed = state.list.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return Immutable.merge(state, {
                    list: state.list
                        .slice(0, indexed)
                        .concat(state.list.slice(indexed + 1))
                });
            }

            return state;
        case actions.DELETE_USER_FAIL:
            return state;

        // If no actions match
        default:
            return state;
    }
}
