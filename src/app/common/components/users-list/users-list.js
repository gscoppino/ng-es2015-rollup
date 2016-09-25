import angular from 'angular';
import ngRedux from 'ng-redux';
import UserService from 'app/core/api/services/users/users';
import * as UserActions from 'app/core/store/action-creators/users/users';
import UsersListItem from 'app/common/components/users-list-item/users-list-item';
import AddEditUserItem from 'app/common/components/add-edit-user-item/add-edit-user-item';
import UsersListTemplate from './users-list.html';

class UsersListController {

    static get $inject() { return ['$ngRedux', 'UserService']; }
    constructor($ngRedux, UserService) {
        Object.assign(this, { $ngRedux, UserService });
        this._listeners = [];
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

    submitNewUser(user) {
        this.actions.post(this.UserService, user);
    }

    editUser(user) {
        this.actions.put(this.UserService, user);
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

export default angular.module('app.components.users-list', [ngRedux, UserService, UsersListItem, AddEditUserItem])
    .component('usersList', UsersListComponent)
    .name;
