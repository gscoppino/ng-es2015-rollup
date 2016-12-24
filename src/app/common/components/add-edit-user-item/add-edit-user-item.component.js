class AddEditUserItemController {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }

    $onInit() {
        this.editing = this.user ? true : false;
        this.user = Object.assign({}, this.user || {});
        this.onSubmit = this.onSubmit || function () {};
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

export default  {
    controller: AddEditUserItemController,
    bindings: {
        user: '<?',
        onSubmit: '&?'
    }
};