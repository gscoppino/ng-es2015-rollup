import angular from 'angular';

import AddEditUserItemModule from 'app/common/components/add-edit-user-item/add-edit-user-item.module.js';

import UsersListItemComponentTemplate from './users-list-item.component.html';
import UsersListItemComponent from './users-list-item.component.js';

export default angular.module('app.components.users-list-item', [
    AddEditUserItemModule
])
    .component('usersListItem', Object.assign({ template: UsersListItemComponentTemplate }, UsersListItemComponent))
    .name;
