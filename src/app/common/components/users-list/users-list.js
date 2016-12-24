import angular from 'angular';
import NgReduxModule from 'ng-redux';

import UserActionsModule from 'app/core/store/users/actions.js';
import UsersListItemModule from 'app/common/components/users-list-item/users-list-item.js';
import AddEditUserItemModule from 'app/common/components/add-edit-user-item/add-edit-user-item.js';
import UserSelectors from 'app/core/store/users/selectors.js';

import UsersListTemplate from './users-list.html';

class UsersListController {

    static get $inject() { return ['$ngRedux', 'UserActions']; }
    constructor($ngRedux, UserActions) {
        Object.assign(this, { $ngRedux, UserActions });

        this._listeners = [];
        this.state = {
            usersList: []
        };
        this.actions = {
            users: this.UserActions
        };
    }

    $onInit() {
        this.actions.users.sync().then(users => {
            this.state.usersList = users;
            this._listeners.push(
                this.$ngRedux.subscribe(UserSelectors.list, (usersList) => {
                    this.state.usersList = usersList;
                })
            );
        });
    }

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {
        this._listeners.forEach((deregistrationFn) => deregistrationFn());
    }

    $postLink() {}

    submitNewUser(user=null) {
        this.actions.users.create(user);
    }

    editUser(user=null) {
        this.actions.users.update(user);
    }

    deleteUser(user=null) {
        this.actions.users.delete(user);
    }
}

const UsersListComponent = {
    template: UsersListTemplate,
    controller: UsersListController,
    bindings: {}
};

export default angular.module('app.components.users-list', [
    NgReduxModule,
    UserActionsModule,
    UsersListItemModule,
    AddEditUserItemModule
])
    .component('usersList', UsersListComponent)
    .name;
