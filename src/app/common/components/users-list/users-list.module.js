import angular from 'angular';
import NgReduxModule from 'ng-redux';

import UserActionsModule from 'app/core/store/users/actions.module.js';
import UsersListItemModule from 'app/common/components/users-list-item/users-list-item.module.js';
import AddEditUserItemModule from 'app/common/components/add-edit-user-item/add-edit-user-item.module.js';

import UsersListComponentTemplate from './users-list.component.html';
import UsersListComponent from './users-list.component.js';

export default angular.module('app.components.users-list', [
    NgReduxModule,
    UserActionsModule,
    UsersListItemModule,
    AddEditUserItemModule
])
    .component('usersList', Object.assign({ template: UsersListComponentTemplate }, UsersListComponent))
    .name;
