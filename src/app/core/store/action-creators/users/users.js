import angular from 'angular';
import ngRedux from 'ng-redux';
import actions from 'app/core/store/action-constants/users/users.js';
import UserService from 'app/core/api/services/users/users.js';
import { createApiAction } from 'app/core/store/utils/utils';

class UserActions {
    static get $inject() {
        return ['$q', '$ngRedux', 'UserService'];
    }

    constructor($q, $ngRedux, UserService) {
        Object.assign(this, { $q, $ngRedux, UserService });
    }

    sync() {
        return createApiAction('GET_ALL', 'User', this.UserService.getList(), this.$ngRedux.dispatch)
            .then(users => users)
            .catch(response => this.$q.reject(response));
    }

    syncOne(id=null) {
        return createApiAction('GET', 'User', this.UserService.get(id), this.$ngRedux.dispatch)
            .then(user => user)
            .catch(response => this.$q.reject(response));
    }

    create(data=null) {
        return createApiAction('ADD', 'User', this.UserService.post(data), this.$ngRedux.dispatch)
            .then(user => user)
            .catch(response => this.$q.reject(response));
    }

    update(data=null) {
        return createApiAction('UPDATE', 'User', this.UserService.put(data), this.$ngRedux.dispatch)
            .then(user => user)
            .catch(response => this.$q.reject(response));
    }

    delete(data=null) {
        return createApiAction('DELETE', 'User', this.UserService.delete(data.id), this.$ngRedux.dispatch)
            .then(user => user)
            .catch(response => this.$q.reject(response));
    }
}

export default angular.module('app.store.action-creators.users', [
    ngRedux,
    UserService
])
    .service('UserActions', UserActions)
    .name;
