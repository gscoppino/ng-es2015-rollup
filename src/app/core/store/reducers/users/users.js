import actions from 'app/core/store/action-constants/users/users';

const INITIAL_STATE = [];

export function usersReducer(state=INITIAL_STATE, action=null) {

    switch(action.type) {

        // Get all users
        case actions.GET_USERS_REQUEST:
            return state;
        case actions.GET_USERS_SUCCESS:
            return [...action.payload];
        case actions.GET_USERS_FAIL:
            return state;

        // Get a specific user
        case actions.GET_USER_REQUEST:
            return state;
        case actions.GET_USER_SUCCESS:
            var indexed = state.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return [
                    ...state.slice(0, indexed),
                    Object.assign({}, state[indexed], action.payload),
                    ...state.slice(indexed + 1)
                ];
            } else {
                return [
                    ...state,
                    action.payload
                ];
            }

        case actions.GET_USER_FAIL:
            return state;

        // Add a new user
        case actions.ADD_USER_REQUEST:
            return state;
        case actions.ADD_USER_SUCCESS:
            return [...state, action.payload];
        case actions.ADD_USER_FAIL:
            return state;


        // Update a user
        case actions.UPDATE_USER_REQUEST:
            return state;
        case actions.UPDATE_USER_SUCCESS:
            var indexed = state.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return [
                    ...state.slice(0, indexed),
                    Object.assign({}, state[indexed], action.payload),
                    ...state.slice(indexed + 1)
                ];
            } else {
                return [
                    ...state,
                    action.payload
                ]
            }

        case actions.UPDATE_USER_FAIL:
            return state;


        // Delete a user
        case actions.DELETE_USER_REQUEST:
            return state;
        case actions.DELETE_USER_SUCCESS:
            var indexed = state.findIndex(user => user.id === action.payload.id);

            if (indexed !== -1) {
                return [
                    ...state.slice(0, indexed),
                    ...state.slice(indexed + 1)
                ];
            } else {
                return [...state];
            }

        case actions.DELETE_USER_FAIL:
            return state;

        // If no actions match
        default:
            return state;
    }
}
