import angular from 'angular';
import ngRedux from 'ng-redux';
import UserService from 'app/core/api/services/users/users';
import * as UserActions from 'app/core/store/action-creators/users/users';
import User from 'app/common/components/user/user';
import UsersListTemplate from './users-list.html';

class UsersListController {

    static get $inject() { return ['$ngRedux', 'UserService']; }
    constructor($ngRedux, UserService) {
        Object.assign(this, { $ngRedux, UserService });
        this._listeners = [];
        this.newUser = {
            first_name: null,
            last_name: null
        };
    }

    $onInit() {
        let listener = this.$ngRedux.connect(this.mapStateToThis, UserActions)((state, actions) => {
            this.state = state;
            this.actions = actions;
        });

        this._listeners.push(listener);

        this.actions.getList(this.UserService);
    }

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {
        this._listeners.forEach((deregistrationFn) => deregistrationFn());
    }

    $postLink() {}

    mapStateToThis(state) {
        return {
            usersList: state.users.list
        };
    }

    submitNewUser() {
        this.actions.post(this.UserService, this.newUser)
            .then(() => {
                this.newUser = {};
            });
    }

    deleteUser(user) {
        this.actions.remove(this.UserService, user);
    }
}

const UsersListComponent = {
    template: UsersListTemplate,
    controller: UsersListController,
    bindings: {}
};

export default angular.module('app.components.users-list', [ngRedux, UserService, User])
    .component('usersList', UsersListComponent)
    .name;
