import actions from 'app/core/store/actions/users/users';

function getList(api) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_USERS
        });

        return api.getList()
            .then((users) => dispatch({
                type: actions.RESOLVE_USERS,
                users: users.plain()
            }))
            .catch(() => dispatch({
                type: actions.REJECT_USERS
            }));
    }
}

function get(api, id) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_USER
        });

        return api.one(id).get()
            .then((user) => dispatch({
                type: actions.RESOLVE_USER,
                user: user.plain()
            }))
            .catch(() => dispatch({
                type: actions.REJECT_USER
            }));
    }
}

function post(api, data) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_ADD_USER,
        });

        return api.post(data)
            .then((user) => dispatch({
                type: actions.RESOLVE_ADD_USER,
                user: user.plain()
            }))
            .catch(() => dispatch({
                type: actions.REJECT_ADD_USER
            }));
    }
}

function put(api, data) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_UPDATE_USER
        });

        return Object.assign(api.one(data.id), data).put()
            .then((user) => dispatch({
                type: actions.RESOLVE_UPDATE_USER,
                user: user.plain()
            }))
            .catch(() => dispatch({
                type: actions.REJECT_UPDATE_USER
            }));
    }
}

function remove(api, data) {
    return function (dispatch) {
        dispatch({
            type: actions.REQUEST_DELETE_USER
        });

        return api.one(data.id).remove()
            .then((user) => dispatch({
                type: actions.RESOLVE_DELETE_USER,
                user: user.plain()
            }))
            .catch(() => dispatch({
                type: actions.REJECT_DELETE_USER
            }));
    }
}

export {
    getList,
    get,
    post,
    put,
    remove
};