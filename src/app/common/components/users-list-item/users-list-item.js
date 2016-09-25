import angular from 'angular';
import AddEditUserItem from 'app/common/components/add-edit-user-item/add-edit-user-item';
import UsersListItemTemplate from './users-list-item.html';

class UsersListItemController {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
        this.editing = false;
    }

    $onInit() {
        this.model = Object.assign({}, this.model);
        this.onEdit = this.onEdit || angular.noop;
        this.onRemove = this.onRemove || angular.noop;
    }

    $onChanges(changes) {
        if (changes.model && !changes.model.isFirstChange()) {
            this.model = Object.assign({}, changes.model.currentValue);
        }
    }

    $doCheck() {}

    $onDestroy() {}

    $postLink() {}

    beginEditing() {
        this.editing = true;
    }

    doneEditing(user) {
        this.onEdit({ user });
        this.editing = false;
    }
}

const UsersListItemComponent = {
    template: UsersListItemTemplate,
    controller: UsersListItemController,
    bindings: {
        model: '<',
        onEdit: '&?',
        onRemove: '&?'
    }
};

export default angular.module('app.components.users-list-item', [AddEditUserItem])
    .component('usersListItem', UsersListItemComponent)
    .name;
