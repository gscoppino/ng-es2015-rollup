import angular from 'angular';
import ngRedux from 'ng-redux';
import actions from 'app/core/store/action-constants/users/users';
import UserService from 'app/core/api/services/users/users';

class UserActions {
    static get $inject() {
        return ['$q', '$ngRedux', 'UserService'];
    }

    constructor($ngRedux, UserService) {
        Object.assign(this, { $q, $ngRedux, UserService });
    }

    sync() {
        this.$ngRedux.dispatch({
            type: actions.GET_USERS_REQUEST
        });

        return this.UserService.getList()
            .then((users) => {
                this.$ngRedux.dispatch({
                    type: actions.GET_USERS_SUCCESS,
                    payload: users
                });

                return users;
            })
            .catch((response) => {
                this.$ngRedux.dispatch({
                    type: actions.GET_USERS_FAIL
                });

                return this.$q.reject(response);
            });
    }

    syncOne(id=null) {
        this.$ngRedux.dispatch({
            type: actions.GET_USER_REQUEST
        });

        return this.UserService.get(id)
            .then((user) => {
                this.$ngRedux.dispatch({
                    type: actions.GET_USER_SUCCESS,
                    payload: user
                });

                return user;
            })
            .catch((response) => {
                this.$ngRedux.dispatch({
                    type: actions.GET_USER_FAIL
                });

                return this.$q.reject(response);
            });
    }

    create(data=null) {
        this.$ngRedux.dispatch({
            type: actions.ADD_USER_REQUEST
        });

        return this.UserService.post(data)
            .then((user) => {
                this.$ngRedux.dispatch({
                    type: actions.ADD_USER_SUCCESS,
                    payload: user
                });

                return user;
            })
            .catch((response) => {
                this.$ngRedux.dispatch({
                    type: actions.ADD_USER_FAIL
                });

                return this.$q.reject(response);
            });
    }

    update(data=null) {
        this.$ngRedux.dispatch({
            type: actions.UPDATE_USER_REQUEST
        });

        return this.UserService.put(data)
            .then((user) => {
                this.$ngRedux.dispatch({
                    type: actions.UPDATE_USER_SUCCESS,
                    payload: user
                });

                return user;
            })
            .catch((response) => {
                this.$ngRedux.dispatch({
                    type: actions.UPDATE_USER_FAIL
                });

                return this.$q.reject(response);
            });
    }

    delete(data=null) {
        this.$ngRedux.dispatch({
            type: actions.DELETE_USER_REQUEST
        });

        return this.UserService.delete(data.id)
            .then((user) => {
                this.$ngRedux.dispatch({
                    type: actions.DELETE_USER_SUCCESS,
                    payload: user
                });

                return user;
            })
            .catch((response) => {
                this.$ngRedux.dispatch({
                    type: actions.DELETE_USER_FAIL
                });

                return this.$q.reject(response);
            });
    }
}

export default angular.module('app.store.action-creators.users', [
    ngRedux,
    UserService
])
    .service('UserActions', UserActions)
    .name;
