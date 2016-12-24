import angular from 'angular';

import AddEditUserItemTemplate from './add-edit-user-item.html';

class AddEditUserItemController {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }

    $onInit() {
        this.editing = this.user ? true : false;
        this.user = Object.assign({}, this.user || {});
        this.onSubmit = this.onSubmit || angular.noop;
    }

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {}

    $postLink() {}

    submitUser(user) {
        this.onSubmit({ user });
        this.user = {};
    }
}

const AddEditUserItemComponent = {
    template: AddEditUserItemTemplate,
    controller: AddEditUserItemController,
    bindings: {
        user: '<?',
        onSubmit: '&?'
    }
};

export default angular.module('app.components.add-edit-user-item', [])
    .component('addEditUserItem', AddEditUserItemComponent)
    .name;
