import actions from 'app/core/store/actions/users/users';

const INITIAL_STATE = {
    list: []
};

export function usersReducer(state=INITIAL_STATE, action=null) {

    switch(action.type) {

        // Get all users
        case actions.GET_USERS_REQUEST:
            return state;
        case actions.GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                list: action.users
            });
        case actions.GET_USERS_FAIL:
            return state;

        // Get a specific user
        case actions.GET_USER_REQUEST:
            return state;
        case actions.GET_USER_SUCCESS:
            if (!state.list.find(user => user.id === action.user.id)) {
                return [...state.list, action.user];
            } else {
                return Object.assign({}, state, {
                    list: state.list.map((user) => {
                        if (user.id !== action.user.id) {
                            return user;
                        } else {
                            return Object.assign({}, user, action.user);
                        }
                    })
                });
            }
        case actions.GET_USER_FAIL:
            return state;

        // Add a new user
        case actions.ADD_USER_REQUEST:
            return state;
        case actions.ADD_USER_SUCCESS:
            return Object.assign({}, state, {
                list: [...state.list, action.user]
            });
        case actions.ADD_USER_FAIL:
            return state;


        // Update a user
        case actions.UPDATE_USER_REQUEST:
            return state;
        case actions.UPDATE_USER_SUCCESS:
            if (!state.list.find(user => user.id === action.user.id)) {
                return [...state.list, action.user];
            } else {
                return Object.assign({}, state, {
                    list: state.list.map((user) => {
                        if (user.id !== action.user.id) {
                            return user;
                        } else {
                            return Object.assign({}, user, action.user);
                        }
                    })
                });
            }
        case actions.UPDATE_USER_FAIL:
            return state;


        // Delete a user
        case actions.DELETE_USER_REQUEST:
            return state;
        case actions.DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                list: state.list.filter((user) => {
                    if (user.id !== action.user.id) {
                        return true;
                    } else {
                        return false;
                    }
                })
            });
        case actions.DELETE_USER_FAIL:
            return state;

        // If no actions match
        default:
            return state;
    }
}