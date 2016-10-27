import angular from 'angular';
import _ from 'lodash';
import actions from 'app/core/store/actions/users/users';
import UserService from 'app/core/api/services/users/users';

function getList(UserService) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_USERS
        });

        return UserService.getList()
            .then((users) => dispatch({
                type: actions.RESOLVE_USERS,
                users: users
            }))
            .catch(() => dispatch({
                type: actions.REJECT_USERS
            }));
    }
}

function get(UserService, id) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_USER
        });

        return UserService.get(id)
            .then((user) => dispatch({
                type: actions.RESOLVE_USER,
                user: user
            }))
            .catch(() => dispatch({
                type: actions.REJECT_USER
            }));
    }
}

function post(UserService, data) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_ADD_USER,
        });

        return UserService.post(data)
            .then((user) => dispatch({
                type: actions.RESOLVE_ADD_USER,
                user: user
            }))
            .catch(() => dispatch({
                type: actions.REJECT_ADD_USER
            }));
    }
}

function put(UserService, data) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_UPDATE_USER
        });

        return UserService.put(data)
            .then((user) => dispatch({
                type: actions.RESOLVE_UPDATE_USER,
                user: user
            }))
            .catch(() => dispatch({
                type: actions.REJECT_UPDATE_USER
            }));
    }
}

function remove(UserService, data) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_DELETE_USER
        });

        return UserService.delete(data.id)
            .then((user) => dispatch({
                type: actions.RESOLVE_DELETE_USER,
                user: user
            }))
            .catch(() => dispatch({
                type: actions.REJECT_DELETE_USER
            }));
    }
}

UserActions.$inject = ['UserService'];
function UserActions(UserService) {
    return {
        getList: _.partial(getList, UserService),
        get: _.partial(get, UserService),
        post: _.partial(post, UserService),
        put: _.partial(put, UserService),
        remove: _.partial(remove, UserService),
    };
}

export { getList, get, post, put, remove };

export default angular.module('app.store.action-creators.users', [UserService])
    .factory('UserActions', UserActions)
    .name;