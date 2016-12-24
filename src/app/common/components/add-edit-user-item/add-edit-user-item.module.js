import angular from 'angular';

import AddEditUserItemComponentTemplate from './add-edit-user-item.component.html';
import AddEditUserItemComponent from './add-edit-user-item.component.js';

export default angular.module('app.components.add-edit-user-item', [])
    .component('addEditUserItem', Object.assign({ template: AddEditUserItemComponentTemplate }, AddEditUserItemComponent))
    .name;
