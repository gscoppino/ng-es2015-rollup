class UsersListItemController {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
        this.editing = false;
    }

    $onInit() {
        this.model = Object.assign({}, this.model);
        this.onEdit = this.onEdit || function () {};
        this.onRemove = this.onRemove || function () {};
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

export default {
    controller: UsersListItemController,
    bindings: {
        model: '<',
        onEdit: '&?',
        onRemove: '&?'
    }
};