import angular from 'angular';
import ngRedux from 'ng-redux';
import actions from 'app/core/store/actions/users/users';
import UserService from 'app/core/api/services/users/users';

class UserActions {
    static get $inject() {
        return ['$ngRedux', 'UserService'];
    }

    constructor($ngRedux, UserService) {
        Object.assign(this, { $ngRedux, UserService });
    }

    sync() {
        this.$ngRedux.dispatch({
            type: actions.REQUEST_USERS
        });

        return this.UserService.getList()
            .then((users) => this.$ngRedux.dispatch({
                type: actions.RESOLVE_USERS,
                users: users
            }))
            .catch(() => this.$ngRedux.dispatch({
                type: actions.REJECT_USERS
            }));
    }

    syncOne(id=null) {
        this.$ngRedux.dispatch({
            type: actions.REQUEST_USER
        });

        return this.UserService.get(id)
            .then((user) => this.$ngRedux.dispatch({
                type: actions.RESOLVE_USER,
                user: user
            }))
            .catch(() => this.$ngRedux.dispatch({
                type: actions.REJECT_USER
            }));
    }

    create(data=null) {
        this.$ngRedux.dispatch({
            type: actions.REQUEST_ADD_USER,
        });

        return this.UserService.post(data)
            .then((user) => this.$ngRedux.dispatch({
                type: actions.RESOLVE_ADD_USER,
                user: user
            }))
            .catch(() => this.$ngRedux.dispatch({
                type: actions.REJECT_ADD_USER
            }));
    }

    update(data=null) {
        this.$ngRedux.dispatch({
            type: actions.REQUEST_UPDATE_USER
        });

        return this.UserService.put(data)
            .then((user) => this.$ngRedux.dispatch({
                type: actions.RESOLVE_UPDATE_USER,
                user: user
            }))
            .catch(() => this.$ngRedux.dispatch({
                type: actions.REJECT_UPDATE_USER
            }));
    }

    delete(data=null) {
        this.$ngRedux.dispatch({
            type: actions.REQUEST_DELETE_USER
        });

        return this.UserService.delete(data.id)
            .then((user) => this.$ngRedux.dispatch({
                type: actions.RESOLVE_DELETE_USER,
                user: user
            }))
            .catch(() => this.$ngRedux.dispatch({
                type: actions.REJECT_DELETE_USER
            }));
    }
}

export default angular.module('app.store.action-creators.users', [
    ngRedux,
    UserService
])
    .service('UserActions', UserActions)
    .name;