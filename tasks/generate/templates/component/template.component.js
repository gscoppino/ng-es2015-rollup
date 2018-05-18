class <%= UpperCamelCaseName %>Controller {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }

    $onInit() {}

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {}

    $postLink() {}
}

export default {
    controller: <%= UpperCamelCaseName %>Controller,
    bindings: {}
};
