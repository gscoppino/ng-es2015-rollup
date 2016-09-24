import angular from 'angular';
import UserTemplate from './user.html';

class UserController {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }

    $onInit() {
        this.model = Object.assign({}, this.model);
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
}

const UserComponent = {
    template: UserTemplate,
    controller: UserController,
    bindings: {
        model: '<',
        onRemove: '&?'
    }
};

export default angular.module('app.components.user', [])
    .component('user', UserComponent)
    .name;
