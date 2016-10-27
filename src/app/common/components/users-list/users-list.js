import angular from 'angular';
import ngRedux from 'ng-redux';
import UserActions from 'app/core/store/action-creators/users/users';
import UsersListItem from 'app/common/components/users-list-item/users-list-item';
import AddEditUserItem from 'app/common/components/add-edit-user-item/add-edit-user-item';
import UsersListTemplate from './users-list.html';

class UsersListController {

    static get $inject() { return ['$ngRedux', 'UserActions']; }
    constructor($ngRedux, UserActions) {
        Object.assign(this, { $ngRedux, UserActions });
        this._listeners = [];
        this.state = {};
        this.actions = {
            users: this.UserActions
        };
    }

    $onInit() {
        this._listeners.push(
            this.$ngRedux.subscribe(() => {
                let state = this.$ngRedux.getState();

                this.state.usersList = state.users.list;
            })
        );

        this.actions.users.getList();
    }

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {
        this._listeners.forEach((deregistrationFn) => deregistrationFn());
    }

    $postLink() {}

    submitNewUser(user) {
        this.actions.users.post(user);
    }

    editUser(user) {
        this.actions.users.put(user);
    }

    deleteUser(user) {
        this.actions.users.remove(user);
    }
}

const UsersListComponent = {
    template: UsersListTemplate,
    controller: UsersListController,
    bindings: {}
};

export default angular.module('app.components.users-list', [ngRedux, UserActions, UsersListItem, AddEditUserItem])
    .component('usersList', UsersListComponent)
    .name;
